<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Calendar, Utensils, ShoppingBag, Menu, X, ArrowUpRight, QrCode, ScanLine, Ticket, Camera, User, LogOut } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isLoaded = ref(false)

// Authentication & User Profile States
const isLoggedIn = ref(false)
const userRole = ref('customer')
const isProfileMenuOpen = ref(false)

// QR Modal States
const isQrModalOpen = ref(false)
const activeQrTab = ref('scan') // 'scan' or 'pass'

const checkAuthStatus = () => {
  isLoggedIn.value = localStorage.getItem('is_logged_in') === 'true'
  userRole.value = localStorage.getItem('user_role') || 'customer'
}

const handleLogout = () => {
  localStorage.removeItem('is_logged_in')
  localStorage.removeItem('user_role')
  localStorage.removeItem('user_email')
  isLoggedIn.value = false
  isProfileMenuOpen.value = false
  router.push('/login')
}

watch(() => route.path, () => {
  isMenuOpen.value = false
  isProfileMenuOpen.value = false
  checkAuthStatus()
})

onMounted(() => {
  requestAnimationFrame(() => { isLoaded.value = true })
  checkAuthStatus()
})

const navLinks = [
  { to: '/', label: 'Home', icon: null },
  { to: '/spaces', label: 'Book Space', icon: Calendar },
  { to: '/menu', label: 'Menu', icon: Utensils },
]
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[#FBF4EA]/90 backdrop-blur-lg border-b border-[#EAD9C4] transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-24">

        <!-- ================= LOGO SECTION ================= -->
        <RouterLink
          to="/"
          class="group shrink-0 flex items-center gap-3.5 transition-all duration-500 ease-out py-1"
          :class="isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'"
        >
          <div class="logo-float w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full overflow-visible">
              <path d="M22 18C20 13 25 10 23 5" stroke="#C98A5E" stroke-width="3" stroke-linecap="round" class="steam-line steam-1" />
              <path d="M32 20C30 14 36 10 33 3" stroke="#C98A5E" stroke-width="3" stroke-linecap="round" class="steam-line steam-2" />
              <path d="M42 18C40 13 45 10 43 5" stroke="#C98A5E" stroke-width="3" stroke-linecap="round" class="steam-line steam-3" />
              <path d="M12 25C12 25 15 48 32 48C49 48 52 25 52 25H12Z" fill="#4A3226" stroke="#3A2619" stroke-width="2" stroke-linejoin="round" />
              <ellipse cx="32" cy="25" rx="20" ry="3.5" fill="#FBF4EA" stroke="#C98A5E" stroke-width="2"/>
              <ellipse cx="32" cy="25" rx="14" ry="2" fill="#D9A279"/>
              <path d="M49 28C55 28 59 32 58 37C57 42 50 44 46 43" stroke="#3A2619" stroke-width="3.5" stroke-linecap="round" fill="none" />
              <path d="M16 54C24 57 40 57 48 54" stroke="#C98A5E" stroke-width="3.5" stroke-linecap="round" />
            </svg>
          </div>

          <div class="flex flex-col">
            <span class="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-widest text-[#4A3226] leading-none group-hover:text-[#B9805A] transition-colors">
              AURA
            </span>
            <span class="font-courier text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#B9805A] uppercase mt-1.5 opacity-90">
              Cafe & Co-Working
            </span>
          </div>
        </RouterLink>

        <!-- ================= DESKTOP NAV ================= -->
        <div class="hidden md:flex items-center gap-1.5 bg-[#F3E5D3]/70 p-1.5 rounded-full border border-[#EAD9C4] shadow-xs">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2"
            :class="route.path === link.to ? 'bg-gradient-to-r from-[#D9A279] to-[#C98A5E] text-white shadow-md' : 'text-[#6B5544] hover:text-[#4A3226] hover:bg-[#EAD9C4]/70'"
          >
            <component :is="link.icon" v-if="link.icon" class="w-4 h-4 opacity-90" />
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- ================= RIGHT ACTIONS ================= -->
        <div class="flex items-center gap-2.5 sm:gap-3">

          <!-- QR Code Button -->
          <button
            type="button"
            aria-label="Open QR Menu"
            class="p-3 rounded-full bg-[#F3E5D3] text-[#4A3226] border border-[#EAD9C4] hover:bg-[#EAD9C4] hover:scale-105 active:scale-95 transition-all duration-300 group shadow-xs relative"
            @click="isQrModalOpen = true"
          >
            <QrCode class="w-5 h-5 text-[#4A3226] group-hover:text-[#B9805A] transition-colors" />
          </button>

          <!-- Shopping Cart Icon Button -->
          <button
            type="button"
            aria-label="View cart"
            class="relative p-3 rounded-full bg-[#F3E5D3] text-[#4A3226] border border-[#EAD9C4] hover:bg-[#EAD9C4] hover:scale-105 active:scale-95 transition-all duration-300 group shadow-xs"
          >
            <ShoppingBag class="w-5 h-5 text-[#4A3226] group-hover:text-[#B9805A] transition-colors" />
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-[#C98A5E] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#FBF4EA] shadow-xs">
              0
            </span>
          </button>

          <!-- Book Table CTA -->
          <RouterLink
            to="/spaces"
            class="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D9A279] to-[#C98A5E] hover:from-[#C98A5E] hover:to-[#B9805A] text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group"
          >
            <Calendar class="w-4 h-4 text-white/90" />
            <span>Book Table</span>
            <ArrowUpRight class="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </RouterLink>

          <!-- ================= AUTH / USER PROFILE BUTTON ================= -->
          <div v-if="!isLoggedIn">
            <RouterLink
              to="/login"
              class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3C2A21] hover:bg-[#4A3226] text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              <User class="w-4 h-4" />
              <span>Sign In</span>
            </RouterLink>
          </div>

          <!-- Logged In User Dropdown -->
          <div v-else class="relative">
            <button
              @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="p-3 rounded-full bg-[#3C2A21] text-white border border-[#EAD9C4] hover:scale-105 transition-all duration-300 shadow-xs flex items-center justify-center"
            >
              <User class="w-5 h-5" />
            </button>

            <!-- Profile Dropdown Menu -->
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-3 w-48 rounded-2xl bg-[#FBF4EA] border border-[#EAD9C4] shadow-xl py-2 z-50 text-left"
            >
              <div class="px-4 py-2 border-b border-[#EAD9C4]">
                <p class="text-xs text-[#8A7563]">Logged in as</p>
                <p class="text-sm font-bold text-[#4A3226] capitalize">{{ userRole }}</p>
              </div>

              <RouterLink
                v-if="userRole === 'admin' || userRole === 'staff'"
                to="/admin"
                class="block px-4 py-2.5 text-xs font-semibold text-[#4A3226] hover:bg-[#F3E5D3] transition-colors"
              >
                Admin Dashboard
              </RouterLink>

              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <LogOut class="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>

          <!-- Mobile Toggle -->
          <button
            type="button"
            aria-label="Toggle menu"
            :aria-expanded="isMenuOpen"
            class="md:hidden p-3 rounded-full bg-[#F3E5D3] text-[#4A3226] border border-[#EAD9C4] hover:bg-[#EAD9C4] transition-colors"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Menu v-if="!isMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>

        </div>

      </div>
    </div>

    <!-- ================= MOBILE MENU PANEL ================= -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden border-t border-[#EAD9C4] bg-[#FBF4EA]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1.5">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center gap-2.5"
            :class="route.path === link.to ? 'bg-gradient-to-r from-[#D9A279] to-[#C98A5E] text-white' : 'text-[#6B5544] hover:bg-[#F3E5D3]'"
          >
            <component :is="link.icon" v-if="link.icon" class="w-4 h-4" />
            {{ link.label }}
          </RouterLink>

          <RouterLink
            to="/spaces"
            class="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D9A279] to-[#C98A5E] hover:from-[#C98A5E] hover:to-[#B9805A] text-white font-semibold text-sm transition-all"
          >
            <Calendar class="w-4 h-4" />
            <span>Book Table</span>
          </RouterLink>

          <!-- Mobile Login Button -->
          <RouterLink
            v-if="!isLoggedIn"
            to="/login"
            class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#3C2A21] text-white font-semibold text-sm transition-all"
          >
            <User class="w-4 h-4" />
            <span>Sign In</span>
          </RouterLink>
          <button
            v-else
            @click="handleLogout"
            class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm transition-all"
          >
            <LogOut class="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </Transition>
  </nav>

  <!-- ================= QR MODAL POPUP ================= -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isQrModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="relative w-full max-w-md rounded-3xl bg-[#FBF4EA] border border-[#EAD9C4] shadow-2xl overflow-hidden p-6 text-center">
        
        <!-- Close Button -->
        <button 
          @click="isQrModalOpen = false"
          class="absolute top-4 right-4 p-2 rounded-full bg-[#F3E5D3] hover:bg-[#EAD9C4] text-[#6B5544] transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <h3 class="text-xl font-serif font-bold text-[#4A3226] mb-1">AURA QR Services</h3>
        <p class="text-xs text-[#8A7563] mb-5">Scan table code or show your check-in pass</p>

        <!-- Tabs Switcher -->
        <div class="flex p-1 bg-[#F3E5D3] rounded-2xl border border-[#EAD9C4] mb-6">
          <button
            @click="activeQrTab = 'scan'"
            class="flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            :class="activeQrTab === 'scan' ? 'bg-gradient-to-r from-[#D9A279] to-[#C98A5E] text-white shadow-xs' : 'text-[#6B5544] hover:text-[#4A3226]'"
          >
            <ScanLine class="w-4 h-4" />
            Scan Table QR
          </button>
          <button
            @click="activeQrTab = 'pass'"
            class="flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            :class="activeQrTab === 'pass' ? 'bg-gradient-to-r from-[#D9A279] to-[#C98A5E] text-white shadow-xs' : 'text-[#6B5544] hover:text-[#4A3226]'"
          >
            <Ticket class="w-4 h-4" />
            My Booking Pass
          </button>
        </div>

        <!-- TAB 1: SCANNER VIEW -->
        <div v-if="activeQrTab === 'scan'" class="flex flex-col items-center py-4">
          <div class="relative w-56 h-56 rounded-2xl bg-[#4A3226] border-2 border-dashed border-[#C98A5E] flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner group">
            <Camera class="w-10 h-10 text-[#D9C8B8] mb-2 group-hover:scale-110 transition-transform" />
            <p class="text-xs text-[#D9C8B8] font-medium">Point camera at Table QR</p>
            
            <!-- Animated Scan Line -->
            <div class="absolute inset-x-0 h-0.5 bg-[#C98A5E] shadow-[0_0_12px_#C98A5E] animate-pulse top-1/2"></div>
          </div>
          <p class="text-xs text-[#8A7563] mt-4">Order food & drinks directly to your table number.</p>
        </div>

        <!-- TAB 2: MY BOOKING PASS -->
        <div v-else class="flex flex-col items-center py-2">
          <div class="p-4 rounded-2xl bg-white border border-[#EAD9C4] shadow-md mb-3">
            <!-- Simulated QR Code SVG -->
            <svg class="w-48 h-48" viewBox="0 0 100 100" fill="#4A3226">
              <path d="M0 0h30v30H0zM5 5v20h20V5zm5 5h10v10H10zM70 0h30v30H70zM75 5v20h20V5zm5 5h10v10H80zM0 70h30v30H0zM5 75v20h20V75zm5 5h10v10H10zM40 10h10v20H40zm10 30h20v10H50zm-10 20h30v10H40zm20 20h30v20H60zm-20 0h10v20H40z" />
            </svg>
          </div>
          <span class="text-xs font-mono font-bold text-[#B9805A] tracking-wider uppercase">PASS #AURA-8921-LK</span>
          <p class="text-xs text-[#8A7563] mt-1">Show this at reception for fast check-in.</p>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;800&display=swap');
.font-cinzel { font-family: 'Cinzel Decorative', serif; }
.font-courier { font-family: Courier, monospace; }

@keyframes logo-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.logo-float { animation: logo-float 4s ease-in-out infinite; }

@keyframes steam-rise {
  0% { stroke-dashoffset: 20; opacity: 0.2; transform: translateY(2px) scaleX(0.9); }
  50% { opacity: 1; transform: translateY(-3px) scaleX(1.1); }
  100% { stroke-dashoffset: 0; opacity: 0; transform: translateY(-8px) scaleX(1.2); }
}
.steam-line { stroke-dasharray: 20; animation: steam-rise 2.2s ease-in-out infinite; transform-origin: center bottom; }
.steam-1 { animation-delay: 0s; }
.steam-2 { animation-delay: 0.6s; }
.steam-3 { animation-delay: 1.2s; }

@media (prefers-reduced-motion: reduce) {
  .logo-float, .steam-line {
    animation: none;
  }
}
</style>