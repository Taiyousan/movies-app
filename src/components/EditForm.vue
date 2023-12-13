<script setup>
const props = defineProps(['currentEditingMovie'])

console.log(props.foo)
</script>
<template>
    <div class="modal-edit">
        <p>
            Vous modifiez le film suivant :
            <span class="edit-title">{{ currentEditingMovie.title }}</span>
        </p>
        <form class="form" @submit.prevent="editMovie">
            <label for="editTitle">Titre:</label>
            <input type="text" id="editTitle" name="editTitle" v-model="editedMovie.title"
                :placeholder="currentEditingMovie.title" />

            <label for="editDescription">Description:</label>
            <textarea type="text" id="editDescription" name="editDescription" :placeholder="currentEditingMovie.description"
                height="500px" v-model="editedMovie.description"></textarea>

            <label for="editDuration">Durée (en minutes):</label>
            <input type="number" id="editDuration" name="editDuration" v-model="editedMovie.duration"
                :placeholder="currentEditingMovie.duration" />

            <button type="submit">Submit</button>
        </form>
    </div>
</template>
<style scoped lang="scss">
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
    &>* {
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
</style>