<template>
    <div class="relative flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
        <div class="h-0 flex-1 overflow-y-auto">
            <div class="bg-gray-900 px-4 py-6 sm:px-6">
                <div class="flex items-center justify-between">
                    <DialogTitle class="text-base font-semibold text-white">
                        Update book
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
            </div>
            <div class="flex flex-1 flex-col justify-between">
                <div class="divide-y divide-gray-200 px-4 sm:px-6">
                    form goes here {{ book.title }}
                </div>
            </div>
        </div>
        <div class="flex shrink-0 justify-end px-4 py-4">
            <button type="button"
                class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
                @click="$emit('closeDrawer')">
                Cancel
            </button>
            <button type="button" @click="$emit('saveBook')"
                class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Update
            </button>
        </div>
    </div>
</template>
<script setup>
import { DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const { book } = defineProps({
    book: {
        type: Object,
        required: true
    }
})

defineEmits(['closeDrawer', 'saveBook']);
</script>