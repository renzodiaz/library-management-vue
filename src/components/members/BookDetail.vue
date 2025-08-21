<template>
    <div class="h-0 flex-1 overflow-y-auto">
        <div class="bg-gray-900 px-4 py-6 sm:px-6">
            <div class="flex items-center justify-between">
                <DialogTitle class="text-base font-semibold text-white">
                    Book Details
                </DialogTitle>
                <div class="ml-3 flex h-7 items-center">
                    <button type="button"
                        class="relative rounded-md text-indigo-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        @click="$emit('closeDrawer')">
                        <span class="absolute -inset-2.5" />
                        <span class="sr-only">Close panel</span>
                        <XMarkIcon class="size-6" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div class="mt-1">
                <p class="text-sm text-indigo-300">
                    See book details before borrow, once borrowed in will be in your dashboard
                </p>
            </div>
        </div>
        <div class="flex flex-1 flex-col justify-between">
            <div class="divide-y divide-gray-200 px-4 sm:px-6">
                <!-- Content goes here -->
                <div class="mt-4">
                    <img :src="book.cover_url || DefaultCover" :alt="book.title"
                        class="m-auto pointer-events-none aspect-6/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75" />
                    <h2 class="mt-4"><strong>Title: </strong>{{ book.title }}</h2>
                    <p><strong>ISBN: </strong>{{ book.isbn }}</p>
                    <p><strong>Author: </strong>{{ book.author_name }}</p>
                    <p><strong>Genre: </strong>{{ book.genre }}</p>
                    <p><strong>Total Copies: </strong>{{ book.total_copies }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import DefaultCover from '@/assets/default_cover.png'

const { book } = defineProps(
    {
        book: {
            stype: Object,
            required: true
        }
    }
)

defineEmits(['closeDrawer', 'borrowBook'])
</script>