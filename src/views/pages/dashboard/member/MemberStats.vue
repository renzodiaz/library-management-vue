<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="borrowing in books.borrowings"
      :key="borrowing.id"
      class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm"
    >
      <BorrowedCard :borrowing="borrowing"/>
    </li>
  </ul>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBooksStore } from '@/stores/books'
import BorrowedCard from '@/components/BorrowedCard.vue'

const books = useBooksStore()

onMounted(async () => {
  await books.fetchBorrowings()
})
</script>
