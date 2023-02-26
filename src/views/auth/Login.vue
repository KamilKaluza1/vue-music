<template>
    <form @submit.prevent="handleClick">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isLoading" >Log in</button>
        <button v-if="isLoading" disabled>Loading...</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { useRouter } from 'vue-router';
import {ref } from 'vue'
export default {
    setup(){
        const router = useRouter()
        const {error, login, isLoading} = useLogin()

        const password = ref('')
        const email = ref('')
        

        const handleClick = async() =>{
           const res = await login(email.value, password.value)
           if(!error.value){
            router.push({name: 'home'})
           }
            
        } 

        return {email, password, error, handleClick, isLoading}
    }
}
</script>