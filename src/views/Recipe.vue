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
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div v-if="store.recipe.id">
                        <Header :headerText="store.recipe.title" />
                        <p>{{ store.recipe.description }}</p>
                        <Tags :tags="store.recipe.tags" />
                        <Card header="Ingredients">
                            <ul
                                v-for="(ingredient, key) in store.recipe
                                    .ingredients"
                            >
                                <li>{{ ingredient }}</li>
                            </ul>
                        </Card>
                    </div>
                    <div v-else>
                        <p>Recipe not found</p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
