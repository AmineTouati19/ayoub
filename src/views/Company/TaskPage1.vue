<template>
    <div class="container">
      <div class="video-wrapper">
        <video src="@/assets/ji.mp4" autoplay loop muted></video>
      </div>
      <h1 class="title">Task {{ index + 1 }}</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title" class="label">Title:</label>
          <input type="text" id="title" name="title" v-model="title" required class="input">
        </div>
        <div class="form-group">
          <label for="description" class="label">Description:</label>
          <textarea id="description" name="description" v-model="description" class="textarea"></textarea>
        </div>
        <div class="form-group">
          <label for="type" class="label">Type:</label>
          <select id="type" name="type" v-model="type" required class="select">
            <option value="">-- Select Type --</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="text">Text</option>
          </select>
          <button type="button" @click="addField" class="add-field-btn">Add Field</button>
        </div>
        <div v-for="(field, index) in fields" :key="index" class="new-field">
          <label :for="field.id" class="label">{{ field.label }}:</label>
          <template v-if="field.type === 'image'">
            <input type="file" :id="field.id" :name="field.id" @change="onFileSelected($event, index)" class="file-input">
            
          </template>
          <template v-else>
            <input type="text" :id="field.id" :name="field.id" v-model="field.value" class="input">
          </template>
          <button type="button" class="remove-field" @click="removeField(index)">Remove Field</button>
        </div>
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        title: '',
        description: '',
        type: '',
        fields: [],
        fieldId: 0,
        imageFiles: [],
        taskId: "",
        index: ""
      }
    },
    mounted() {
      this.taskId = this.$route.params.taskId;
    },
    methods: {
    
      addField() {
        const newField = { id: `field-${this.fieldId}`, type: this.type, label: this.type.charAt(0).toUpperCase() + this.type.slice(1), value: '' };
        this.fields.push(newField);
        if (this.type === 'image') {
          this.imageFiles.push(null);
        }
        this.fieldId++;
      },
      removeField(index) {
        this.fields.splice(index, 1);
        if (this.type === 'image') {
          this.imageFiles.splice(index, 1);
        }
      },
      onFileSelected(event, index) {
        this.imageFiles[index] = event.target.files[0];
      },
      submitForm() {
        // Create an array to store all the API requests
        const requests = [];
  
        // Create the task image requests
        for (let i = 0; i < this.imageFiles.length; i++) {
          const imageFile = this.imageFiles[i];
          const formData = new FormData();
          formData.append('image', imageFile);
          formData.append('imagenumber', i + 1);
          formData.append('task', this.taskId);
  
          // Send the image request
          const imageRequest = axios.post('http://127.0.0.1:8000/creatTaskImages/', formData);
          requests.push(imageRequest);
        }
  
        // Create the task title request
        const titleData = {
          titel: this.title,
          titelnumber: this.fields.length + 1,
          task: this.taskId
        };
  
        // Send the title request
        const titleRequest = axios.post('http://127.0.0.1:8000/creatTaskTitels/', titleData);
        requests.push(titleRequest);
  
        // Send all the requests concurrently
        axios.all(requests)
          .then(axios.spread((...responses) => {
            // Handle the response for each request if needed
            console.log(responses);
            this.$router.push('/instructorhome');
          }))
          .catch(error => {
            // Handle errors if any request fails
            console.log(error);
            // Show an error message or perform error handling
          });
      }
    }
  };
  </script>
  
  <style>
   .container {
      max-width: 600px;
      margin-top: 50px;
      margin-left: 450px;
      padding: 50px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    /* Style for form title */
    .title {
      font-size: 28px;
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
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
  
    /* Style for form fields */
    .form-group {
      margin-bottom: 20px;
    }
  
    /* Style for form labels */
    .label {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
      display: block;
      color: #333;
    }
  
    /* Style for form input fields */
    .input,
    .textarea,
    .select,
    .file-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      color: #333;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    .select option {
      font-size: 16px;
      color: #333;
    }
  
    /* Style for add field button */
    .add-field-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
    }
  
    /* Style for remove field button */
    .remove-field {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      background-color: #dc3545;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 10px;
    }
  
    /* Style for submit button */
    .submit-btn {
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 20px;
    }
  </style>
  