<script setup>
// Imports
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { onMounted, ref, toRaw, computed } from "vue";
import axios from "axios";

let data = ref("");
let token = computed(() => localStorage.getItem("token"));
const router = useRouter();

// Methods
function logout() {
  console.log("logout");
  localStorage.removeItem("token");
  window.location.href = "/login";
}

// onMounted(async () => {
//   const response = await axios.get("http://127.0.0.1:8000/api/movies?page=1", {
//     headers: {
//       Accept: "application/ld+json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   data.value = response.data;
// });
</script>

<template>
  <header class="header-home">
    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/movies">Movies</RouterLink>
      <RouterLink to="/actors">Actors</RouterLink>
      <RouterLink to="/categories">Catégories</RouterLink>
      <RouterLink to="/login" v-if="!token">Login</RouterLink>
      <div class="logout" v-else @click="logout()">Lougout</div>
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

    a,
    .logout {
      text-decoration: none;
      color: #252525;
      padding: 1em;
      background-color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
