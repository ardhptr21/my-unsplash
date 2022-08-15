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
      <div class="mb-8 space-y-3">
        <h2 class="text-xl font-semibold">Are you sure?</h2>
        <p>
          Please copy this
          <mark class="font-bold bg-green-300">{{ deletedId }}</mark>
        </p>
      </div>
      <div class="flex gap-5 flex-col">
        <label class="w-full flex flex-col gap-3" for="confirm">
          <span class="text-gray-500 font-medium">Confirmation</span>
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
            type="text"
            id="confirm"
            name="confirm"
            placeholder="******************"
            v-model="confirm"
          />
        </label>
      </div>
      <div class="mt-8 space-x-5 text-right">
        <button
          type="button"
          v-show="!isLoading"
          class="text-gray-500"
          @click="setIsOpen(false)"
        >
          Cancel
        </button>
        <ButtonDanger
          @click="handleDelete"
          text="Delete"
          :disabled="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDanger from "./ButtonDanger.vue";
import { useToast } from "vue-toastification";

export default {
  name: "DeletePhotoModalComponent",
  setup() {
    const toast = useToast({ postion: "bottom-right" });
    return { toast };
  },
  data() {
    return {
      confirm: "",
      isLoading: false,
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    setIsOpen: Function,
    deletedId: String,
  },
  components: { ButtonDanger },
  methods: {
    handleDelete() {
      if (this.deletedId != this.confirm) {
        this.toast.error("Confirmation does not match");
        return false;
      }
      this.$emit("delete", this.deletedId, (val) => (this.isLoading = val));
    },
  },
};
</script>