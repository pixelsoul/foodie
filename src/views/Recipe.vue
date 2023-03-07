<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRecipesStore } from "../store/recipes";
import Layout from "../layouts/DefaultLayout.vue";
import Header from "../components/PageHeader.vue";
import Card from "../components/Card.vue";
import Tags from "../components/TagsDisplay.vue";

const route = useRoute();
const store = useRecipesStore();

const getRecipe = async () => {
    await store.fetchRecipe(route.params.id);
};

onMounted(getRecipe);
</script>

<template>
    <Layout>
        <Header :headerText="store.recipe.title" />
        <p>{{ store.recipe.description }}</p>
        <Tags :tags="store.recipe.tags" />

        <template v-slot:aside>
            <Card header="Ingredients">
                <ul v-for="(ingredient, key) in store.recipe.ingredients">
                    <li class="py-1 border-b-2 border-dotted">
                        {{ ingredient }}
                    </li>
                </ul>
            </Card>
        </template>
    </Layout>
</template>
