<template>
  <header>
    <img class="logo" src="./assets/logo.svg" alt="Optimum" height="48">
    <section class="user card">

    </section>
  </header>
  <nav>

  </nav>
  <main class="main">
    <router-view />
  </main>
  <div id="stars" />
  <div id="stars2" />
  <div id="stars3" />
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import 'styles/main';
header {
  margin: 16px 16px 8px;
  width: calc(100% - 32px);
  height: 48px;
  display: flex;
  justify-content: space-between;

  .logo {

  }
}

main {
  min-width: min(1024px, calc(100% - 32px));
  min-height: 256px;
  max-height: 100%;
  padding: 16px 0;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.view {
  height: 2000px;
}
</style>
