<script setup>
import { RouterLink } from 'vue-router'
import { Coffee, ArrowRight, Plus } from 'lucide-vue-next'

const menuItems = [
  {
    id: 1,
    name: 'Artisanal Cinnamon Latte',
    category: 'Specialty Coffee',
    price: 'LKR 1,100',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Cold Brew Oat Foam',
    category: 'Iced Coffee',
    price: 'LKR 1,250',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    tag: 'Signature'
  },
  {
    id: 3,
    name: 'Avocado Sourdough Toast',
    category: 'Artisan Bakery',
    price: 'LKR 1,850',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    tag: 'Fresh'
  }
]
</script>

<template>
  <section class="py-20 bg-[#EFE9DF] border-y border-[#E0D6C3]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5DAC9] text-[#724B2F] text-xs font-semibold mb-3 border border-[#D8C9B4]">
          <Coffee class="w-3.5 h-3.5 text-[#8B5E3C]" />
          <span>Crafted for Peak Productivity</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#2D1E18]">
          Fuel Your Workflow
        </h2>
        <p class="text-sm sm:text-base text-stone-600 mt-3">
          Order locally roasted espresso blends, organic teas, and freshly baked pastries straight to your workspace desk.
        </p>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="item in menuItems" 
          :key="item.id"
          class="rounded-3xl bg-[#FAF7F2] border border-[#E0D6C3] overflow-hidden p-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="relative h-48 rounded-2xl overflow-hidden mb-4">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#3C2A21] text-white text-[10px] uppercase tracking-wider font-bold">
                {{ item.tag }}
              </span>
            </div>
            
            <p class="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider mb-1">{{ item.category }}</p>
            <h3 class="text-lg font-serif font-bold text-[#2D1E18] mb-2">{{ item.name }}</h3>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-[#E0D6C3]/60 mt-4">
            <span class="text-lg font-bold text-[#2D1E18]">{{ item.price }}</span>
            <button class="p-2.5 rounded-full bg-[#EFE9DF] hover:bg-[#3C2A21] hover:text-white text-[#2D1E18] border border-[#E0D6C3] transition-colors">
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Link -->
      <div class="text-center mt-12">
        <RouterLink 
          to="/menu"
          class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#3C2A21] hover:bg-[#2A1D17] text-[#FDFBF7] font-semibold text-sm transition-all shadow-md"
        >
          <span>View Complete Menu</span>
          <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>

    </div>
  </section>
</template>