<template>
  <figure class="overflow-hidden rounded-lg bg-gray-100 relative">
    <img :src="props.book.cover_url || DefaultCover" :alt="props.title"
      class="pointer-events-none aspect-6/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75" />
    <figcaption class="p-2 absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 text-white">
      <h4 class="truncate my-2 text-xs lg:text-sm">{{ props.book.title }}</h4>
      <div class="flex items-center">
        <button @click="$emit('showDetail')" class="text-xs bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <button v-if="auth.user.role === 'member' && !isBorrowed"
          class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          @click="$emit('borrowBook')">Borrow</button>
        <span v-if="auth && auth.user.role === 'member' && isBorrowed" class="text-xs text-red-600 ml-2">Already
          borrowed!</span>
        <button v-if="auth.user.role === 'librarian'" @click="$emit('editBook')"
          class="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path
              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path
              d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </button>
      </div>
    </figcaption>
  </figure>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useBooksStore } from '@/stores/books'

import DefaultCover from '@/assets/default_cover.png'

const auth = useAuthStore()
const books = useBooksStore()

const props = defineProps({
  book: {
    type: Object,
    required: true,
  }
})

const isBorrowed = books.isBookBorrowed(props.book.id)

defineEmits(['showDetail', 'editBook', 'borrowBook'])
</script>
