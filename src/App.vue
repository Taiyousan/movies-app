<script setup>
// Imports
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";

let data = ref("");

onMounted(async () => {
  const response = await axios.get(
    "http://localhost/s5/symfony-s5/public/index.php/api/movies?page=1",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  data.value = response.data;
  console.log(toRaw(data.value));
});
</script>

<template>
  <header class="header-home">
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/actors">Actors</RouterLink>
      <RouterLink to="/categories">Catégories</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped lang="scss">
.header-home {
  background-color: #252525;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    color: #fff;
  }
  nav {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;

    a {
      text-decoration: none;
      color: #252525;
      padding: 1em;
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
