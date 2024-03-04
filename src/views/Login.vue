<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
let token = ref(localStorage.getItem("token"));
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;

const submitForm = () => {
  axios
    .post(`${baseUrlApi}/login_check`, {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      // router.push({ name: 'login' });
      // window.location.reload();
      window.location.href = "/";

    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <div v-if="!token" class="form-container">
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input type="username" id="username" v-model="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Submit</button>
    </form>
  </div>
  <div class="form-container logout" v-else>
    <div v-if="token" class="message">Vous êtes connecté !</div>
  </div>
</template>

<style scoped lang="scss">
.form-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &.logout {
    position: block;
    pointer-events: none;
  }


  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 8px;
  }

  label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
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
}
</style>
