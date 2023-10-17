<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";

const username = ref("");
const password = ref("");
let token = ref(localStorage.getItem("token"));
const isLoggedIn = ref(false);

const submitForm = () => {
  axios
    .post("http://127.0.0.1:8000/api/login_check", {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      console.log(localStorage.getItem("token"));
      isLoggedIn.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <div v-if="!token">
    <h1>LOGIN</h1>
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input type="username" id="username" v-model="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Submit</button>
    </form>
  </div>
  <div v-else>
    <div v-if="isLoggedIn" class="message">Vous êtes connecté !</div>
  </div>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 20rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #0077ff;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.message {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 2rem;
}
</style>
