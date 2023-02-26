<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" alt="basic logo" />
      <h1><router-link :to="{ name: 'home' }">Music playlists</router-link></h1>
      <div class="links">
        <button v-if="user" @click.prevent="handleClick">Logout</button>
        <router-link v-if="user" class="btn" :to="{name:'createPlaylist'}">Create Playlist</router-link>
        <router-link  v-if="user" class="btn" :to="{name:'userPlaylists'}">My playlists</router-link>
        <router-link v-if="!user" class="btn" :to="{ name: 'login' }"
          >Log in</router-link
        >
        <router-link v-if="!user" class="btn" :to="{ name: 'signup' }"
          >Sign up</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
export default {
  setup() {
    const router = useRouter();
    const { user } = getUser();

    const { error, logout, isLoading } = useLogout();
    const handleClick = async () => {
      const res = await logout();
      if (!error.value) {
        console.log("user logout");
        router.push({ name: "login" });
      }
    };
    return { handleClick, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 15px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}

nav .links a {
  margin-left: 16px;
  font-size: 14px;
  text-align: center;
}

nav img {
  max-height: 60px;
}
@media screen and (max-width: 800px) {
  nav .links {
  display: grid;
  grid-template-columns: 1fr;
}
nav .links a {
  margin-left: 0px;
  font-size: 12px;
  margin-top: 5px;
}
.navbar {
  padding: 0 10px;
}
}
button{
  margin-top: 5px;
}
</style>
