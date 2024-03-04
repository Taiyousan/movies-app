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
  localStorage.removeItem("token");
  // router.push({ name: 'login' });
  // window.location.reload();
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
  <header class="header-home" v-if="token">
    <nav>
      <RouterLink to="/"><img src="/src/assets/icons/home.png" alt=""><span>Accueil</span></RouterLink>
      <RouterLink to="/movies"><img src="/src/assets/icons/movie.png" alt=""><span>Films</span></RouterLink>
      <RouterLink to="/actors"><img src="/src/assets/icons/actor.png" alt=""><span>Acteurs</span></RouterLink>
      <RouterLink to="/categories"><img src="/src/assets/icons/category.png" alt=""><span>Catégories</span></RouterLink>
      <div class="logout" @click="logout()"><img src="/src/assets/icons/logout.png" alt=""><span>Lougout</span></div>
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
  top: 0;
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #55868C;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

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
      color: #fff;
      padding: 1em;
      border-radius: 10px;
      // background-color: #fff;
      text-transform: none;
      cursor: pointer;
      transition: all .2s ease-in-out;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      span {
        transition: all .2s ease-in-out;
      }

      img {
        width: 2em;
        margin-right: 1.5em;
        object-fit: contain;
      }

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

        span {
          display: block;
          // transform: translateX(20%);
        }
      }
    }
  }
}

.main {
  margin-left: 10em;
  width: calc(100% - 10em);
  height: 100vh;
  // padding: 1em;
}
</style>
