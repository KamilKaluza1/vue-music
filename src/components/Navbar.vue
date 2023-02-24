<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.png" alt="basic logo">
            <h1><router-link :to="{name:'home'}">Music playlists</router-link></h1>
            <div class="links">
                <button @click.prevent="handleSubmit">Logout</button>
                <router-link class="btn" :to="{name:'login'}">Log in</router-link>
                <router-link class="btn" :to="{name:'signup'}">Sign up</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default{
    setup(){
        
    }
}
</script>

<style scoped>

.navbar{
    padding: 15px 10px;
    margin-bottom: 60px;
    background: white;
}
nav{
    display: flex;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
}
nav h1{
    margin-left: 20px;
}
nav .links{
    margin-left: auto;
}

nav .links a {
    margin-left: 16px;
    font-size: 14px;
}

nav img{
    max-height: 60px;
}

</style>