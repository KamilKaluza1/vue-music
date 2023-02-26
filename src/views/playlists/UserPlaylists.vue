<template>
        <ListView  :playlists='documents'/>
</template>

<script>
import ListView from '@/components/ListView.vue';
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
// import {computed} from 'vue'

export default {
    components:{ListView},
    setup(){
        const {user} = getUser()
        const {documents} = getCollection('playlists',['userId', '==', user.value.uid])

 
        // const myPlaylists = computed(()=>{
        //     return documents.value.filter(document => document.userId == user.value.uid)
        // })
        return{  documents}
    }
}
</script>