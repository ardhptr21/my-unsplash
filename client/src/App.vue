<template>
  <main class="max-w-6xl container mx-auto pb-16">
    <Navbar :setPhotos="(photo) => (photos = [...photos, photo])" />
    <div class="columns-3 space-y-5">
      <PhotoItem
        v-for="(photo, idx) in photos"
        :photo="photo.url"
        :label="photo.label"
        :photoId="photo._id"
        :alt="photo.label"
        :filtering="
          (photoId) =>
            (photos = photos.filter((photo) => photo._id !== photoId))
        "
        :key="idx"
      />
    </div>
    <Footer />
  </main>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import PhotoItem from "./components/PhotoItem.vue";
import Footer from "./components/Footer.vue";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:8080";

export default {
  name: "App",
  data() {
    return {
      photos: [],
    };
  },
  async mounted() {
    const result = await fetch(`${API_BASE_URL}/photos`).then((r) => r.json());
    this.photos = result.data;
  },
  components: {
    Navbar,
    PhotoItem,
    Footer,
  },
};
</script>