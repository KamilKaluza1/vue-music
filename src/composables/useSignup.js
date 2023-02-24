import { projectAuth } from "@/firebase/config";
import { ref } from "vue";

const error = ref(null);
const isLoading = ref(false)

const signup = async (email, password, displayName) => {
  isLoading.value = true
  error.value = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("no response");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;
    isLoading.value = false
    return res;
  } catch (err) {
    isLoading.value = false
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup, isLoading };
};

export default useSignup;
