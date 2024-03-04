<script setup>
import { ref, onMounted, toRaw, defineEmits, defineProps } from "vue";
import axios from "axios";
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;
const token = localStorage.getItem("token");

const emit = defineEmits();
const { fetchData } = defineProps(["fetchData"]);

const isError = ref(false);

const name = ref("");


// POST MOVIE
async function postCategory() {
    if (!name.value) {
        isError.value = true;
        return;
    }
    const data = {
        name: name.value,
    };
    try {
        const response = await axios.post(`${baseUrlApi}/categories`, data, {
            headers: {
                Accept: "application/ld+json",
                Authorization: `Bearer ${token}`,
            },
        });
        emit("close", true);
        isError.value = false;
        fetchData();
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une catégorie :", error);
        isError.value = true;
        throw error;
    }
}



const close = () => {
    emit("close", true);
};

</script>

<template>
    <div class="add-category">
        <p>Ajouter une catégorie</p>
        <div class="error" v-if="isError"> Veuillez remplir tous les champs! </div>
        <div class="close" @click="close">FERMER</div>
        <form @submit.prevent="postCategory">
            <div class="form-group">
                <label for="name">Nom de la catégorie</label>
                <input type="text" id="name" v-model="name" />
            </div>
            

            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.add-category {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 95%;
    border-radius: 8px;
    background-color: #f4f4f4;
    /* Couleur de fond légèrement grisée */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1em;
    overflow-y: auto;

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        color: #007bff;
        /* Couleur bleue */
    }

    p {
        text-align: center;
        color: #333;
        /* Couleur du texte légèrement foncée */
    }

    .error {
        /* Par défaut, on cache le message d'erreur */
        /* Couleur de fond rouge */
        color: red;
        border-radius: 4px;
        margin-bottom: 1em;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        /* Espacement entre les éléments du formulaire */

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5em;

            label {
                font-weight: bold;
                color: #555;
                /* Couleur du texte légèrement grisé */
            }

            input,
            textarea {
                padding: 10px;
                border: 1px solid #ccc;
                /* Bordure légèrement grise */
                border-radius: 4px;
                background-color: #fff;
                /* Fond blanc */
                transition: border-color 0.3s;
                /* Transition pour un effet fluide lors du survol/focus */
            }

            input:focus,
            textarea:focus {
                outline: none;
                border-color: #007bff;
                /* Bordure bleue lors du focus */
            }
        }
    }

    button[type="submit"] {
        padding: 10px 20px;
        background-color: #007bff;
        /* Couleur de fond bleue */
        color: #fff;
        /* Couleur du texte blanc */
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        /* Transition pour un effet fluide lors du survol */
    }

    button[type="submit"]:hover {
        background-color: #0056b3;
        /* Couleur de fond bleue légèrement plus foncée au survol */
    }
}
</style>
