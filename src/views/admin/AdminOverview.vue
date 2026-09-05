<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Users, 
  BookOpenCheck, 
  Coffee, 
  DollarSign, 
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-vue-next'

// 1. Staff Information
const staff = ref({
  name: 'Admin User',
  role: 'Operations Lead'
})

// 2. Summary Cards Data (English Terms Explained in UI)
const statCards = ref([
  { 
    id: 1, 
    title: "Today's Revenue", 
    value: "LKR 72,500", 
    change: "+15.2%", 
    icon: DollarSign, 
    color: "text-emerald-700", 
    bg: "bg-emerald-50", 
    border: "border-emerald-200" 
  },
  { 
    id: 2, 
    title: "Active Bookings", 
    value: "18 Spaces", 
    change: "4 Pending", 
    icon: BookOpenCheck, 
    color: "text-sky-700", 
    bg: "bg-sky-50", 
    border: "border-sky-200" 
  },
  { 
    id: 3, 
    title: "Guests In-House", 
    value: "24", 
    change: "80% Capacity", 
    icon: Users, 
    color: "text-stone-700", 
    bg: "bg-stone-50", 
    border: "border-stone-200" 
  },
  { 
    id: 4, 
    title: "Active Orders", 
    value: "9 Orders", 
    change: "3 Preparing", 
    icon: Coffee, 
    color: "text-[#8B5E3C]", 
    bg: "bg-[#EFE8DC]", 
    border: "border-[#D5C6B1]" 
  },
])

// 3. Mock Upcoming Bookings List
const upcomingBookings = ref([
  {
    id: 'BK-101',
    name: 'Anjalie M.',
    space: 'Quiet Zone Booth #04',
    time: '10:00 AM - 01:00 PM',
    status: 'Confirmed'
  },
  {
    id: 'BK-102',
    name: 'Kasun D.',
    space: 'Focus Hot Desk #12',
    time: '11:30 AM - 04:30 PM',
    status: 'Checked-In'
  }
])
</script>

<template>
  <div class="space-y-8">
    
    <!-- HEADER BANNER -->
    <div class="rounded-3xl bg-[#3C2A21] text-[#FDFBF7] p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-[#EADBC8] text-[#3C2A21] flex items-center justify-center shrink-0">
          <Zap class="w-7 h-7 text-[#724B2F]" />
        </div>
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C87D55]/30 text-[#EADECE] text-xs font-medium mb-1 border border-[#C87D55]/40">
            <Sparkles class="w-3 h-3 text-[#C87D55]" />
            <span>Staff Dashboard</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold text-[#FDFBF7]">
            Hello, {{ staff.name }}!
          </h1>
          <p class="text-xs sm:text-sm text-stone-300">Here is what is happening at AURA today.</p>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="flex items-center gap-3 w-full md:w-auto">
        <RouterLink 
          to="/admin/spaces" 
          class="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#C87D55] hover:bg-[#A56948] text-white text-xs font-semibold transition-all text-center shadow-xs"
        >
          Manage Spaces
        </RouterLink>
        <RouterLink 
          to="/admin/orders" 
          class="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FDFBF7] border border-white/20 text-xs font-semibold transition-all text-center"
        >
          View Kitchen Orders
        </RouterLink>
      </div>
    </div>

    <!-- STATS CARDS GRID (4 COLUMNS) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div 
        v-for="stat in statCards" 
        :key="stat.id"
        class="rounded-2xl p-5 border transition-all"
        :class="`${stat.bg} ${stat.border}`"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-medium text-stone-600">{{ stat.title }}</span>
          <component :is="stat.icon" class="w-5 h-5" :class="stat.color" />
        </div>
        <div class="flex items-baseline justify-between">
          <span class="text-2xl font-serif font-bold text-[#2D1E18]">{{ stat.value }}</span>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md border border-inherit" :class="stat.color">
            {{ stat.change }}
          </span>
        </div>
      </div>
    </div>

    <!-- MAIN DASHBOARD CONTENT -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- LEFT: BOOKINGS TABLE (8 Cols) -->
      <div class="lg:col-span-8 p-6 rounded-2xl bg-[#FAF7F2] border border-[#E0D6C3] space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-serif font-bold text-[#2D1E18]">Today's Reserved Workspaces</h2>
          <RouterLink to="/admin/spaces" class="text-xs font-bold text-[#8B5E3C] hover:underline flex items-center gap-1">
            <span>See All</span>
            <ChevronRight class="w-3.5 h-3.5" />
          </RouterLink>
        </div>

        <div class="space-y-3">
          <div 
            v-for="booking in upcomingBookings" 
            :key="booking.id"
            class="p-4 rounded-xl bg-white border border-[#E0D6C3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
          >
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-[#2D1E18]">{{ booking.name }}</span>
                <span class="text-[10px] font-mono text-stone-400">({{ booking.id }})</span>
              </div>
              <p class="text-xs text-stone-600 mt-0.5">{{ booking.space }} • <span class="text-[#8B5E3C] font-medium">{{ booking.time }}</span></p>
            </div>
            <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-center">
              {{ booking.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- RIGHT: RECENT ACTIVITY (4 Cols) -->
      <div class="lg:col-span-4 p-6 rounded-2xl bg-[#FAF7F2] border border-[#E0D6C3] space-y-4">
        <h2 class="text-lg font-serif font-bold text-[#2D1E18]">Recent Activity</h2>
        
        <div class="space-y-3 text-xs text-stone-600">
          <div class="p-3 rounded-xl bg-white border border-[#E0D6C3]">
            <p class="font-semibold text-[#2D1E18]">New Booking Received</p>
            <p class="text-[11px] text-stone-500 mt-0.5">Kasun D. reserved Hot Desk #12</p>
          </div>
          <div class="p-3 rounded-xl bg-white border border-[#E0D6C3]">
            <p class="font-semibold text-[#2D1E18]">Order #204 Delivered</p>
            <p class="text-[11px] text-stone-500 mt-0.5">Iced Latte served to Booth #04</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>