<template>
  <DashboardSidebar />
  <div class="lg:pl-72">
    <div
      class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
        @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="size-6" aria-hidden="true" />
      </button>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="grid flex-1 grid-cols-1" action="#" method="GET">
          <input name="search" aria-label="Search"
            class="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm/6"
            placeholder="Search" />
          <MagnifyingGlassIcon class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
            aria-hidden="true" />
        </form>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <!-- Separator -->
          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

          <!-- Profile dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="relative flex items-center">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Open user menu</span>
              <img class="size-8 rounded-full bg-gray-50 outline -outline-offset-1 outline-black/5"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="" />
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true" v-if="auth.user">
                  {{ `${auth.user.first_name} ${auth.user.last_name}` }}
                </span>
                <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
              </span>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5">
                <MenuItem>
                <a href="#" class="block px-3 py-1 text-sm/6 text-gray-900" @click="logout">
                  Logout
                </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <main class="py-10">
      <div class="px-4 sm:px-6 lg:px-8">
        <router-view></router-view>
      </div>
      <DashboardDrawer />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import { popAlert } from '@/utils/alerts';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import DashboardDrawer from '@/components/DashboardDrawer.vue';

const router = useRouter()
const auth = useAuthStore()

const logout = async () => {
  try {
    await auth.logout()
    popAlert("Logged out successfully!", "success")
    router.push({ name: "Login" })
  } catch (error) {
    if (error.response) {
      // Server responded with 4xx/5xx
      if (error.response.status === 404) {
        popAlert(error.response.data?.error || "Rosource not found!");
      } else if (error.response.status === 401) {
        popAlert(error.response.data?.error || "Invalid credentials.");
      } else {
        popAlert("Server error:", error.response.status);
      }
    } else {
      // Network or config error
      popAlert("Network/other error:", error);
    }
  }
}
</script>
