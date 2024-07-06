<template>
  <div class="page-404">
    <header class="bold m-10">
      <h1>Oops! Page Not Found</h1>
    </header>
    <div class="logo-animation">

      <img src="/img/nesty-bird.png" alt="Animated Logo" />
    </div>
    <p>We can't seem to find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.</p>
    <button @click="goBack">Back Home</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.push({ name: 'Manage Groups' }); // Assuming 'home' is the name of your home route
    }
  }
}
</script>

<style scoped>
.page-404 {
  text-align: center;
  padding-top: 20%;
}

.logo-animation img {
  width: 150px;
  height: auto;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
