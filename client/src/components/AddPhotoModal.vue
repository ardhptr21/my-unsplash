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
      z-50
    "
  >
    <div class="p-10 w-full bg-white rounded-xl max-w-xl">
      <h2 class="text-xl font-semibold mb-8">Add a new photo</h2>
      <div class="flex gap-5 flex-col">
        <label class="w-full flex flex-col gap-3" for="label">
          <span class="text-gray-500 font-medium">Label</span>
          <input
            class="
              w-full
              border-2 border-black
              p-3
              px-5
              rounded-xl
              disabled:bg-gray-200
            "
            :disabled="isLoading"
            type="text"
            id="label"
            v-model="label"
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
            :disabled="isLoading"
            class="
              w-full
              border-2 border-black
              p-3
              px-5
              rounded-xl
              disabled:bg-gray-200
            "
            type="url"
            id="url"
            v-model="url"
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
            :disabled="isLoading"
            class="
              w-full
              border-2 border-black
              p-3
              px-5
              rounded-xl
              disabled:bg-gray-200
            "
            type="file"
            id="file"
            @input="handleInput"
            accept="image/*"
            name="file"
          />
        </label>
      </div>
      <div class="mt-8 space-x-5 text-right">
        <button
          v-show="!isLoading"
          type="button"
          class="text-gray-500"
          @click="setIsOpen(false)"
        >
          Cancel
        </button>
        <Button
          :disabled="isLoading"
          :text="isLoading ? 'Loading...' : 'Submit'"
          @click="handleAddPhoto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:8080";

export default {
  name: "AddPhotoModalComponent",
  components: { Button },
  data() {
    return {
      photoType: "",
      label: "",
      url: "",
      file: "",
      isLoading: false,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    setIsOpen: Function,
    setPhotos: Function,
  },
  methods: {
    handleInput(e) {
      const name = e.target.name;
      if (e.target.value.length != 0) {
        if (name === "url") {
          return (this.photoType = "url");
        }

        if (name === "file") {
          this.file = e.target.files[0];
          return (this.photoType = "file");
        }
      }

      return (this.photoType = "");
    },
    async handleAddPhoto() {
      const formData = new FormData();
      formData.append("label", this.label);
      if (this.photoType == "url") {
        formData.append("url", this.url);
      } else if (this.photoType == "file") {
        formData.append("photo", this.file);
      }

      try {
        this.isLoading = true;
        const result = await fetch(`${API_BASE_URL}/photos`, {
          method: "POST",
          body: formData,
        }).then((r) => r.json());
        this.setPhotos(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
        this.setIsOpen(false);
      }
    },
  },
};
</script>