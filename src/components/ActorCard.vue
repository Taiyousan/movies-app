<script setup>
import { defineProps, onMounted } from "vue";
import axios from "axios";
const { actor, fetchData } = defineProps(["actor", "fetchData"]);


const baseUrlApi = import.meta.env.VITE_BASE_URL_API
const token = localStorage.getItem("token")

onMounted(() => {
  console.log(actor)
})

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
  <!-- <div class="actor-card">
    <div class="actor-header">
      <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
    </div>
    <ul class="actor-movies">
      <li v-for="movie in actor.movies">{{ movie.title }}</li>
    </ul>
  </div> -->
  <div class="actor-card">
    <div class="delete" @click="deleteActor">Supprimer</div>
    <div class="actor-name">
      <p>{{ actor.firstName }} {{ actor.lastName }}</p>
    </div>
    <div class="actor-nationality" v-if="actor.nationality.name">
      <p>{{ actor.nationality.name }}</p>
    </div>
    <div class="actor-movie-list">
      <!-- <p v-for="movie in actor.movies">{{ movie.title }}</p> -->
      <RouterLink v-for="movie in actor.movies" :to="{ name: 'movieDetails', params: { id: movie.id } }"
         class="link">
        {{ movie.title }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.actor-card {
  min-height: 25em;
  width: 15em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  align-self: start;

  .actor-img {
    height: 12em;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 50%;
      width: 8em;
      height: 8em;
      object-fit: cover;
    }
  }

  .delete {
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: white;
    font-size: 0.8em;
    background-color: rgb(211, 0, 0);
    border-radius: 20px;
    padding: 1em 5em;

    margin: 1em;

    cursor: pointer;
  }

  .actor-name {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: white;
    font-size: 0.8em;

    margin: 1em;

    p {
      // background-color: rgba(0, 0, 0, 0.436);
      background-color: #A76571;
      border-radius: 20px;
      padding: 1em 5em;
    }
  }

  .actor-nationality {
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 0.65em;

    p {
      margin-top: 1em;
    }
  }

  .actor-movie-list {
    font-size: 0.7em;
    margin-top: 1em;
    display: flex;
    flex-direction: column;

    a {
      padding: 1em;
      color: #55868C;
      font-weight: bold;
      text-decoration: none;
    }
  }
}
</style>
