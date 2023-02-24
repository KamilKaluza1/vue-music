import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

const error = ref(null)
const isLoading = ref(false)
const logout = async() => {
    isLoading.value = true
    error.value = null
    
    try{
        await projectAuth.signOut()
        error.value = null
        isLoading.value = false

    }catch(err){
        isLoading.value = false
        console.log(err.message)
        console.log('an error occur')
        error.value = err.message
    }
}

const useLogout = () => {
    return {error, logout, isLoading}
}

export default useLogout