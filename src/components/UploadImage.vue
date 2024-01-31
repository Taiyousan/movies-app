<script setup></script>

<template>
    <div class="image-modal">
        <p class="image-modal-title">Ajout d'image</p>

        <form @submit.prevent="uploadImage">
            <label for="image">Image:</label>
            <input type="file" ref="fileInput" />
            <button type="submit">Envoyer</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.image-modal {
    position: fixed;
    height: 20em;
    width: 20em;
    background-color: #5d3535;
    border-radius: 8px;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        width: 100%;

        input {
            margin: 1em;
        }

        button {
            margin: 1em;
        }

        label {
            margin: 1em;
            color: white;
        }
    }

    .image-modal-title {
        font-size: 1.5em;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #A76571;
        padding: 1em;
        border-radius: 8px 8px 0 0;
        color: white;
    }

}
</style>