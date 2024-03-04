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
  <div class="form-container">
    <form class="form" @submit.prevent="submitForm">
      <div class="input-group">
        <label class="label" for="username">Username:</label>
        <input class="input" type="text" id="username" v-model="username" required />
      </div>
      <div class="input-group">
        <label class="label" for="password">Password:</label>
        <input class="input" type="password" id="password" v-model="password" required />
      </div>
      <button class="button" type="submit">Submit</button>
    </form>
    <div v-if="token" class="message">Vous êtes connecté !</div>
  </div>
</template>


<style scoped lang="scss">
.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 1rem;
}

.label {
  font-size: 1.2rem;
}

.input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 100%;
}

.button {
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
  margin-top: 1rem;
}
</style>

