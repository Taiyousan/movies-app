<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import CategoryCard from "../components/CategoryCard.vue";

let data = ref("");
let token = ref(localStorage.getItem("token"));

onMounted(async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/categories?page=1",
    {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  data.value = response.data["hydra:member"];
});
</script>

<template>
  <div class="titre"><h1>CATEGORIES</h1></div>
  <div class="gallery">
    <CategoryCard
      v-for="category in data"
      :key="category.id"
      :category="category"
    />
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
  background-color: #f4f4f4; // Une couleur de fond légère pour contraster avec les cartes
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>
