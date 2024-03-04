<script setup>
import { onMounted, ref, toRaw } from "vue";
import axios from "axios";
import ActorCard from "../components/ActorCard.vue";
import AddActorForm from "../components/AddActorForm.vue";

let data = ref("");
let token = localStorage.getItem("token");
const isAddActor = ref(false);
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;

async function fetchData() {
  try {
    const response = await axios.get(`${baseUrlApi}/actors`, {
      headers: {
        Accept: "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    data.value = response.data["hydra:member"];
  } catch (error) {
    console.error(error);
    window.location.href = "/login";
  }
}


onMounted(() => {
  fetchData();
});

function toggleAddActor() {
  isAddActor.value = !isAddActor.value;
}
</script>

<template>
  <div>
    <AddActorForm :fetchData="fetchData" @close="toggleAddActor" v-if="isAddActor" />
  </div>

  <div class="crud">
    <div class="addActor" @click="toggleAddActor">Ajouter un acteur</div>
  </div>

  <div class="gallery">
    <ActorCard v-for="actor in data" :key="actor.id" :actor="actor" :fetchData="fetchData" />
  </div>
</template>

<style scoped>
.crud {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0;
}

.addActor {
  width: 10em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #55868C;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.addActor:hover {
  background-color: #3d6c72;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
