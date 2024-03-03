<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import CategoryCard from "../components/CategoryCard.vue";
import AddCategoryForm from "../components/AddCategoryForm.vue";

let data = ref("");
let token = ref(localStorage.getItem("token"));
const isAddCategory = ref(false);

async function fetchData() {
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
}

function toggleAddCategory() {
  isAddCategory.value = !isAddCategory.value;
}

onMounted(() => {
  fetchData();
});


</script>

<template>
  <AddCategoryForm :fetchData="fetchData" v-if="isAddCategory" @close="toggleAddCategory" />
  <div class="titre"><h1>CATEGORIES</h1></div>
  <div class="crud">
    <div class="addCategory" @click="toggleAddCategory">Ajouter une catégorie</div>
  </div>
  <div class="gallery">
    <CategoryCard
      v-for="category in data"
      :key="category.id"
      :category="category"
    />
  </div>
</template>

<style scoped lang="scss">
/* Categories.vue */

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  align-items: start; /* Aligner le contenu en haut */

  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.gallery > * {
  width: 100%;
  max-width: 300px;
}

.titre {
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    color: #333;
  }
}

.crud {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;

  .addCategory {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #A76571;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    padding: 1em 2em;
  }
}

</style>
