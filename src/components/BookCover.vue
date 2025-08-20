<template>
  <div
    class="group overflow-hidden rounded-lg bg-gray-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-green-600">
    <img :src="props.book.cover_url || DefaultCover" :alt="props.title"
      class="pointer-events-none aspect-6/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75" />
    <button type="button" class="absolute inset-0 focus:outline-hidden" @click="openDrawer = !openDrawer"
      v-if="!books.isBookBorrowed(book.id)">
      <span class="sr-only">View details</span>
    </button>
    <span class="bg-red-100 text-xs text-red-500 absolute top-0 right-0 left-0 w-full text-center"
      v-if="auth.user.role === 'member' && books.isBookBorrowed(book.id)">Already Borrowed</span>
  </div>
  <h4 class="mt-2 text-sm">{{ props.book.title }}</h4>
  <DashboardDrawer :show-drawer="openDrawer" @close-drawer="openDrawer = false" :title="'Book details'"
    :description="'Here you can see book description and borrow'">

    <BorrowForm v-if="auth.user.role === 'member'" @close-drawer="openDrawer = false"
      @borrow-book="handleBorrow(book.id)" :book="props.book">
      <div class="mt-4">
        <img :src="props.book.cover_url || DefaultCover" :alt="props.title"
          class="m-auto pointer-events-none aspect-6/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75" />
        <h2 class="mt-4"><strong>Title: </strong>{{ props.book.title }}</h2>
        <p><strong>ISBN: </strong>{{ props.book.isbn }}</p>
        <p><strong>Author: </strong>{{ props.book.author_name }}</p>
        <p><strong>Genre: </strong>{{ props.book.genre }}</p>
        <p><strong>Total Copies: </strong>{{ props.book.total_copies }}</p>
      </div>
    </BorrowForm>
  </DashboardDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBooksStore } from '@/stores/books'
import { popAlert } from '@/utils/alerts'
import DefaultCover from '@/assets/default_cover.png'
import DashboardDrawer from '@/components/DashboardDrawer.vue'
import BorrowForm from '@/views/pages/books/BorrowForm.vue'


const openDrawer = ref(false)

const auth = useAuthStore()
const books = useBooksStore()

const props = defineProps({
  book: {
    type: Object,
    required: true,
  }
})

const handleBorrow = async (book_id) => {
  await books.borrowBook({ data: { book_id: book_id } });
  openDrawer.value = false
  popAlert("Book borrowed successfully!", "success")
}
</script>
