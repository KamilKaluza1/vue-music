import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collection) => {
    const error = ref(null)
    const isLoading = ref(false)

    const addDoc = async(doc) => {
        error.value = null
        isLoading.value = true

        try{
            await projectFirestore.collection(collection).add(doc)
            isLoading = false
        }catch(err){
            isLoading.value = false
            console.log(err.message)
            error.value = 'can not send the message '
        }
    }
    return {error, addDoc, isLoading }
}


export default useCollection