<template>
    <div class="challenge-details">
      <div class="challenge-image">
        <img :src="challenge.image" alt="Challenge Image">
      </div>
      <div class="challenge-content">
        <h2>{{ challenge.name }}</h2>
        <p>{{ challenge.description }}</p>
        <p class="points">Points: {{ challenge.points }}</p>
        <p class="max">Max Team Members: {{ challenge.max_teamsize }}</p>
        <!-- Add any additional challenge details you want to display here -->
        <button class="btn" @click="goBack">Go Back</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        challenge: null,
      };
    },
    mounted() {
      const id = this.$route.params.id;
      // Fetch the challenge details based on the provided ID (e.g., from an API)
      this.fetchChallengeDetails(id);
    },
    methods: {
      fetchChallengeDetails(id) {
        // Simulated API call to fetch challenge details
        const challengeDetails = {
          id: id,
          name: "Challenge Name",
          description: "Challenge Description",
          points: 100,
          max_teamsize: 5,
          // Add any additional challenge details here
        };
        this.challenge = challengeDetails;
      },
      goBack() {
        this.$router.go(-1); // Go back to the previous page
      },
    },
  };
  </script>
  
  <style scoped>
  .challenge-details {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .challenge-image {
    margin-bottom: 20px;
  }
  
  .challenge-image img {
    max-width: 300px;
  }
  
  .challenge-content {
    text-align: center;
  }
  
  .btn {
    margin-top: 20px;
  }
  </style>
  