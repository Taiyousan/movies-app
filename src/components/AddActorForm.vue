<script setup>
import { ref, onMounted, toRaw, defineEmits, defineProps } from "vue";
import axios from "axios";
const baseUrlApi = import.meta.env.VITE_BASE_URL_API;
const token = localStorage.getItem("token");

const emit = defineEmits();
const { fetchData } = defineProps(["fetchData"]);

const isError = ref(false);

const nationalityList = ref([]);
const selectedNationality = ref("");

const firstName = ref("");
const lastName = ref("");

// GET ACTORS
async function getNationalities(
    url = `${baseUrlApi}/nationalities`
) {
    const response = await axios.get(url, {
        headers: {
            Accept: "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    nationalityList.value = response.data["hydra:member"];
    nationalityList.value = nationalityList.value.map((nationality) => {
        return {
            idUrl: nationality["@id"],
            name: nationality.name
        };
    });
}

// POST MOVIE
async function postActor() {
    if (!firstName.value || !lastName.value || !selectedNationality.value) {
        isError.value = true;
        return;
    }
    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        nationality: selectedNationality.value.idUrl,
    };
    try {
        const response = await axios.post(`${baseUrlApi}/actors`, data, {
            headers: {
                Accept: "application/ld+json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        emit("close", true);
        isError.value = false;
        fetchData();
    } catch (error) {
        console.error("Erreur lors de l'ajout du film:", error);
        isError.value = true;
        throw error;
    }
}



const close = () => {
    emit("close", true);
};

onMounted(() => {
    getNationalities();
});
</script>

<template>
    <div class="add-actor">
        <p>Ajouter un acteur</p>
        <div class="error" v-if="isError"> Veuillez remplir tous les champs! </div>
        <div class="close" @click="close">FERMER</div>
        <form @submit.prevent="postActor">
            <div class="form-group">
                <label for="firstName">Prénom</label>
                <input type="text" id="firstName" v-model="firstName" />
            </div>
            <div class="form-group">
                <label for="lastName">Nom</label>
                <input type="text" id="lastName" v-model="lastName" />
            </div>
            <div class="form-group">
                <label for="nationality">Catégorie</label>
                <select id="nationality" v-model="selectedNationality">
                    <option value="" disabled>--Nationalité--</option>
                    <option v-for="nationality in nationalityList" :key="nationality.id" :value="nationality">{{
                        nationality.name }}
                    </option>
                </select>
            </div>

            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.add-actor {
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
