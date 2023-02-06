import { defineStore } from 'pinia'
import { firebaseAuth } from '../data/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import router from '../routes'

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: {
            loggedIn: false,
            data: null
        }
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        async register(name, email, password, password_confirmation) {
            if (password !== password_confirmation) throw new Error('Passwords do not match')

            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (!response.user) throw new Error('Could not complete registration')

            this.setUser(response.user)
            await updateProfile(response.user, {
                displayName: name
            })
        },
        async googleRegister() {
            const provider = new GoogleAuthProvider()
            const response = await signInWithPopup(firebaseAuth, provider)
            if (!response.user) throw new Error('Could not complete registration')
        },
        async logIn({ email, password }) {
            if (!email || !password) throw new Error('Email and password are required')
            if (this.user.loggedIn) throw new Error('You are already logged in')

            const response = await signInWithEmailAndPassword(firebaseAuth, email, password)
            if (!response.user) throw new Error('Could not complete login')

            this.setLoggedIn(true)
            this.setUser(response.user)
        },
        async googleLogin() {
            const provider = new GoogleAuthProvider()
            const response = await signInWithPopup(firebaseAuth, provider)
            if (!response.user) throw new Error('Could not complete login')

            this.setLoggedIn(true)
            this.setUser(response.user)
        },
        async logOut() {
            try {
                this.setLoggedIn(false)
                this.setUser({})
                await signOut(firebaseAuth)
                router.push({ name: 'Home' })
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUser(user) {
            this.setLoggedIn(user !== null)
            if (user) {
                this.setUser({
                    displayName: user.displayName,
                    email: user.email
                })
            } else {
                this.setUser(null)
            }
        },
        setLoggedIn(value) {
            this.user.loggedIn = value
        },
        setUser(data) {
            this.user.data = data
        },
        clearUser() {
            this.$reset()
        }
    },
    persist: true,
})
