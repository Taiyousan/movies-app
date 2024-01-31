<script setup>
import { ref } from 'vue'
import axios from 'axios'
import UploadImage from './UploadImage.vue'
const token = localStorage.getItem('token')
const props = defineProps(['currentEditingMovie', 'fetchData', 'handleIsModalEdit'])
const editedMovie = ref({
    title: '',
    description: '',
    duration: ''
})

// EDIT MOVIE
async function editMovie() {
    console.log(props.currentEditingMovie.id);
    try {
        // TOKEN
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   router.push("/");
        //   return;
        // }

        // HEADERS
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/merge-patch+json",
        };

        const updatedMovie = {
            title: editedMovie.value.title
                ? editedMovie.value.title
                : props.currentEditingMovie.title,
            description: editedMovie.value.description
                ? editedMovie.value.description
                : props.currentEditingMovie.description,
            duration:
                editedMovie.value.duration !== ""
                    ? parseInt(editedMovie.value.duration)
                    : parseInt(props.currentEditingMovie.duration),
        };

        // REQUEST
        await axios.patch(
            `http://127.0.0.1:8000/api/movies/${props.currentEditingMovie.id}`,
            updatedMovie,
            { headers }
        );

        // Recharger les données, fermer le modal, et réinitialiser les valeurs
        props.handleIsModalEdit(false);
        props.fetchData();
        editedMovie.value = {
            title: "",
            description: "",
            duration: "",
        };
    } catch (error) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.log(error);
    }
}


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

            <button type="submit" class="edit-button">Submit</button>

        </form>
        <button @click="props.handleIsModalEdit(false)" class="handle-is-modal-edit">truc</button>
    </div>
    <UploadImage />
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

        .edit-button {
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

        .handle-is-modal-edit {
            padding: 10px;
            background-color: #a7b4c2; // Couleur bleue pour le bouton, ajustez selon vos besoins
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