<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import ActorCard from "../components/ActorCard.vue";

let data = ref("");
let token = localStorage.getItem("token");

onMounted(async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/actors?page=1", {
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = response.data["hydra:member"];
  console.log(toRaw(data.value));
});
</script>

<template>
  <div class="gallery">
    <ActorCard v-for="actor in data" :key="actor.id" :actor="actor" />
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2em auto;
  gap: 2em;
  padding: 2em;
  max-width: 1200px; // Adaptez en fonction de la largeur désirée
  // background-color: #f4f4f4; // Une couleur de fond légère pour contraster avec les cartes
  border-radius: 12px;
  // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>
