<script setup>
import Header from './components/Header.vue'

</script>

<template>
  <Header />
  <div style="cursor: pointer" @click="loadVideo">RELOAD VIDEO</div>
  <router-view></router-view>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#header {
  background-color: #ff0000;
  color: white;
  padding: 20px;
}

#header h1 {
  margin: 0;
}

.video {
  float: left;
  width: 320px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.video-player-transition {
  opacity: 1;
  transition: 'all 5s'
}
</style>