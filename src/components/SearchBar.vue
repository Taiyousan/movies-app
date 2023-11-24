<script setup>
import { ref, toRaw } from "vue";
import axios from "axios";
import { defineProps, defineEmits } from "vue";
import { def } from "@vue/shared";

const searchQuery = ref("");
const searchResults = ref([]);
let timeout;
const emit = defineEmits();
const token = defineProps(["token"]);

function handleSearch() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://127.0.0.1:8000/api/movies?title=${searchQuery.value}`,
    headers: {
      Accept: "application/ld+json",
      Authorization: `Bearer ${token.token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      searchResults.value = response.data["hydra:member"];

      emit("search-event", searchResults.value);
    })
    .catch((error) => {
      console.log(error);
    });
}

function debounceWithDelay(func, delay) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    func();
  }, delay);
}
</script>

<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Rechercher..."
        @input="debounceWithDelay(handleSearch, 500)"
        v-model="searchQuery"
      />
      <button>
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-bar-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .search-bar {
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    border-radius: 5px;
    padding: 8px;
    width: 60%;

    input {
      flex: 1;
      border: none;
      padding: 8px;
      font-size: 16px;
      border-radius: 5px;
      outline: none;
    }

    button {
      background-color: #3498db;
      color: #fff;
      border: none;
      padding: 8px;
      border-radius: 5px;
      margin-left: 8px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #2980b9;
      }

      i {
      }
    }
  }
}
</style>
