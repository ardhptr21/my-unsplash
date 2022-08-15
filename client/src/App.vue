<template>
  <div class="max-w-6xl container mx-auto">
    <Navbar />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>