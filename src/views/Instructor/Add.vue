<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="square-container">
    <h2>Preview</h2>
    <div class="square">
      <img :src="imagePreview" alt="Preview">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      name: localStorage.getItem('name') || '',
      description: localStorage.getItem('description') || '',
      imagePreview: localStorage.getItem('image')
    }
  }
  };
  </script>
  
  <style scoped>
  .square-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 20px;
    background-color: #fff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 40px;
    color: #444;
    font-weight: 500;
    font-size: 36px;
  }
  
  .square {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #f8f8f8;
    padding: 30px 40px;
    border-radius: 5px;
    margin-bottom: 40px;
}

.square img {
width: 200px;
height: 200px;
object-fit: cover;
border-radius: 50%;
margin-bottom: 20px;
}

.square h3 {
margin-bottom: 10px;
font-size: 24px;
font-weight: 500;
color: #444;
}

.square p {
font-size: 18px;
color: #777;
}
</style>
  