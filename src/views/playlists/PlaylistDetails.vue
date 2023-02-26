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
      <button v-if="ownership" @click.prevent="handleClick">Delete</button>
    </div>
    

    <div class="songs-list">
      <div class="single-song" v-for="song in document.songs" :key="song">
      <div class="details">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist }}</p>
      </div>
      <button v-if="ownership" @click="deleteSong(song.id)">Delete</button>
      
      </div>
      <AddSong v-if="ownership" :document="document"/>
    </div>
  </div>
</template>

<script>
import useDocument from '@/composables/useDocument'
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import {computed} from 'vue'
import router from '@/router';
import useStorage from '@/composables/useStorage';
import AddSong from '@/components/AddSong.vue'
export default {
  components: {AddSong},
  props: ["id"],
  setup(props) {
    const{deleteImage} = useStorage()
    const {user} = getUser()
    const { document, error } = getDocument("playlists", props.id);
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
    const ownership = computed(()=>{
        return document.value && user.value && document.value.userId === user.value.uid
    })
    const handleClick = async() =>{
        try{
            await deleteImage(document.value.filePath)
            await deleteDoc()
            router.push({name:'home'})
        }catch(err){
            console.log(err)
        }
    }
    const deleteSong = async(id) =>{
      try{
        const songs = document.value.songs.filter(song => song.id != id)
        await updateDoc({songs})


      }catch(err){
        console.log(err.message)
      }
    }

    return { document, error, ownership, handleClick, deleteSong };
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

.single-song{
  padding: 10px 0 ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--secondary);
  margin-bottom: 20px;
}

@media screen and (max-width: 800px) {
  .playlist-details {
  display: grid;
  grid-template-columns: 1fr ;
  gap: 0px;
}
}
</style>
