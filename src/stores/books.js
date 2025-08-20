import { defineStore } from "pinia";
import { dataFormatter } from "@/utils/jsona";
import { secureAxiosInstance } from "@/api/axios";


export const useBooksStore = defineStore("books", {
    state: () => ({
        list: [],
        borrowings: [],
        book: {},
    }),

    actions: {
        async fetchBooks() {
            const response = await secureAxiosInstance.get("/books");

            const data = dataFormatter.deserialize(response.data);

            this.list = data;
        },
        async fetchBorrowings() {
            const response = await secureAxiosInstance.get("/borrowings");

            const data = dataFormatter.deserialize(response.data);

            this.borrowings = data;
        },
        async borrowBook(params) {
            const response = await secureAxiosInstance.post("/borrowings", params);
            const data = dataFormatter.deserialize(response.data);
            this.borrowings.push(data);
        }
    },

    getters: {
        isBookBorrowed: (state) => {
            return (bookId) => state.borrowings.some(borrowed => borrowed.book_id == bookId);
        }
    },

    persist: true
});