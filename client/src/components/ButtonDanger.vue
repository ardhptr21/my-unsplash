<template>
  <button
    type="button"
    class="
      bg-red-500
      py-3
      px-5
      shadow-lg shadow-red-200
      hover:bg-red-600
      transition
      duration-300
      text-white
      rounded-xl
      disabled:bg-red-800
    "
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonDangerComponent",
  props: {
    text: String,
  },
};
</script>