<template>
  <div id="app">
    <div id="nav">
      <b-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
      </b-nav>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>
