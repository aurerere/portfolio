<template>
    <div>
        <h1>404</h1>
        <p>not found</p>
        <h3>My Portfolio</h3>
        <router-link to="/">&#62; formal version</router-link>
        <router-link to="/cli">&#62; CLI version</router-link>
    </div>
</template>

<script>
export default {
    name: "NotFoundView"
}
</script>

<style scoped>
div {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    font-family: monospace;
    color: white;
    padding: 20px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 100px;
    margin: 0;
    color: lime;
}

p {
    margin-bottom: 40px;
}

a {
    color: cyan;
    padding: 12px;
    text-decoration: none;
}

a:hover {
    background: cyan;
    color: black;
    border-radius: 6px;
}
</style>