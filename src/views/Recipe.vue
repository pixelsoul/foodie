<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRecipesStore } from "../store/recipes";
import Layout from "../layouts/DefaultLayout.vue";

const route = useRoute();
const store = useRecipesStore();

const getRecipe = async () => {
    await store.fetchRecipe(route.params.id);
};

onMounted(getRecipe);
</script>

<template>
    <Layout>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div v-if="store.recipe.id">
                        <h1>{{ store.recipe.title }}</h1>
                        <p>{{ store.recipe.description }}</p>
                    </div>
                    <div v-else>
                        <p>Recipe not found</p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
