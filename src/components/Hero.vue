<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../supabase'
import { Coffee, Wifi, Zap, ShieldCheck, MapPin, Clock, Phone, Plus, ArrowRight, Sparkles } from 'lucide-vue-next'

import heroWorkspaceImg from '../assets/hero.png'

const popularItems = ref([])
const recommendedItems = ref([])
const isLoading = ref(true)
//supabase menu data fetch

const fetchFeaturedMenu = async () => {
  isLoading.value = true
  const { data, error } = await supabase.from('menu_items').select('*').limit(6)
  
  if (!error && data && data.length > 0) {
    popularItems.value = data.slice(0, 3)
    recommendedItems.value = data.slice(3, 6)
  } else {
    // Fallback Data
    popularItems.value = [
      { id: 1, name: 'Latte', price: 850, description: 'Gentle & Exquisite', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=300' },
      { id: 2, name: 'Matcha Latte', price: 980, description: 'Green tea perfection', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=300' },
      { id: 3, name: 'Ice Filter', price: 750, description: 'Refreshing and light signature brew', image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=300' }
    ]
    recommendedItems.value = [
      { id: 4, name: 'Almond Croissant', price: 650, description: 'Crispy outside, tender inside', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300' },
      { id: 5, name: 'Berry Cheesecake', price: 890, description: 'Gentle dessert with fresh berries', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300' },
      { id: 6, name: 'Chocolate Cookie', price: 450, description: 'Warm, soft & rich in chocolate', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300' }
    ]
  }
  isLoading.value = false
}

onMounted(() => {
  fetchFeaturedMenu()
})
</script>

<template>
  <div class="bg-[#798A7D] min-h-screen p-3 sm:p-6 font-sans antialiased text-[#2C352E]">
    
    <!-- MAIN CONTAINER WITH ROUNDED SAGE CARD -->
    <div class="max-w-7xl mx-auto bg-[#EFECE6] rounded-[36px] overflow-hidden shadow-2xl border border-white/20">
      
      <!-- HERO SECTION -->
      <section class="p-6 sm:p-12 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- LEFT CONTENT -->
          <div class="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-4">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2DDD5] text-[#2C352E] text-xs font-semibold mb-6 border border-[#D5CFB6]/40">
              <Sparkles class="w-3.5 h-3.5 text-[#D96B43]" />
              <span>AURA Specialty Coffee & Space</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E2520] leading-[1.12] tracking-tight mb-6">
              Coffee You Fall In <br />
              <span class="text-[#D96B43] italic font-normal">Love With</span> From The <br />
              First Sip
            </h1>

            <p class="text-base text-[#5A655D] mb-8 leading-relaxed max-w-lg font-medium">
              Specialty coffee, fresh pastries, and a quiet coworking atmosphere in the very heart of the city.
            </p>

            <div class="flex flex-wrap items-center gap-4 mb-8">
              <RouterLink 
                to="/menu" 
                class="px-7 py-3.5 rounded-full bg-[#D96B43] hover:bg-[#C25932] text-white font-bold text-sm shadow-lg shadow-[#D96B43]/30 transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <span>Explore Menu</span>
                <ArrowRight class="w-4 h-4" />
              </RouterLink>

              <RouterLink 
                to="/spaces" 
                class="px-7 py-3.5 rounded-full bg-transparent border-2 border-[#2C352E] text-[#2C352E] hover:bg-[#2C352E] hover:text-white font-bold text-sm transition-all duration-200 active:scale-95"
              >
                Book Space
              </RouterLink>
            </div>

            <!-- Mini Feature Badges -->
            <div class="flex flex-wrap items-center gap-6 pt-4 border-t border-[#D5CFB6]/50 w-full max-w-md">
              <div class="flex items-center gap-2 text-xs font-bold text-[#3E4941]">
                <div class="w-7 h-7 rounded-full bg-[#E2DDD5] flex items-center justify-center">
                  <Coffee class="w-4 h-4 text-[#D96B43]" />
                </div>
                <span>Specialty Coffee</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-bold text-[#3E4941]">
                <div class="w-7 h-7 rounded-full bg-[#E2DDD5] flex items-center justify-center">
                  <Wifi class="w-4 h-4 text-[#D96B43]" />
                </div>
                <span>Fast Wi-Fi</span>
              </div>
            </div>

          </div>

          <!-- RIGHT IMAGE FRAME (ARCH DESIGN) -->
          <div class="lg:col-span-5 relative flex justify-center">
            <div class="w-full max-w-[380px] h-[460px] rounded-t-[190px] rounded-b-[40px] overflow-hidden relative border-[6px] border-[#E2DDD5] shadow-xl group">
              <img 
                :src="heroWorkspaceImg" 
                alt="AURA Coffee & Space" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div class="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-extrabold text-[#2C352E] shadow-md border border-white/40">
                100% Arabica
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- FEATURES STRIP -->
      <section class="bg-[#E4DFD5] p-6 mx-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center text-[#3E4941] shrink-0">
            <Coffee class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-sm font-extrabold text-[#1E2520]">Selected Beans</h4>
            <p class="text-xs text-[#68746B]">From proven plantations</p>
          </div>
        </div>

        <div class="flex items-center gap-3 md:border-l border-[#D5CFB6] md:pl-6">
          <div class="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center text-[#3E4941] shrink-0">
            <Zap class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-sm font-extrabold text-[#1E2520]">Fresh Roast</h4>
            <p class="text-xs text-[#68746B]">Roasting every week</p>
          </div>
        </div>

        <div class="flex items-center gap-3 md:border-l border-[#D5CFB6] md:pl-6">
          <div class="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center text-[#3E4941] shrink-0">
            <ShieldCheck class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-sm font-extrabold text-[#1E2520]">Expert Baristas</h4>
            <p class="text-xs text-[#68746B]">Crafted with passion</p>
          </div>
        </div>
      </section>

      <!-- POPULAR DRINKS SECTION (SAGE PANEL) -->
      <section class="bg-[#8C9C90] mx-6 my-8 p-8 sm:p-10 rounded-[28px] text-white shadow-inner">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Popular Drinks</h2>
            <p class="text-xs sm:text-sm text-[#E0E7E1] mt-1">Classic and signature coffee for every taste.</p>
          </div>
          <RouterLink 
            to="/menu" 
            class="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition backdrop-blur-sm border border-white/20"
          >
            View All Menu
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in popularItems" 
            :key="item.id" 
            class="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center border border-white/15 hover:bg-white/20 transition-all duration-300 flex flex-col items-center"
          >
            <div class="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-white/30 shadow-md">
              <img :src="item.image || item.image_url" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-lg font-bold mb-1">{{ item.name }}</h3>
            <p class="text-xs text-[#D5E0D7] mb-4 line-clamp-1 font-medium">{{ item.description || item.category }}</p>
            <span class="text-base font-extrabold bg-white/20 px-4 py-1.5 rounded-full">LKR {{ item.price }}</span>
          </div>
        </div>
      </section>

      <!-- RECOMMENDED TO TRY (FOOD & PASTRIES) -->
      <section class="p-6 sm:p-10">
        <h2 class="text-2xl font-extrabold text-center mb-8 text-[#1E2520]">Recommended To Try</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div 
            v-for="item in recommendedItems" 
            :key="item.id" 
            class="bg-white rounded-2xl p-4 flex gap-4 items-center border border-[#E2DDD5] shadow-xs hover:shadow-md transition-all duration-200"
          >
            <img :src="item.image || item.image_url" :alt="item.name" class="w-20 h-20 rounded-xl object-cover shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-bold text-[#1E2520] truncate mb-0.5">{{ item.name }}</h3>
              <p class="text-xs text-[#7A857C] line-clamp-2 mb-3 leading-snug">{{ item.description || item.category }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm font-extrabold text-[#D96B43]">LKR {{ item.price }}</span>
                <button class="bg-[#3E4941] hover:bg-[#2C352E] text-white w-7 h-7 rounded-full flex items-center justify-center transition active:scale-90">
                  <Plus class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LOCATION & FOOTER SECTION -->
      <footer class="bg-[#E2DDD5] p-8 sm:p-10 rounded-t-[28px] mt-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="text-lg font-extrabold text-[#1E2520] mb-3">We're Waiting For You!</h3>
            <div class="flex flex-col gap-2 text-xs text-[#5A655D]">
              <p class="flex items-center gap-2 font-medium">
                <MapPin class="w-4 h-4 text-[#D96B43]" /> colombo 05, Sri Lanka
              </p>
              <p class="flex items-center gap-2 font-medium">
                <Clock class="w-4 h-4 text-[#D96B43]" /> Daily: 08:00 - 21:00
              </p>
              <p class="flex items-center gap-2 font-medium">
                <Phone class="w-4 h-4 text-[#D96B43]" /> +94 76 2697731
              </p>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold text-[#1E2520] mb-2">Stay Updated</h4>
            <div class="flex gap-2">
              <input 
                type="email" 
                placeholder="Your e-mail" 
                class="px-4 py-2.5 rounded-full bg-white border border-[#CCC] text-xs flex-1 outline-none focus:border-[#D96B43]" 
              />
              <button class="bg-[#D96B43] hover:bg-[#C25932] text-white px-5 py-2.5 rounded-full font-bold text-xs transition active:scale-95 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  </div>
</template>