<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to=""
        leave="transition-opacity ease-linear duration-300"
        leave-from=""
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to=""
              leave="ease-in-out duration-300"
              leave-from=""
              leave-to="opacity-0"
            >
              <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>

            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div
              class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 dark:bg-gray-900 dark:ring dark:ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10"
            >
              <div class="relative flex h-16 shrink-0 items-center">
                <h1 class="text-white uppercase" v-if="auth && auth.user">{{ auth.user.role }}</h1>
              </div>
              <nav class="relative flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <RouterLink
                          :to="item.href"
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          :class="[
                            $route.path === item.href
                              ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                          ]"
                        >
                          <component
                            :is="item.icon"
                            :class="[
                              $route.path === item.href
                                ? 'text-indigo-600 dark:text-white'
                                : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white',
                              'size-6 shrink-0',
                            ]"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </RouterLink>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a
                      href="#"
                      class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      <Cog6ToothIcon
                        class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden bg-gray-900 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 dark:border-white/10 dark:bg-black/10"
    >
      <div class="flex h-16 shrink-0 items-center">
        <h1 class="text-white uppercase" v-if="auth && auth.user">{{ auth.user.role }}</h1>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <RouterLink
                  :to="item.href"
                  class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  :class="[
                    $route.path === item.href
                      ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      $route.path === item.href
                        ? 'text-indigo-600 dark:text-white'
                        : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white',
                      'size-6 shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="mt-auto">
            <a
              href="#"
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <Cog6ToothIcon
                class="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white"
                aria-hidden="true"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Cog6ToothIcon, HomeIcon, XMarkIcon, BookOpenIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Books', href: '/books', icon: BookOpenIcon, current: false },
]

const auth = useAuthStore()
const sidebarOpen = ref(false)
</script>
