<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
import ActorCard from "../components/ActorCard.vue";

let data = ref("");
let randomMovies = ref("");
let randomActors = ref(""); // Nouvelle référence pour le deuxième appel API
let token = localStorage.getItem("token");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function fetchData() {
  if (token) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/movies?page=1",
        {
          headers: {
            Accept: "application/ld+json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      data.value = response.data["hydra:member"];

      shuffleArray(data.value);
      randomMovies.value = data.value.slice(0, 4);
    } catch (error) {
      console.error("Erreur lors de la récupération des films:", error);
    }
  } else {
    window.location.href = "/login";
  }
}

async function fetchrandomActors() {
  // Fonction pour le deuxième appel API
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/actors?page=1",
      {
        headers: {
          Accept: "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    randomActors.value = response.data["hydra:member"];
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
  <div class="gallery-container">
    <div class="title">VOS RECOMMANDATIONS</div>
    <div class="movies">
      <MovieCard v-for="(movie, index) in randomMovies" :key="'movie' + index" :movie="movie" />
    </div>
    <div class="title">LES ACTEURS DU MOMENT</div>

    <div class="actors">
      <ActorCard v-for="actor in randomActors" :key="actor.id" :actor="actor" />
    </div>
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

.gallery-container {
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 2em;
    gap: 1em;
  }

  .actors {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2em auto;
    gap: 2em;
    padding: 2em;
    max-width: 1200px; // Adaptez en fonction de la largeur désirée
    background-color: #f4f4f4; // Une couleur de fond légère pour contraster avec les cartes
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  .title {
    font-size: 2em;
    font-weight: bold;
    margin: 2em;
    color: #252525;
  }
}
</style>
