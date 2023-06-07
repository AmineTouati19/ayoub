<template>
    <div class="form-container">
      <div class="video-wrapper">
        <video src="@/assets/ji.mp4" autoplay loop muted></video>
      </div>
      <form>
        <div v-for="(task, index) in tasks" :key="task.id" class="task">
          <label class="label">Task {{ index + 1 }}</label>
          <div class="input-container">
            <input type="text" v-model="task.name" class="input">
            <button type="button" @click="removeTask(index)" class="remove-btn">Remove</button>
            <button type="button" @click="saveTask(task)" class="next-btn">Next</button>
          </div>
        </div>
        <button type="button" @click="addTask" class="add-btn">Add</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tasks: [
          {
            id: "",
            name: ""
          }
        ],
        challengeId: ""
      };
    },
    mounted() {
      this.challengeId = this.$route.params.challengeId; // Get the challengeId from the URL params
    },
    methods: {
      addTask() {
        const newTask = {
          id: this.tasks.length + 1,
          name: ""
        };
        this.tasks.push(newTask);
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
      },
      saveTask(task) {
    if (!task.name) {
      alert("Please enter a task name.");
      return;
    }
  
    const taskNumber = this.tasks.indexOf(task) + 1; // Get the index of the task and add 1 to make it the task number
  
    const payload = {
      name: task.name,
      tasknumber: taskNumber,
      challenge: this.challengeId
    };
  
    axios.post('http://127.0.0.1:8000/creatTask/', payload)
      .then(response => {
        const taskId = response.data.id;
        this.$router.push({ name: 'task-page', params: { taskId: taskId } });
  
      })
      .catch(error => {
        console.log(error);
      });
  }
  
    }
  };
  </script>
  
  
  <style>
  
  .video-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .video-wrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  .remove-btn,
  .add-btn,
  .next-btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .remove-btn:hover,
  .add-btn:hover,
  .next-btn:hover {
    background-color: #4da6ff;
  }
  
  .remove-btn,.next-btn 
  {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  
  .add-btn {
    margin-top: 10px;
  }
  
  
  
  .task {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }
  
  .task:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
  
  .label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }
  
  .input-container {
    display: flex;
    align-items: center;
  }
  
  .input {
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    margin-right: 10px;
    font-size: 16px;
    flex: 1;
    color: #333;
    transition: border-color 0.3s ease;
  }
  
  .input:focus {
    outline: none;
    border-color: #007bff;
  }
  </style>