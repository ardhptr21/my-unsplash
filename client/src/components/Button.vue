<template>
  <button
    type="button"
    class="
      bg-green-500
      py-3
      px-5
      shadow-lg shadow-green-200
      hover:bg-green-600
      transition
      duration-300
      text-white
      rounded-xl
      disabled:bg-green-800
    "
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    text: String,
  },
};
</script>