<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref(null);
const appTitle = import.meta.env.VITE_APP_TITLE || "";

// const login = async () => {
//     try {
//         await auth.logIn({
//             email: email.value,
//             password: password.value,
//         });
//         router.push({ name: "Home" });
//     } catch (err) {
//         error.value = err.message;
//         console.log(err);
//     }
// };

const googleLogin = async () => {
    try {
        await auth.googleLogin();
        router.push({ name: "Home" });
    } catch (err) {
        error.value = err.message;
        console.log(err);
    }
};
</script>

<template>
    <div class="">
        <div class="flex-col border p-5">
            <button
                @click="googleLogin"
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
                Continue with Google
            </button>
        </div>
    </div>
</template>
