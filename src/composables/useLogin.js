import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

const error = ref(null);
const isLoading = ref(false)

const login = async (email, password) => {
  error.value = null;

  try {
    isLoading.value = true
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isLoading.value = false
    return res
  } catch (err) {
    isLoading.value = false
    console.log(err.message)
    error.value = err.message
  }
};

const useLogin = () => {
  return { login, error, isLoading };
};

export default useLogin;
