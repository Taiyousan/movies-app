<script setup>
defineProps({
  actor: Object,
});
</script>

<template>
  <!-- <div class="actor-card">
    <div class="actor-header">
      <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
    </div>
    <ul class="actor-movies">
      <li v-for="movie in actor.movies">{{ movie.title }}</li>
    </ul>
  </div> -->
  <div class="actor-card">
    <div class="actor-img">
      <img src="img/mark-ruffalo.webp" alt="">
    </div>
    <div class="actor-name">
      <p>{{ actor.firstName }} {{ actor.lastName }}</p>
    </div>
    <div class="actor-nationality">
      <p>{{ actor.nationality.name }}</p>
    </div>
    <div class="actor-movie-list">
      <p v-for="movie in actor.movies">{{ movie.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.actor-card {
  min-height: 25em;
  width: 15em;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  align-self: start;

  .actor-img {
    height: 12em;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 50%;
      width: 8em;
      height: 8em;
      object-fit: cover;
    }
  }

  .actor-name {
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: white;
    font-size: 0.8em;

    p {
      // background-color: rgba(0, 0, 0, 0.436);
      background-color: orange;
      border-radius: 20px;
      padding: 1em 5em;
    }
  }

  .actor-nationality {
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: 0.65em;

    p {
      margin-top: 1em;
    }
  }

  .actor-movie-list {
    font-size: 0.7em;
    margin-top: 1em;


    p {
      margin: 0.5em 0;
      padding: 1em;
      color: blue;
      font-weight: bold;
    }
  }
}
</style>
