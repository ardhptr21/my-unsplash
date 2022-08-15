<template>
  <div class="max-w-max rounded-xl overflow-hidden relative group">
    <img :src="photo" alt="this is photo" />
    <DeletePhotoModal
      :isOpen="isModalOpen"
      :setIsOpen="(val) => (isModalOpen = val)"
      :deletedId="photoId"
      @delete="handleDelete"
    />
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
          @click="isModalOpen = true"
        >
          Delete
        </button>
      </div>
      <h4 class="text-xl text-white">{{ label }}</h4>
    </div>
  </div>
</template>

<script>
import DeletePhotoModal from "./DeletePhotoModal.vue";
import { useToast } from "vue-toastification";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:8080";

export default {
  name: "PhotoItem",
  setup() {
    const toast = useToast({ position: "bottom-right" });
    return { toast };
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  props: {
    photo: {
      type: String,
      require: true,
    },
    label: {
      type: String,
      default: "Not have a label",
    },
    photoId: {
      type: String,
      require: true,
    },
    filtering: Function,
  },
  components: { DeletePhotoModal },
  methods: {
    async handleDelete(id, setIsLoading) {
      try {
        setIsLoading(true);
        const result = await fetch(`${API_BASE_URL}/photos/d/${id}`, {
          method: "DELETE",
        }).then((r) => r.json());
        this.filtering(result.photo_id);
        this.toast.success(result.message);
      } catch (err) {
        console.log(err);
        this.toast.error("Something when wrong when deleting photo");
      } finally {
        setIsLoading(false);
        this.isModalOpen = false;
      }
    },
  },
};
</script>