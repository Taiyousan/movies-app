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
    <div class="logo-container"><img src="img/logo.svg" alt=""></div>
    <nav>
      <RouterLink to="/"><span>Accueil</span></RouterLink>
      <RouterLink to="/movies"><span>Films</span></RouterLink>
      <RouterLink to="/actors"><span>Acteurs</span></RouterLink>
      <RouterLink to="/categories"><span>Catégories</span></RouterLink>
      <RouterLink to="/login" v-if="!token"><span>Login</span></RouterLink>
      <div class="logout" v-else @click="logout()"><span>Lougout</span></div>
    </nav>
  </header>
  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.header-home {
  width: fit-content;
  position: fixed;
  height: 100vh;
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #252525;

  .logo-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;

    img {
      width: 20%;
    }
  }

  nav {
    // background-color: rgba(65, 64, 64, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 80%;
    width: 10em;
    margin: 1em;
    border-radius: 5px;
    padding: 0.5em;


    a,
    .logout {
      font-size: .8em;
      font-weight: bold;
      text-decoration: none;
      color: #252525;
      padding: 1em;
      background-color: #fff;
      border-radius: 25px;
      cursor: pointer;
      transition: all .2s ease-in-out;

      span {
        transition: all .2s ease-in-out;
      }

      &:hover {
        background-color: #252525;
        color: #fff;

        span {
          display: block;
          transform: translateX(20%);
        }
      }
    }
  }
}

.main {
  margin-left: 10em;
  width: calc(100% - 10em);
  height: 100vh;
  background-color: #f5f5f5;
  padding: 1em;
}
</style>
