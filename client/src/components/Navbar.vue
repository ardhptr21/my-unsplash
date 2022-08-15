<template>
  <nav class="py-10 flex justify-between items-center">
    <div class="flex items-center gap-8">
      <img :src="my_unsplash_logo" alt="unsplash logo" class="scale-110" />
      <div
        class="
          flex
          justify-center
          items-center
          border-2
          px-4
          py-3
          rounded-xl
          gap-5
          border-gray-300
        "
      >
        <div class="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search by name"
          class="
            placeholder:text-gray-300
            h-full
            w-full
            outline-none
            text-gray-500
          "
        />
      </div>
    </div>
    <Button
      ref="modalConnector"
      text="Add a photo"
      @click="isModalOpen = true"
    />
    <AddPhotoModal
      :isOpen="isModalOpen"
      :setPhotos="setPhotos"
      :setIsOpen="(val) => (isModalOpen = val)"
    />
  </nav>
</template>

<script>
import my_unsplash_logo from "../assets/my_unsplash_logo.svg";
import Button from "@/components/Button.vue";
import AddPhotoModal from "./AddPhotoModal.vue";

export default {
  name: "NavbarComponent",
  props: {
    setPhotos: Function,
  },
  components: {
    Button,
    AddPhotoModal,
  },
  data() {
    return {
      my_unsplash_logo,
      isModalOpen: false,
    };
  },
};
</script>