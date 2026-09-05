<script setup>
import { RouterLink } from 'vue-router'
import { Wifi, ArrowRight, ShieldCheck, Sparkles } from 'lucide-vue-next'

const spaces = [
  {
    id: 1,
    title: 'Focus Hot Desk',
    category: 'Individual',
    price: 'LKR 1,500',
    period: '/ day',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
    features: ['1 Gbps Fiber Wi-Fi', 'Ergonomic Desk & Chair', 'Unlimited Filter Coffee']
  },
  {
    id: 2,
    title: 'Private Soundproof Pod',
    category: 'Calls & Focus',
    price: 'LKR 2,800',
    period: '/ 3 hours',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Acoustic Insulation', 'Dual Monitors', 'Smart Mood Lighting']
  },
  {
    id: 3,
    title: 'Dedicated Silent Booth',
    category: 'Quiet Zone',
    price: 'LKR 4,500',
    period: '/ day',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    features: ['Zero Noise Distraction', 'Personal Power Hub', 'Priority Cafe Service']
  }
]
</script>

<template>
  <section class="py-20 bg-[#FAF7F2] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DF] text-[#724B2F] text-xs font-semibold mb-3 border border-[#E0D6C3]">
            <Sparkles class="w-3.5 h-3.5 text-[#C87D55]" />
            <span>Tailored Work Environments</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#2D1E18]">
            Designed for Deep Focus & Individual Work
          </h2>
        </div>
        
        <RouterLink 
          to="/spaces" 
          class="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] hover:text-[#3C2A21] transition-colors group"
        >
          <span>Explore All Spaces</span>
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </RouterLink>
      </div>

      <!-- Spaces Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="space in spaces" 
          :key="space.id"
          class="group rounded-3xl bg-[#F5EFE6] border border-[#E5DDCF] overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
        >
          <div>
            <!-- Image Frame -->
            <div class="relative h-60 overflow-hidden">
              <img 
                :src="space.image" 
                :alt="space.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-xs font-semibold text-[#3C2A21] border border-[#E0D6C3]">
                {{ space.category }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="flex items-baseline justify-between mb-2">
                <h3 class="text-xl font-serif font-bold text-[#2D1E18]">{{ space.title }}</h3>
              </div>

              <!-- Price -->
              <div class="flex items-baseline gap-1 mb-4">
                <span class="text-2xl font-bold text-[#8B5E3C]">{{ space.price }}</span>
                <span class="text-xs text-stone-500 font-medium">{{ space.period }}</span>
              </div>

              <!-- Features List -->
              <ul class="space-y-2 mb-6 border-t border-[#E0D6C3]/60 pt-4">
                <li v-for="(feat, idx) in space.features" :key="idx" class="flex items-center gap-2 text-xs text-stone-600">
                  <ShieldCheck class="w-4 h-4 text-[#C87D55] shrink-0" />
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Action Button -->
          <div class="px-6 pb-6 pt-0">
            <RouterLink 
              to="/spaces" 
              class="w-full py-3 rounded-2xl bg-[#3C2A21] hover:bg-[#2A1D17] text-[#FDFBF7] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
            >
              <span>Reserve Space</span>
            </RouterLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>