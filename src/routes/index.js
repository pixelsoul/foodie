import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../store/auth'
import nProgress from "nprogress";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/recipes",
        name: "Recipes",
        component: () => import("../views/Recipes.vue"),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/recipe/:id",
        name: "Recipe",
        component: () => import("../views/Recipe.vue"),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: {
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    base: import.meta.env.VITE_BASE_URL,
    mode: 'history',
    routes,
});

router.beforeEach((to) => {

    // start progress bar
    nProgress.start();
    nProgress.set(0.4);

    // check if route requires auth
    if (to.meta.requiresAuth && !useAuthStore().user.loggedIn) {
        router.push({ name: 'Login' });
    }
    // if logged in, redirect to home
    if ((to.name === "Login" || to.name === "Register") && useAuthStore().user.loggedIn) {
        router.push({ name: 'Home' });
    }

    // set page title
    if (to.name) {
        document.title = to.name + ' - ' + import.meta.env.VITE_APP_TITLE;
    }

});

router.afterEach(() => {
    // finish progress bar
    setTimeout(() => {
        nProgress.done()
    }, 500);

});

export default router;