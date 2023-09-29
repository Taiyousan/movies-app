<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import MovieCard from "../components/MovieCard.vue";
import ActorCard from "../components/ActorCard.vue";

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
  <MovieCard :key="data.id" :movie="data" :detailsPage="true" />
  <ActorCard v-for="actor in data.actors" :key="actor.id" :actor="actor" />
</template>

<style scoped lang="scss"></style>
