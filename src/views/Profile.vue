<script setup>
import Layout from "../layouts/DefaultLayout.vue";
import { useRouter } from "vue-router";
import Header from "../components/PageHeader.vue";

const router = useRouter();

const pageTitle = router.currentRoute.value.name;
</script>

<template>
    <Layout>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <Header :headerText="pageTitle" />
                </div>
            </div>
        </div>
    </Layout>
</template>
