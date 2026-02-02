<template>
  <div v-if="didError" class="inline-block bg-gray-100 text-center align-middle" :class="className" :style="style">
    <div class="flex items-center justify-center w-full h-full">
      <img :src="ERROR_IMG_SRC" alt="Error loading image" />
    </div>
  </div>
  <img v-else :src="src" :alt="alt" :class="className" :style="style" @error="handleError" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    style: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      didError: false,
      ERROR_IMG_SRC: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='
    };
  },
  methods: {
    handleError() {
      this.didError = true;
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
