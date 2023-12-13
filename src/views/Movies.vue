<script setup>
import { onMounted, ref, computed, toRaw } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
import SearchBar from "../components/SearchBar.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import EditForm from "../components/EditForm.vue";

let data = ref("");
let completeData = ref("");
let page = ref(1);
let nextPageUrl = ref("");
let pagesTotal = ref(0);
let isNoResults = ref(false);
let isLoaded = ref(false);
let token = localStorage.getItem("token");
const isModalEdit = ref(false);
let currentEditingMovie = ref("");

onMounted(() => {
  fetchData();
});

// FETCH DATA
async function fetchData(
  url = `http://127.0.0.1:8000/api/movies?page=${page.value}`
) {
  isLoaded.value = false;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token}`,
    },
  });
  data.value = response.data["hydra:member"];
  completeData.value = response.data["hydra:member"];
  nextPageUrl.value =
    "http://127.0.0.1:8000" + response.data["hydra:view"]["hydra:next"];
  pagesTotal.value = response.data["hydra:view"]["hydra:last"].split("=")[1];
  isLoaded.value = true;
}


function changePage(pageNumber) {
  page.value = pageNumber;
  fetchData();
}

function handleSearchEvent(searchResults) {
  if (searchResults.length === 0) {
    isNoResults.value = true;
  } else {
    isNoResults.value = false;
  }

  data.value = searchResults;
}

const handleEditEvent = (data) => {
  if (isModalEdit.value === false) {
    isModalEdit.value = true;
  } else {
    isModalEdit.value = false;
  }
  currentEditingMovie.value = data;
};

function handleSearchLoader(isSearchLoaded) {
  isLoaded.value = isSearchLoaded;
}

function handleIsModalEdit(bool) {
  isModalEdit.value = bool;
}
</script>

<template>
  <EditForm
    v-if="isModalEdit"
    :currentEditingMovie="currentEditingMovie"
    :fetchData="fetchData"
    :handleIsModalEdit="handleIsModalEdit"
    />
 
  <div class="titre">
    <h1>FILMS</h1>

    <SearchBar
      @search-event="handleSearchEvent"
      @isSearchLoaded="handleSearchLoader"
      :token="token"
    />
  </div>
  <div class="pagination">
    <div class="prev page" @click="changePage(page - 1)" v-if="page !== 1">
      PREV
    </div>
    <div
      v-for="i in parseInt(pagesTotal)"
      :key="i"
      class="page"
      @click="changePage(i)"
      :class="{ 'active-page': i === page }"
    >
      {{ i }}
    </div>
    <div
      class="next page"
      v-if="nextPageUrl && page !== parseInt(pagesTotal)"
      @click="changePage(page + 1)"
    >
      NEXT
    </div>
  </div>
  <div class="gallery" v-if="!isNoResults && isLoaded">
    <MovieCard
      v-for="movie in data"
      :key="movie.id"
      :movie="movie"
      @edit-event="handleEditEvent"
    />
  </div>
  <div class="gallery" v-if="isNoResults && isLoaded">
    <p>Aucun résultat !</p>
  </div>
  <div class="loader-container" v-if="!isLoaded">
    <pulse-loader :loading="loading" color="orange" :size="size"></pulse-loader>
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em;
  gap: 1em;
}

.page {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #252525;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:active {
    background-color: #1b1b1b;
  }

  &:hover,
  &.active-page {
    background-color: #ffffff;
    color: #252525;
    outline: 2px solid #252525;
  }
}

.modal-edit {
  position: fixed;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  height: 90vh;
  width: 20em;
  background-color: #252525;
  border-radius: 1em 0 0 1em;
  color: white;

  // Ajoutez ici des styles spécifiques à la modal

  // Exemple de style pour les enfants de la modal
  & > * {
    margin: 10px; // Marge entre les éléments enfants de la modal
  }

  .edit-title {
    font-weight: bold;
  }

  .form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
    }

    input,
    textarea {
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid white;
      border-radius: 4px;
      background-color: transparent;
      color: white;
    }

    textarea {
      height: 300px;
    }

    button {
      padding: 10px;
      background-color: #007bff; // Couleur bleue pour le bouton, ajustez selon vos besoins
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3; // Changement de couleur au survol
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
