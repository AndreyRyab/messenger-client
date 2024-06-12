<template>
  <footer class="footer-block">
    <div class="footer-block__wrapper">
      <p class="footer-block__text">Andrey Ryabtsev. {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-block {
  background-color: var(--back-dark);
}

.footer-block__wrapper {
  border-radius: var(--border-radius);
  padding: 24px;
  background-color: var(--back-light);
}

.footer-block__text {
  margin-right: 0;
  text-align: right;
}
</style>
