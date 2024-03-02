<script setup>
import { ref, toRaw } from 'vue'
import axios from 'axios'
const token = localStorage.getItem('token')
const props = defineProps(['currentEditingMovie', 'fetchData', 'handleIsModalEdit'])
const editedMovie = ref({
    title: '',
    description: '',
    duration: '',
    image: ''
})
const isNewImg = ref(false)
const originalImage = props.currentEditingMovie.image ? ref('http://127.0.0.1:8000/uploads/' + props.currentEditingMovie.image.filePath) : ref('no image')
const image = props.currentEditingMovie.image ? ref(originalImage.value) : ref('no image')

// EDIT MOVIE
const handleFileInputChange = (event) => {
    // quand l'utilisateur choisit une image, elle est affichée dans le formulaire
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image.value = reader.result;
            editedMovie.value.image = file;
        };
        reader.readAsDataURL(file);
        isNewImg.value = true
    }
};

const cancelNewImg = () => {
    isNewImg.value = false
    editedMovie.value.image = ''
    image.value = props.currentEditingMovie.image ? originalImage : "no image"
    console.log('originalImage', originalImage);
}

async function addImageToDb() {
    try {
        // HEADERS
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/merge-patch+json",
        };

        const formData = new FormData();
        formData.append('file', editedMovie.value.image);

        const response = await axios.post('http://127.0.0.1:8000/api/media_objects', formData, { headers });
        const imageId = response.data['@id'];
        return imageId;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier:', error);
        throw error;
    }
}



async function editMovie() {
    try {

        const imageId = isNewImg.value ? await addImageToDb() : null

        // HEADERS
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/merge-patch+json",
        };

        const updatedMovie = {
            ...(editedMovie.value.title !== "" ? { title: editedMovie.value.title } : {}),
            ...(editedMovie.value.description !== "" ? { description: editedMovie.value.description } : {}),
            ...(editedMovie.value.duration !== "" ? { duration: parseInt(editedMovie.value.duration) } : {}),
            ...(imageId ? { image: imageId } : {})
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
                v-model="editedMovie.description"></textarea>

            <label for="editDuration">Durée (en minutes):</label>
            <input type="number" id="editDuration" name="editDuration" v-model="editedMovie.duration"
                :placeholder="currentEditingMovie.duration" />

            <label for="image">Image:</label>
            <div class="container-img">
                <img :src="originalImage" alt="">
                <div v-if="isNewImg" class="new-image">
                    <img src="icons/arrow-right.png" alt="">
                    <img :src="image" alt="">
                    <p class="delete-img-btn" @click="cancelNewImg">Annuler</p>
                </div>
            </div>
            <input type="file" ref="fileInput" @change="handleFileInputChange" />


            <button type="submit" class="edit-button">Submit</button>

        </form>
        <button @click="props.handleIsModalEdit(false)" class="handle-is-modal-edit">close</button>
        <button @click="addImageToDb" class="handle-is-modal-edit">addimg</button>
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
    width: 50em;
    background-color: #252525;
    border-radius: 1em 0 0 1em;
    color: white;
    // padding: 2em;

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

        .container-img {
            display: flex;
            align-items: center;
            flex-direction: row;

            img {
                width: 20%;
                object-fit: cover;
                margin: 1em 0;
            }

            .delete-img-btn {
                background-color: white;
                color: rgb(181, 142, 142);
                padding: 0.5em 1em;
                border-radius: 8px;
                cursor: pointer;
                margin-left: 1em;
                font-size: .8em;
                width: fit-content;
                // display: none;
            }

            .new-image {
                display: flex;
                align-items: center;
                gap: 1em;
            }
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