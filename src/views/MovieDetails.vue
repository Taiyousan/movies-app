<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import MovieCard from "../components/MovieCard.vue";
import ActorCard from "../components/ActorCard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

let data = ref("");
let id = useRoute().params.id;
let token = localStorage.getItem("token");
let isLoaded = ref(false);

onMounted(async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/movies/" + id, {
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
    <MovieCard :key="data.id" :movie="data" :detailsPage="true" />
    <div class="gallery">
      <ActorCard
        v-for="actor in data.actors"
        :key="actor.id"
        :actor="actor"
        :detailsPage="true"
      />
    </div>
  </div>

  <div class="loader-container" v-else>
    <pulse-loader :loading="loading" color="orange" :size="size"></pulse-loader>
  </div>
</template>

<style scoped lang="scss">
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
}
</style>
