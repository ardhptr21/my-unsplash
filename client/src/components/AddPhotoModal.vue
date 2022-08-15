<template>
  <div
    v-show="isOpen"
    class="
      fixed
      flex
      justify-center
      items-center
      inset-0
      w-full
      h-full
      bg-black bg-opacity-30
    "
  >
    <div class="p-10 w-full bg-white rounded-xl max-w-xl">
      <h2 class="text-xl font-semibold mb-8">Add a new photo</h2>
      <div class="flex gap-5 flex-col">
        <label class="w-full flex flex-col gap-3" for="label">
          <span class="text-gray-500 font-medium">Label</span>
          <input
            class="w-full border-2 border-black p-3 px-5 rounded-xl"
            type="text"
            id="label"
            name="label"
            placeholder="Lorem ipsum dolor sit amet."
          />
        </label>
        <label
          v-if="photoType === 'url' || !photoType.length"
          class="w-full flex flex-col gap-3"
          for="url"
        >
          <span class="text-gray-500 font-medium">Photo URL</span>

          <input
            class="w-full border-2 border-black p-3 px-5 rounded-xl"
            type="url"
            id="url"
            name="url"
            @input="handleInput"
            placeholder="https://images.unsplash.com/photo-1657299141984-dd9196274cde"
          />
        </label>
        <p
          v-show="!photoType.length"
          class="text-center text-gray-300 font-bold"
        >
          - OR -
        </p>
        <label
          v-if="photoType === 'file' || !photoType.length"
          class="w-full flex flex-col gap-3"
          for="file"
        >
          <span class="text-gray-500 font-medium">Upload Photo</span>
          <input
            class="w-full border-2 border-black p-3 px-5 rounded-xl"
            type="file"
            id="file"
            @input="handleInput"
            name="file"
          />
        </label>
      </div>
      <div class="mt-8 space-x-5 text-right">
        <button type="button" class="text-gray-500" @click="setIsOpen(false)">
          Cancel
        </button>
        <Button text="Submit" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "AddPhotoModalComponent",
  components: { Button },
  data() {
    return {
      photoType: "",
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    setIsOpen: Function,
  },
  methods: {
    handleInput(e) {
      const name = e.target.name;
      if (e.target.value.length != 0) {
        if (name === "url") {
          return (this.photoType = "url");
        }

        if (name === "file") {
          return (this.photoType = "file");
        }
      }

      return (this.photoType = "");
    },
  },
};
</script>