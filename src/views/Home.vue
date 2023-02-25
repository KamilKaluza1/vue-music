<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <ListView :playlists="documents"/>

  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import ListView from '@/components/ListView.vue'
export default {
  name: "Home",
  components:{ListView},
  setup() {
    const { documents, error } = getCollection("playlists");

    

    return { documents, error };
  },
};
</script>
