<template>
  <div id="app" :style="{ backgroundColor: backgroundColor }">
    <div class="header">
      <h1 class="title">Here's a cute dog for a cute girl!</h1>
    </div>
    <div class="dog-container">
      <div class="dog-frame" v-if="dogImage">
        <img :src="dogImage" alt="A cute dog" @load="onImageLoad"/>
        <div v-if="loading" class="spinner"></div>
      </div>
      <div class="confetti" v-if="showConfetti"></div>
    </div>
    <div class="button-container">
      <button class="dog-button" @click="getDog('corgi')">Gimme a Corgi!</button>
      <button class="dog-button" @click="getDog('beagle')">Gimme a Beagle!</button>
      <button class="dog-button" @click="getDog()">Gimme a Random Pup!</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dogImage: null,
      loading: false,
      showConfetti: false,
      backgroundColor: '#ffdde1'
    };
  },
  methods: {
    async getDog(breed = '') {
      this.loading = true;
      this.showConfetti = false;
      try {
        const response = await fetch(`http://localhost:3000/dog?breed=${breed}`);
        const data = await response.json();
        this.dogImage = data.message;
        this.changeBackgroundColor();
      } catch (error) {
        console.error('Failed to fetch dog image:', error);
      }
    },
    onImageLoad() {
      this.loading = false;
      this.showConfetti = true;
      setTimeout(() => {
        this.showConfetti = false;
      }, 1000);
    },
    changeBackgroundColor() {
        const colors = ['#ffdde1', '#e4f9f5', '#fff6e5', '#d4a5a5', '#f9d5e5', '#a7c5eb', '#c3e0e5', '#fde2e4'];
        this.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

#app {
  font-family: 'Fredoka One', cursive;
  text-align: center;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s ease;
  overflow: hidden;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.header {
    margin-bottom: 2rem;
}

.title {
    font-size: 3rem;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.dog-container {
  position: relative;
  margin-bottom: 2rem;
}

.dog-frame {
  position: relative;
  border: 10px solid #fff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: #fff;
  padding: 20px;
  transform: rotate(-3deg);
  transition: transform 0.3s ease;
}

.dog-frame:hover {
    transform: rotate(0deg) scale(1.05);
}

.dog-frame img {
  max-width: 400px;
  max-height: 400px;
  border-radius: 10px;
}

.button-container {
    display: flex;
    gap: 1rem;
}

.dog-button {
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.5rem;
  font-family: 'Fredoka One', cursive;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  outline: none;
}

.dog-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.dog-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 105, 180, 0.3);
  border-top-color: #ff69b4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.confetti {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif');
  background-size: cover;
  opacity: 0.7;
  pointer-events: none;
}

</style>
