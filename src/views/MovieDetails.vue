<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import MovieCard from "../components/MovieCard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

let data = ref("");
let id = useRoute().params.id;
let token = localStorage.getItem("token");
let isLoaded = ref(false);
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;
const baseUrl = import.meta.env.VITE_BASE_URL;

onMounted(async () => {
  const response = await axios.get(`${baseUrlApi}/movies/` + id, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/merge-patch+json",
    },
  });
  data.value = response.data;
  isLoaded.value = true;
});
</script>

<template>
  <div v-if="isLoaded">
    <!-- <MovieCard :key="data.id" :movie="data" :detailsPage="true" />
    <div class="gallery">
      <ActorCard
        v-for="actor in data.actors"
        :key="actor.id"
        :actor="actor"
        :detailsPage="true"
      />
    </div> -->
    <div class="detail">
      <div class="detail-img">
        <img :src="`${baseUrl}/uploads/${data.image.filePath}`" alt="" v-if="data.image">
        <img src="/img/placeholder.png" alt="" v-else>
      </div>
      <div class="detail-title">{{ data.title }}</div>
      <div class="detail-info">
        <p class="category">{{ data.category.name }}</p>
        <p class="duration">{{ data.duration }} minutes</p>
        <p class="release-date">{{ data.releaseDate }}</p>
      </div>
      <div class="synopsis">
        <p>{{ data.description }}</p>
      </div>
      <div class="casting">
        <p class="title">Casting</p>
        <div class="actors" v-for="actor in data.actors">
          <!-- <img src="/img/mark-ruffalo.webp" alt=""> -->
          <p>{{ actor.firstName }} {{ actor.lastName }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="loader-container" v-else>
    <pulse-loader color="#55868C"></pulse-loader>
  </div>
</template>

<style scoped lang="scss">
.detail {
  padding: 0 2em;
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .detail-title {
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #55868C;
    padding: 1em;
    border-radius: 8px;
    color: white;
  }

  .detail-img {
    display: flex;
    justify-content: end;
    align-items: center;
    height: 20em;

    img {
      height: 100%;
      transform: translateY(25%) translateX(-25%);
      border-radius: 8px;
    }
  }

  .detail-info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 1em;

    .category {
      background-color: #55868C;
      border-radius: 8px;
      color: white;
      padding: 1em;
    }

    .release-date,
    .duration {
      border-radius: 8px;
      color: rgb(161, 161, 161);
      padding: 1em;
    }
  }

  .synopsis {
    padding: 1em;
    border-radius: 8px;
    width: 80%;
    margin: auto;
    // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  .casting {
    padding: 1em;
    border-radius: 8px;
    width: 80%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    .title {
      font-size: 1em;
      font-weight: bold;
      text-transform: uppercase;
      background-color: #55868C;
      padding: 1em;
      border-radius: 8px;
      color: white;
      width: 100%;
    }

    .actors {
      // outline: #55868C solid 1px;
      margin-top: 1em;
      width: fit-content;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      padding: 1em;
      border-radius: 8px;

      img {
        height: 10em;
        border-radius: 8px;
      }

      p {
        text-align: center;
        font-weight: bold;
        font-size: 0.8em;
        // padding-top: 1em;
      }
    }
  }
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
}
</style>
