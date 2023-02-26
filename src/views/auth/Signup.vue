<template>
    <form @submit.prevent="handleClick">
        <h3>Sign up</h3>
        <input type="text" placeholder="Nickname" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isLoading" >Sign up</button>
        <button v-if="isLoading" disabled>Loading...</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';
export default{
    setup(){
        const router = useRouter()
        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const {error, signup, isLoading} = useSignup()

        const handleClick = async() =>{
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                router.push({name:'home'})
                console.log("user sing up correctly ")
            }
            

        }

        return{error, isLoading, displayName, email, password, handleClick}
    }
}
</script>