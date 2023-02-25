import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  let documentRef = projectFirestore.collection(collection).doc(id)

  const unsubscribe = documentRef.onSnapshot(
    doc => {
        if(doc.data()){
            document.value={...doc.data(), id:doc.id}
            error.value = null;
        }else{
            error.value = 'the document does not exist'
        }
    },
    (err) => {
      console.log(err.message);
      error.value = 'can not fetch document';
    }
    );

    watchEffect((onInvalidate)=>{
      onInvalidate(()=>{unsubscribe()})
    })

  return {document, error}
};

export default getDocument;
