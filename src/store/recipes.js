import { defineStore } from 'pinia'
import { db } from '../data/firebaseConfig'
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'

export const useRecipesStore = defineStore({
    id: "recipes",
    state: () => ({
        recipes: [],
        recipe: {},
        loading: false,
        error: null
    }),
    getters: {
        getRecipes: (state) => state.recipes,
        getRecipe: (state) => state.recipe,
        getLoading: (state) => state.loading,
        getError: (state) => state.error
    },
    actions: {
        async fetchRecipes() {
            this.setLoading(true)
            this.setRecipes([])
            try {
                const response = await getDocs(collection(db, 'recipes'))
                response.forEach(doc => {
                    const recipe = { ...doc.data(), id: doc.id }
                    this.recipes.push(recipe)
                })
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        },
        async fetchRecipe(id) {
            this.setLoading(true)
            this.setRecipe({})
            try {
                const recipe = doc(db, 'recipes', id)
                const response = await getDoc(recipe)
                if (response.exists()) {
                    const data = { ...response.data(), id: response.id }
                    this.setRecipe(data)
                } else {
                    console.log('No such document!')
                }
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        },
        async addRecipe(recipe) {
            this.setLoading(true)
            try {
                await db.ref('recipes').push(recipe)
                this.fetchRecipes()
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        },
        async updateRecipe(recipe) {
            this.setLoading(true)
            try {
                await db.ref(`recipes/${recipe.id}`).update(recipe)
                this.fetchRecipes()
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        },
        async deleteRecipe(id) {
            this.setLoading(true)
            try {
                await db.ref(`recipes/${id}`).remove()
                this.fetchRecipes()
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        },
        async likeRecipe(id) {
            this.setLoading(true)
            try {
                const recipe = doc(db, 'recipes', id)
                const response = await getDoc(recipe)
                if (response.exists()) {
                    const data = { ...response.data(), id: response.id }
                    const likes = data.likes + 1
                    await db.ref(`recipes/${id}`).update({ likes })
                    this.fetchRecipes()
                } else {
                    console.log('No such document!')
                }
            }
            catch (error) {
                this.setError(error)
            }
            finally {
                this.setLoading(false)
            }
        },
        setRecipes(recipes) {
            this.recipes = recipes
        },
        setRecipe(recipe) {
            this.recipe = recipe
        },
        setLoading(loading) {
            this.loading = loading
        },
        setError(error) {
            this.error = error
        }
    }
})
