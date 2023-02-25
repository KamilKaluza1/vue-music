<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="document" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="document.coverUrl" :alt="document.title" />
      </div>
      <h2>{{ document.title }}</h2>
      <p class="username">Created by {{ document.userName }}</p>
      <p class="description">{{ document.description }}</p>
      <button v-if="ownership">Delete</button>
    </div>
    

    <div class="songs-list">
      <p>song1</p>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import {computed} from 'vue'
export default {
  props: ["id"],
  setup(props) {
    const {user} = getUser()
    const { document, error } = getDocument("playlists", props.id);
    const ownership = computed(()=>{
        return document.value && user.value && document.value.userId === user.value.uid
    })
    return { document, error, ownership };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  /* min-width: 100%;
  min-height: 100%; */
  /* max-width: 100%; */
  max-height: 110%
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
