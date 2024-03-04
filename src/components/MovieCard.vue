<script setup>
// Importez defineProps et defineEmits depuis 'vue'
import { defineProps, defineEmits, toRaw } from "vue";
import axios from "axios";

// Définissez les propriétés reçues de la Card
const { movie, detailsPage, canEdit, fetchData } = defineProps(["movie", "detailsPage", "canEdit", "fetchData"]);
const baseUrl = import.meta.env.VITE_BASE_URL;
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;
const token = localStorage.getItem("token");
// Définissez les événements que vous prévoyez d'émettre
const emit = defineEmits();

// Ajoutez la méthode qui émet l'événement personnalisé
const triggerEvent = (data) => {
  // Émettre l'événement vers le parent avec les données spécifiées
  emit("edit-event", data);
};

async function deleteMovie(id) {
  const url = `${baseUrlApi}/movies/${id}`;
  const response = await axios.delete(url, {
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  });
  fetchData();
}
</script>

<template>
  <div
    :style="{ backgroundImage: movie.image ? `url(${baseUrl}/uploads/${movie.image.filePath})` : 'url(img/placeholder.png)' }"
    class="movie-card">
    <div class="movie-card-content">
      <div class="movie-card-title">
        <p>{{ movie.title }}</p>
      </div>
      <div class="movie-card-infos">
        <div class="info">
          <p class="info-libelle">Synopsis </p>
          <p class="info-text">{{ movie.description.length > 75 ? movie.description.slice(0, 75) + '...' :
      movie.description }}</p>
        </div>
        <div class="info">
          <p class="info-libelle">Date de sortie </p>
          <p class="info-text">{{ movie.releaseDate }}</p>
        </div>
        <div class="info">
          <p class="info-libelle">Durée (en minutes) </p>
          <p class="info-text">{{ movie.duration }}</p>
        </div>
      </div>
      <div class="actors" v-if="!detailsPage">
        <div class="actor" v-for=" actor  in  movie.actors ">
          <p>
            {{ actor.firstName + " " + actor.lastName }}
          </p>
        </div>
      </div>
      <div class="links">
        <RouterLink :to="{ name: 'movieDetails', params: { id: movie.id } }" v-if="!detailsPage" class="link">
          Voir la fiche
        </RouterLink>
        <div class="link green" v-if="canEdit" @click="triggerEvent(movie)">Modifier</div>
        <div class="link alert" v-if="canEdit" @click="deleteMovie(movie.id)">Supprimer</div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.movie-card {
  height: 28em;
  width: 20em;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: #fff;
  border-radius: 8px;

  &:hover {
    .movie-card-content {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  .movie-card-content {
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
    transform: scaleY(0);
    opacity: 0;
    transition: 0.2s;
    transform-origin: bottom;
    border-radius: 8px;
  }

  .movie-card-title {
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1em;
    background-color: #55868C;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    border-radius: 8px 8px 0 0;
    text-wrap: nowrap;
    font-size: 0.8em;
  }

  .movie-card-infos {

    // outline: red solid 1px;
    padding: 0.5em 0.5em 0 0.5em;

    .info {
      // outline: red solid 1px;
      margin: 1em 0.1em;
      padding: 0em 0.5em;

      .info-libelle {
        font-weight: bold;
        padding-bottom: 0.5em;
        font-size: 0.9em;
        width: 50%;
        border-bottom: 1px solid #55868C;
      }

      .info-text {
        padding: 0.2em 0;
        font-size: 0.7em;
        line-height: 1.4em;
        margin-top: 0.5em;
        font-weight: bold;
        // font-family: 'Roboto', sans-serif !important;
      }
    }
  }

  .actors {
    display: flex;
    width: 90%;
    margin: auto;
    // flex-wrap: wrap;
    flex-direction: row;
    align-items: start;
    justify-content: space-around;
    gap: 5px;

    .actor {
      width: fit-content;

      p {
        margin: 0;
        background-color: #2d2d2d;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.6em;
        width: fit-content;
        text-align: center;
      }
    }
  }

  .links {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    // padding: 0.8em 0;
    margin-bottom: 2em;

    .link {
      display: inline-block;
      text-decoration: none;
      color: white;
      background-color: #55868C;
      padding: 10px 20px;
      border-radius: 8px;
      transition: background-color 0.3s, transform 0.2s;
      cursor: pointer;
      font-size: 0.7em;
    }

    .green {
      background-color: #4caf50;
    }

    .alert {
      background-color: #f44336;
    }
  }

}
</style>
