<template>
  <div
    class="group overflow-hidden rounded-lg bg-gray-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600"
  >
    <img
      :src="props.image"
      alt=""
      class="pointer-events-none aspect-10/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75"
    />
    <button type="button" class="absolute inset-0 focus:outline-hidden">
      <span class="sr-only">View details</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
})
</script>
