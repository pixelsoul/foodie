<script setup>
import { onMounted } from "vue";
import Layout from "../layouts/DefaultLayout.vue";
import { useRouter } from "vue-router";
import { useRecipesStore } from "../store/recipes";
import Header from "../components/PageHeader.vue";
import Card from "../components/Card.vue";

const router = useRouter();
const store = useRecipesStore();

const getRecipes = async () => {
    await store.fetchRecipes();
};

const pageTitle = router.currentRoute.value.name;

onMounted(getRecipes);
</script>

<template>
    <Layout>
        <template v-slot:header>
            <div class="mb-10">
                <h1 class="text-4xl">Recipes</h1>
            </div>
        </template>

        <div v-if="store.recipes.length === 0">
            <p>No recipes found.</p>
        </div>

        <div v-else>
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
            >
                <Card
                    v-for="recipe in store.recipes"
                    :key="recipe.id"
                    :header="recipe.title"
                    :image="
                        recipe.image || 'https://placekitten.com/200/300'
                    "
                    :tags="recipe.tags"
                    :link="{
                        name: 'Recipe',
                        params: { id: recipe.id },
                    }"
                >
                    <p class="py-1 truncate hover:text-clip">
                        {{ recipe.description }}
                    </p>
                </Card>
            </div>
        </div>

        <template v-slot:aside>
            <Card header="Popular Recipes">
                <p>Coming soon...</p>
            </Card>

            <Card header="Categories">
                <p>Coming soon...</p>
            </Card>

            <Card header="Tags">
                <p>Coming soon...</p>
            </Card>
        </template>
    </Layout>
</template>
