<script setup>
import Layout from "../layouts/DefaultLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const pageTitle = router.currentRoute.value.name;
</script>

<template>
    <Layout>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>{{ pageTitle }}</h1>
                </div>
            </div>
        </div>
    </Layout>
</template>
