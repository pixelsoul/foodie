<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRecipesStore } from "../store/recipes";
import { useAuthStore } from "../store/auth";
import Layout from "../layouts/DefaultLayout.vue";
import Card from "../components/Card.vue";
import RecipeHeader from "../components/RecipeHeader.vue";

const route = useRoute();
const store = useRecipesStore();
const auth = useAuthStore();

const getRecipe = async () => {
    await store.fetchRecipe(route.params.id);
};

onMounted(getRecipe);
</script>

<template>
    <Layout v-if="store.recipe.id">
        <template v-slot:header>
            <div>
                <RecipeHeader
                    :text="store.recipe.title"
                    :image="store.recipe.image || ''"
                    :tags="store.recipe.tags"
                />
            </div>
        </template>

        <Card>
            <div class="flex mb-5">
                <img
                    class="h-10 w-10 rounded-full border-white-500 border-2 flex-shrink-0 focus:ring-2 focus:ring-offset-2"
                    :src="
                        auth.user.data.photoURL ||
                        'https://ui-avatars.com/api/?name=' +
                            auth.user.data.displayName
                    "
                    alt=""
                />
                <span class="ml-2 text-black dark:text-white text-sm">
                    {{ auth.user.data.displayName }}
                </span>
            </div>
            <p class="py-1">
                {{ store.recipe.description }}
            </p>
        </Card>

        <Card header="Instructions">
            <ol v-for="(instruction, key) in store.recipe.instructions">
                <li class="py-1">
                    <span>{{ key + 1 }} )</span> {{ instruction }}
                </li>
            </ol>
        </Card>

        <template v-slot:aside>
            <Card header="Ingredients">
                <ul v-for="(ingredient, key) in store.recipe.ingredients">
                    <li class="py-1 border-b-2 border-gray-100">
                        {{ ingredient }}
                    </li>
                </ul>
            </Card>
        </template>
    </Layout>
</template>
