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

  const updateDoc = async (file) => {
    isPending.value = true;
    try {
      const res = await docRef.update(file);
      error.value = null;
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
      console.log("cant update", err.message)
    }
  };
  return { error, deleteDoc, updateDoc, isPending };
};
export default useDocument;
