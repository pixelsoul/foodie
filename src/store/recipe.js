import { defineStore } from "pinia"
import { firebaseDb } from "../data/firebaseConfig"

export const useRecipeStore = defineStore({
    id: "recipe",
    state: () => ({
        recipe: {},
        loading: false,
        error: null
    }),
    getters: {
        getRecipe: (state) => state.recipe,
        getLoading: (state) => state.loading,
        getError: (state) => state.error
    },
    actions: {
        async fetchRecipe(id) {
            this.setLoading(true)
            try {
                const response = await firebaseDb.ref(`recipes/${id}`).get()
                const data = response.val()
                this.setRecipe(data)
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        }
    }
})
