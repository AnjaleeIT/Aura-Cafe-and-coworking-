<script setup>
import { ref } from 'vue'
import { Calendar, Coffee, Sparkles, User, Settings } from 'lucide-vue-next'

// Mock Data
const user = ref({
  name: 'Alex Perera',
  membership: 'Pro Workstation Member',
  points: 1250
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF6F0] py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- HEADER BANNER -->
      <div class="rounded-3xl bg-gradient-to-r from-[#3C2A21] via-[#4A352A] to-[#2D1E18] text-[#FDFBF7] p-8 shadow-xl flex items-center justify-between gap-6 relative overflow-hidden">
        
        <!-- Ambient Decor Blob (Subtle) -->
        <div class="absolute -right-16 -bottom-16 w-80 h-80 bg-[#C87D55]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex items-center gap-6 relative z-10">
          <div class="w-20 h-20 rounded-2xl bg-[#EADBC8] text-[#3C2A21] flex items-center justify-center border-4 border-[#C87D55]/60 shadow-lg">
            <User class="w-10 h-10" />
          </div>
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C87D55]/30 text-[#EADECE] text-xs font-semibold mb-2 border border-[#C87D55]/40">
              <Sparkles class="w-3.5 h-3.5 text-[#C87D55]" />
              <span>AURA Member | ID: AM21-LK</span>
            </div>
            <h1 class="text-3xl font-serif font-bold text-[#FDFBF7]">
              Welcome, {{ user.name }}!
            </h1>
            <p class="text-sm text-stone-300">Explore your spaces, orders, and membership perks.</p>
          </div>
        </div>

        <!-- Setting Button -->
        <button class="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-[#FDFBF7] border border-white/10 transition-colors relative z-10">
          <Settings class="w-5 h-5" />
        </button>
      </div>

      <!-- MEMBER PORTAL - SECTION TITLE -->
      <div class="flex items-center justify-between pb-4 border-b border-[#E0D6C3]">
        <h2 class="text-2xl font-serif font-bold text-[#2D1E18] flex items-center gap-3">
          <Calendar class="w-6 h-6 text-[#8B5E3C]" />
          <span>My Member Portal</span>
        </h2>
        <div class="text-right">
          <p class="text-xs text-stone-500">Membership Points</p>
          <p class="text-xl font-bold text-[#8B5E3C]">{{ user.points }} pts</p>
        </div>
      </div>

      <!-- Remaining Content (Bookings, Orders) - Use same as previous DashboardView -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- ...Insert previous ActiveBookings and RecentOrders grid content here... -->
      </div>

    </div>
  </div>
</template>