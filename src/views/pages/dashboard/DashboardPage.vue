<template>
  <MemberStats v-if="auth.user.role === 'member' "/>
  <LibrarianStats v-if="auth.user.role === 'librarian' " />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import MemberStats from '@/views/pages/dashboard/member/MemberStats.vue'
import LibrarianStats from './librarian/LibrarianStats.vue';

const auth = useAuthStore()
</script>
