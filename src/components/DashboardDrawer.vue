<template>
  <div>
    <TransitionRoot as="template" :show="isOpen">
      <Dialog class="relative z-40" @close="closeDrawer">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full" enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="relative flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <component :is="content" />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useDrawerStore } from '@/stores/drawer'

// Pinia store instance
const drawerStore = useDrawerStore();

// Computed properties for better access to store data
const isOpen = computed(() => drawerStore.isOpen);
const content = computed(() => drawerStore.content);

const closeDrawer = () => {
  drawerStore.close();
};
</script>
