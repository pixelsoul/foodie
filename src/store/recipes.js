import { defineStore } from 'pinia'
import { db } from '../data/firebaseConfig'
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'
import router from '../routes'

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
        async fetchRecipesByUser(userId) {
            this.setLoading(true)
            this.setRecipes([])
            try {
                const q = query(collection(db, 'recipes'), where('userId', '==', userId))
                const response = await getDocs(q)
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
        async fetchRecipesByCategory(category) {
            this.setLoading(true)
            this.setRecipes([])
            try {
                const q = query(collection(db, 'recipes'), where('category', '==', category))
                const response = await getDocs(q)
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
        async fetchRecipesBySearch(search) {
            this.setLoading(true)
            this.setRecipes([])
            try {
                const q = query(collection(db, 'recipes'), where('title', '>=', search))
                const response = await getDocs(q)
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
        async fetchRecipesByTag(tag) {
            this.setLoading(true)
            this.setRecipes([])
            try {
                const q = query(collection(db, 'recipes'), where('tags', 'array-contains', tag))
                const response = await getDocs(q)
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
                    router.push({ name: 'NotFound' })
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
