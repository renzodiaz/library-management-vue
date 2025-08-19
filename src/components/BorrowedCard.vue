<template>
  <div class="flex w-full items-center justify-between space-x-6 p-6">
    <div class="flex-1 truncate">
      <div class="flex items-center space-x-3">
        <h3 class="truncate text-sm font-medium text-gray-900">{{ props.title }}</h3>
        <span
          class="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
          >{{ props.status }}</span
        >
      </div>
      <p class="mt-1 truncate text-sm text-gray-500">Due: {{ props.dueDate }}</p>
    </div>
    <img
      class="size-10 shrink-0 rounded-full bg-gray-300 outline -outline-offset-1 outline-black/5"
      :src="props.imageUrl"
      alt=""
    />
  </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  title: {
    type: String,
  },
  author: {
    type: Object,
    default: {},
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
  },
  dueDate: {
    type: String,
  },
})
</script>
