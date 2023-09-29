<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

let data = ref("");

onMounted(async () => {
  const response = await axios.get(
    "http://localhost/s5/symfony-s5/public/index.php/api/movies?page=1",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  data.value = response.data;
  console.log(toRaw(data.value));
});
</script>

<template>
  <div class="titre"><h1>FILMS</h1></div>
  <div class="gallery">
    <MovieCard v-for="movie in data" :key="movie.id" :movie="movie" />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;
}
</style>
