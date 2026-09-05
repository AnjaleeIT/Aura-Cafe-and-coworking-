<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue' 
const route = useRoute()


const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
</script>

<template>
  <div>
   
    <Navbar v-if="!isAdminRoute" />

    <!-- Page Content -->
    <RouterView />
  </div>
</template>