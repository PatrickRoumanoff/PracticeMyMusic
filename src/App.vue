<template>
  <div id="app">
    <ul>
      <li><a href="#/login">login</a></li>
      <li><a href="#/home">home</a></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
