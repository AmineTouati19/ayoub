<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <main>
      <div v-for="challenge in challenges" :key="challenge.id" class="challenge">
        <img :src="challenge.image_url" />
        <div class="challenge-content">
          <h2 class="challenge-name">{{ challenge.name }}</h2>
          <p class="challenge-description">{{ challenge.descreption }}</p>
          <div class="challenge-info">
            <span class="points">Points: {{ challenge.points }}</span>
            <span class="points">Max team: {{ challenge.max_teamsize }}</span>
            <a href="#" class="participate-btn" @click="showChallengeForm(challenge)" v-if="!challenge.registered">Participate</a>
  <div v-else class="participated-message">Already participated</div>
          </div>
        </div>
      </div>
  
      <transition name="fade">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeChallengeForm">&times;</span>
          <img :src="selectedChallenge.image_url" />
          <h2 class="challenge-name">{{ selectedChallenge.name }}</h2>
          <p class="challenge-description">{{ selectedChallenge.descreption }}</p>
          <div class="challenge-info">
            <span class="points">Points: {{ selectedChallenge.points }}</span>
            <span class="points">Max team: {{ selectedChallenge.max_teamsize }}</span>
          </div>
          <button class="register-btn" @click="registerForChallenge">Register</button>
          <!-- Add your form content here -->
          <div v-if="showSuccessMessage" class="success-message">
  You have successfully registered for the challenge.
</div>
        </div>
    
      </div>
  
    </transition>
  
    </main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        challenges: [],
        showModal: false,
        selectedChallenge: null,
        showSuccessMessage: false
      };
    },
    mounted() {
      this.fetchChallenges();
    },
    methods: {
      fetchChallenges() {
        axios
          .get('http://127.0.0.1:8000/getPlanfiedchallenges/')
          .then((response) => {
            this.challenges = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      showChallengeForm(challenge) {
        this.selectedChallenge = challenge;
        this.showModal = true;
      },
      closeChallengeForm() {
        this.showModal = false;
      },
  // ...
  registerForChallenge() {
  const registrationData = {
    registre_by: this.$store.state.account.id, // Set the user's information for registration here
    challenge: this.selectedChallenge.id // Pass the challenge ID to register for
  };

  axios
    .post('http://127.0.0.1:8000/registre/', registrationData)
    .then(() => {
      // Handle successful registration
      console.log('Registration successful');
      this.showSuccessMessage = true;
      this.selectedChallenge.registered = true; 
      setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);// Set 'registered' property to true for the selected challenge
      // Optionally, update the UI or show a success message to the user
    })
    .catch((error) => {
      console.log('User ID:', registrationData.registre_by);
      console.error('Registration error:', error);
      console.log('Response data:', error.response.data);
      console.log('Status code:', error.response.status);
      console.log('Status text:', error.response.statusText);
      // Optionally, show an error message to the user
    });
}




    }
  };
  </script>
  <style scoped>
  
  
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }
  
  header {
    background-color: #1d2c4f;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 36px;
    margin: 0;
  }
  
  main {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .challenge {
    width: calc(33.33% - 20px);
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .challenge:hover {
    transform: translateY(-5px);
  }
  
  .challenge img {
    width: 100%;
    display: block;
    object-fit: cover;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  
  .challenge-content {
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
    margin: 0 0 10px 0;
  }
  
  p {
    margin: 0;
    line-height: 1.6;
  }
  
  .challenge-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .points {
    font-size: 16px;
    color: #555;
  }
  
  .team {
    font-size: 16px;
    color: #555;
  }
  
  .participate-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #1d2c4f;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .participate-btn:hover {
    background-color: #162244;
  }
  .success-message {
    margin-top: 5px;
  background-color: #32a852;
  color: #fff;
  padding: 10px;
  text-align: center;
}

  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.667);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
    width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  text-align: center;
}

.modal-content img {
  width: 100%;
  display: block;
  object-fit: cover;
  height: 200px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.modal-content h2 {
  font-size: 24px;
  margin: 0 0 10px 0;
}

.modal-content p {
  margin: 0;
  line-height: 1.6;
}
.close {
  position: absolute;
  top: 2px;
  right: 5px;
  font-size: 24px;
  color: #aaa;
  cursor:pointer 
}
.fade-enter-active,
.fade-leave-active {
transition: opacity 1.2s;
}

.fade-enter,
.fade-leave-to {
opacity: 0;
}
.register-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #1d2c4f;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.register-btn:hover {
  background-color: #162244;
}

  </style>