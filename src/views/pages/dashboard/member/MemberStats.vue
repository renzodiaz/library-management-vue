<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="borrowing in borrowings"
      :key="borrowing.title"
      class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm"
    >
      <BorrowedCard
        :title="borrowing.title"
        :status="borrowing.status"
        :due-date="borrowing.due_date"
        :author="borrowing.author"
        :image-url="borrowing.image_url"
      />
    </li>
  </ul>
</template>

<script setup>
import BorrowedCard from '@/components/BorrowedCard.vue'

const borrowings = [
  {
    title: 'Rails tutorial',
    status: 'overdue',
    due_date: 'Agost 24, 2025',
    author: {
      name: 'Renzo Diaz',
    },
    image_url: 'https://dummyjson.com/image/150',
  },
  {
    title: 'Rails tutorial',
    status: 'borrowed',
    due_date: 'Agost 24, 2025',
    author: {
      name: 'Renzo Diaz',
    },
    image_url: 'https://dummyjson.com/image/150',
  },
  {
    title: 'Rails tutorial',
    status: 'borrowed',
    due_date: 'Agost 24, 2025',
    author: {
      name: 'Renzo Diaz',
    },
    image_url: 'https://dummyjson.com/image/150',
  },
  {
    title: 'Rails tutorial',
    status: 'borrowed',
    due_date: 'Agost 24, 2025',
    author: {
      name: 'Renzo Diaz',
    },
    image_url: 'https://dummyjson.com/image/150',
  },
  {
    title: 'Rails tutorial',
    status: 'overdue',
    due_date: 'Agost 24, 2025',
    author: {
      name: 'Renzo Diaz',
    },
    image_url: 'https://dummyjson.com/image/150',
  },
]
</script>
