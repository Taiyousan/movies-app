<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import MovieCard from "../components/MovieCard.vue";

let data = ref("");
let id = useRoute().params.id;

onMounted(async () => {
  const response = await axios.get(
    "http://localhost/s5/symfony-s5/public/index.php/api/movies/" + id,
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
  <MovieCard :key="data.id" :movie="data" />
</template>

<style scoped lang="scss"></style>
