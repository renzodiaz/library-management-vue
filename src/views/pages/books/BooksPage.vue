<template>
  <div class="border-b border-gray-200 pb-5">
    <h3 class="text-base font-semibold text-gray-900">Book listing</h3>
    <p class="mt-2 max-w-4xl text-sm text-gray-500">List of books that can be borrowed!</p>
  </div>
  <ul
    role="list"
    class="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8"
  >
    <li v-for="book in books.list" :key="book.id" class="relative">
      <BookCover :book="book" />
    </li>
  </ul>
</template>

<script setup>
import { onMounted } from "vue"
import { useBooksStore } from '@/stores/books'
import BookCover from '@/components/BookCover.vue'

const books = useBooksStore()

onMounted(async () => {
  await books.fetchBooks()
  await books.fetchBorrowings()
})
</script>
