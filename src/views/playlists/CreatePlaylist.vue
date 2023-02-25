<template>
  <form @submit.prevent="handleSubmit">
    <h3>Create playlist</h3>
    <input type="text" required v-model="title" placeholder="Type a title" />
    <textarea
      placeholder="Type description.. "
      required
      v-model="description"
    ></textarea>

    <label>Upload a picture</label>
    <input type="file" @change="handleChange" />
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Sending</button>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="error" v-if="fileError">{{ fileError }}</div>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc} = useCollection("playlists");
    const { user } = getUser();
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false) 
    const router = useRouter()

    const handleSubmit = async () => {
        isPending.value = true 
      await uploadImage(file.value);
      const res = await addDoc({
        title: title.value,
        description: description.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        coverUrl: url.value,
        filePath: filePath.value,
        songs: [],
        createdAt: timestamp(),
      })
      isPending.value = false
      if(!error.value){
        console.log("playlist added")
        isPending.value = false
        router.push({name: "playlistDetails", params: {id: res.id}})
      }
    };
    const types = ["image/png", "image/jpeg"];
    const handleChange = (e) => {
      const selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Select an image file (.png/.jpeg)";
      }
    };

    return { title, isPending, fileError, description, handleSubmit, error, handleChange };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  margin: 0;
}
label {
  font-size: 12px;
  margin-top: 30px;
  display: block;
}
button {
  margin-top: 20px;
}
</style>
