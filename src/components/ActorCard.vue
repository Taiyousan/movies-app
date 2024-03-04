<script setup>
import { defineProps, onMounted } from "vue";
import axios from "axios";
const { actor, fetchData } = defineProps(["actor", "fetchData"]);


const baseUrlApi = import.meta.env.VITE_BASE_URL_API
const token = localStorage.getItem("token")


async function deleteActor() {
  const actorId = actor["@id"].split("/").pop()
  try {
    const response = await axios.delete(`${baseUrlApi}/actors/${actorId}`, {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchData()
  }
  catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="actor-card">
    <div class="actor-content">
      <div class="actor-header">
        <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
      </div>
      <div class="actor-details">
        <p v-if="actor.nationality.name" class="actor-nationality">{{ actor.nationality.name }}</p>
        <div class="actor-movie-list">
          <router-link v-for="movie in actor.movies" :to="{ name: 'movieDetails', params: { id: movie.id } }"
            class="movie-link" :key="movie.id">
            {{ movie.title }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="delete" @click="deleteActor">Supprimer</div>
  </div>
</template>

<style scoped>
.actor-card {
  width: 15em;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1em;
}

.actor-content {
  padding: 1.5em;
}

.actor-header {
  text-align: center;
  margin-bottom: 1em;
}

.actor-header h2 {
  font-size: 1.2em;
  margin: 0;
}

.actor-details {
  font-size: 0.9em;
}

.actor-nationality {
  color: #666;
  margin-bottom: 1em;
}

.actor-movie-list {
  display: flex;
  flex-direction: column;
}

.movie-link {
  color: #007bff;
  text-decoration: none;
  margin-bottom: 0.5em;
  transition: color 0.3s ease;
}

.movie-link:hover {
  color: #0056b3;
}

.delete {
  background-color: #d9534f;
  color: white;
  text-align: center;
  padding: 0.5em 0;
  cursor: pointer;
}

.delete:hover {
  background-color: #c9302c;
}
</style>
