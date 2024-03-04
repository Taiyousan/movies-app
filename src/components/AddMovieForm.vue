<script setup>
import { ref, onMounted, toRaw, defineEmits } from "vue";
import axios from "axios";
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;
const token = localStorage.getItem("token");

const emit = defineEmits();

const isError = ref(false);

const actorsList = ref([]);
const categoriesList = ref([]);
const selectedActors = ref([]);
const selectedCategory = ref("");

const title = ref("");
const description = ref("");
const duration = ref("");
const releaseDate = ref("");
const image = ref("");

// GET ACTORS
async function getActors(
    url = `${baseUrlApi}/actors`
) {
    const response = await axios.get(url, {
        headers: {
            Accept: "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    actorsList.value = response.data["hydra:member"];
    actorsList.value = actorsList.value.map((actor) => {
        return {
            id: actor["@id"],
            firstName: actor.firstName,
            lastName: actor.lastName,
        };
    });
    console.log(toRaw(actorsList.value));
}

// GET CATEGORIES
async function getCategories(
    url = `${baseUrlApi}/categories`
) {
    const response = await axios.get(url, {
        headers: {
            Accept: "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    categoriesList.value = response.data["hydra:member"];
    console.log(toRaw(categoriesList.value));
}

// POST MOVIE
async function postMovie() {
    const data = {
        title: title.value,
        description: description.value,
        duration: duration.value,
        releaseDate: releaseDate.value,
        actors: toRaw(selectedActors.value),
        image: await addImageToDb(),
        category: selectedCategory.value["@id"],
    };
    try {
        const response = await axios.post(`${baseUrlApi}/movies`, data, {
            headers: {
                Accept: "application/ld+json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        emit("close", true);
        isError.value = false;
    } catch (error) {
        console.error("Erreur lors de l'ajout du film:", error);
        isError.value = true;
        throw error;
    }
}

// ADD IMG
async function addImageToDb() {
    console.log('image', image.value);
    try {
        // HEADERS
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/merge-patch+json",
        };

        const formData = new FormData();
        formData.append('file', image.value);

        const response = await axios.post(`${baseUrlApi}/media_objects`, formData, { headers });
        const imageId = response.data['@id'];
        return imageId;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier:', error);
        throw error;
    }
}

const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        image.value = file;
    };
    reader.readAsDataURL(file);
};

const close = () => {
    emit("close", true);
};

onMounted(() => {
    getActors();
    getCategories();
});
</script>

<template>
    <div class="add-movie">
        <p>Ajouter un film</p>
        <div class="error" v-if="isError"> Veuillez remplir tous les champs! </div>
        <div class="close" @click="close">FERMER</div>
        <form @submit.prevent="postMovie">
            <div class="form-group">
                <label for="title">Titre</label>
                <input type="text" id="title" v-model="title" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label for="duration">Durée (en minutes)</label>
                <input type="number" id="duration" v-model="duration" />
            </div>
            <div class="form-group">
                <label for="releaseDate">Date de sortie</label>
                <input type="date" id="releaseDate" v-model="releaseDate" />
            </div>
            <div class="form-group form-group-actors">
                <label class="libelle">Acteurs</label>
                <div v-for="(actor, index) in actorsList" :key="actor.id" class="actor">
                    <input type="checkbox" :id="'actor_' + actor.id" :value="actor.id" v-model="selectedActors">
                    <label :for="'actor_' + actor.id">{{ actor.firstName + " " + actor.lastName }}</label>
                </div>
            </div>
            <div class="form-group">
                <label for="categories">Catégorie</label>
                <select id="categories" v-model="selectedCategory">
                    <option v-for="categorie in categoriesList" :key="categorie.id" :value="categorie">{{
                        categorie.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" id="image" @change="handleImageChange" />
            </div>

            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.add-movie {
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

        .form-group-actors {
            display: grid;
            grid-template-columns: repeat(3, 1fr); // Trois colonnes égales
            gap: .5em; // Espacement entre les éléments
            font-size: .8em;

            .libelle {
                grid-column: 1 / -1; // Le libellé s'étend sur toutes les colonnes
                font-weight: bold;
            }
        }

        .actor {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .form-group-actors label {
            display: block; // Afficher les labels sur une nouvelle ligne
        }

        .form-group-actors input[type="checkbox"] {
            margin-right: 5px; // Espacement entre la case à cocher et le label
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
