<template>
  <div class="w-full rounded-xl overflow-hidden relative group">
    <img :src="photo" alt="this is photo" />
    <div
      class="
        absolute
        inset-0
        bg-black bg-opacity-60
        opacity-0
        group-hover:opacity-100
        duration-300
        flex flex-col
        justify-between
        p-10
      "
    >
      <div class="text-right">
        <button
          type="button"
          class="
            bg-transparent
            px-5
            py-1
            rounded-full
            hover:bg-red-500 hover:text-white
            border-red-500 border-2
            text-red-500
          "
        >
          Delete
        </button>
      </div>
      <h4 class="text-xl text-white">{{ label }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoItem",
  props: {
    photo: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      default: "Not have a label",
    },
  },
};
</script>