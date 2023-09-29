<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
import ActorCard from "../components/ActorCard.vue";

let data = ref("");
let randomMovies = ref("");
let randomActors = ref(""); // Nouvelle référence pour le deuxième appel API

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function fetchData() {
  try {
    const response = await axios.get(
      "http://localhost/s5/symfony-s5/public/index.php/api/movies?page=1",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    data.value = response.data;

    shuffleArray(data.value);
    randomMovies.value = data.value.slice(0, 4);
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
  }
}

async function fetchrandomActors() {
  // Fonction pour le deuxième appel API
  try {
    const response = await axios.get(
      "http://localhost/s5/symfony-s5/public/index.php/api/actors?page=1",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    randomActors.value = response.data;
    shuffleArray(randomActors.value);
    randomActors.value = randomActors.value.slice(0, 4);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de la deuxième API:",
      error
    );
  }
}

onMounted(async () => {
  await fetchData();
  await fetchrandomActors(); // Appel de la deuxième API après le premier
});
</script>

<template>
  <div class="titre"><h1>ACCUEIL</h1></div>
  <div class="gallery">
    <MovieCard
      v-for="(movie, index) in randomMovies"
      :key="'movie' + index"
      :movie="movie"
    />
    <ActorCard v-for="actor in randomActors" :key="actor.id" :actor="actor" />
  </div>
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
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;
}
</style>
