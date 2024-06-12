<template>
  <nav class="nav-block">
    <div class="nav-block__wrapper">
      <router-link to="/">
        home
      </router-link>
      <router-link to="/about">
        about
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.nav-block {
  position: relative;
  width: 100%;
  background-color: var(--back-dark);
}

.nav-block__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 24px;
  background-color: var(--back-light);
}
</style>
