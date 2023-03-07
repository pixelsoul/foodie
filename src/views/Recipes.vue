<script setup>
import { onMounted } from "vue";
import Layout from "../layouts/DefaultLayout.vue";
import { useRouter } from "vue-router";
import { useRecipesStore } from "../store/recipes";
import Header from "../components/PageHeader.vue";

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
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Header :headerText="pageTitle" />
                    <ul>
                        <li
                            v-for="recipe in store.recipes"
                            :key="recipe.id"
                        >
                            <router-link
                                :to="{
                                    name: 'Recipe',
                                    params: { id: recipe.id },
                                }"
                            >
                                {{ recipe.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
</template>
