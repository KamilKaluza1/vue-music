import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = projectFirestore.collection(collection).doc(id);
  console.log(docRef);
  const deleteDoc = async () => {
    isPending.value = true;
    try {
      const res = await docRef.delete();
      error.value = null;
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };
  return { error, deleteDoc, isPending };
};
export default useDocument;
