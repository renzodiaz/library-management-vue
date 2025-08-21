<template>
  <div class="border-b border-gray-200 pb-5">
    <h3 class="text-base font-semibold text-gray-900">Book listing</h3>
    <p class="mt-2 max-w-4xl text-sm text-gray-500">List of books that can be borrowed!</p>
  </div>
  <ul role="list" class="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 xl:gap-x-8">
    <li v-for="book in books.list" :key="book.id">
      <BookCover :book="book" @show-detail="openDrawerDetails(book)" @edit-book="openDrawerEdit(book)" @borrow-book="handleBorrow(book.id)"/>
    </li>
  </ul>
</template>

<script lang="jsx" setup>
import { onMounted, defineComponent, markRaw } from 'vue'
import { useBooksStore } from '@/stores/books'
import { useDrawerStore } from '@/stores/drawer';
import { popAlert } from '@/utils/alerts'
import BookCover from '@/components/BookCover.vue'
import BookDetail from '@/components/members/BookDetail.vue'
import BookForm from './BookForm.vue';

const books = useBooksStore()
const drawer = useDrawerStore()

onMounted(async () => {
  await books.fetchBooks()
  await books.fetchBorrowings()
})

const openDrawerDetails = (book) => {
  const dynamicComponent = markRaw(defineComponent({
    components: { BookDetail },
    setup() {
      return () => (
        <BookDetail
          book={book}
          onCloseDrawer={() => closeDrawer()}
          onBorrowBook={() => handleBorrow(book.id)}
        />
      );
    },
  }));

  drawer.open(dynamicComponent);
};

const openDrawerEdit = (book) => {
  const dynamicComponent = markRaw(defineComponent({
    components: { BookDetail },
    setup() {
      return () => (
        <BookForm
          book={book}
          onCloseDrawer={() => closeDrawer()}
        />
      );
    },
  }));

  drawer.open(dynamicComponent);
};

const closeDrawer = () => drawer.close();

const handleBorrow = async (book_id) => {
  await books.borrowBook({ data: { book_id: book_id } });
  popAlert("Book borrowed successfully!", "success")
  closeDrawer()
}
</script>
