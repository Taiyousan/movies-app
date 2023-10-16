<script setup>
defineProps({
  actor: Object,
});
</script>

<template>
  <div class="actor-card">
    <div class="actor-header">
      <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
    </div>
    <ul class="actor-movies">
      <li v-for="movie in actor.movies">{{ movie.title }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.actor-card {
  background-color: #1b1b1b;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  margin: 20px auto;
  overflow: hidden;

  .actor-header {
    background-size: cover;
    background-position: center;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border-radius: 8px 8px 0 0;
    padding-bottom: 10px;

    h2 {
      margin: 0;
      font-size: 1.2em;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 5px 10px;
      border-radius: 5px;
    }
  }

  .actor-movies {
    margin-top: 20px;
    padding: 0;
    list-style: none;

    li {
      margin: 5px 0;
      font-size: 0.9em;
    }
  }
}
</style>
