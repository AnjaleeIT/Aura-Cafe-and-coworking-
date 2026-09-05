<script setup>
import { ref } from 'vue'
import { Calendar, Clock, Users, Coffee, Wifi, Monitor, CheckCircle2, ChevronRight } from 'lucide-vue-next'
import { supabase } from '../supabase'

// Space categories
const spaces = ref([
  {
    id: 1,
    name: 'Quiet Desk Zone',
    category: 'Individual',
    pricePerHour: 500,
    capacity: '1 Person',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['High-speed Wi-Fi', 'Power Outlet', 'Complimentary Coffee']
  },
  {
    id: 2,
    name: 'Creative Meeting Room',
    category: 'Group',
    pricePerHour: 2500,
    capacity: 'Up to 6 Persons',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    features: ['4K Smart TV', 'Whiteboard', 'Air Conditioned', 'Coffee Service']
  },
  {
    id: 3,
    name: 'Private Studio Cabin',
    category: 'Private',
    pricePerHour: 1500,
    capacity: '1-2 Persons',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
    features: ['Soundproof', 'Ergonomic Chair', 'Private Monitor', 'Unlimited Tea']
  }
])

// Form state
const selectedSpace = ref(spaces.value[0])
const bookingDate = ref('')
const startTime = ref('09:00')
const duration = ref(2)
const guestCount = ref(1)

const isSubmitting = ref(false)
const bookingSuccess = ref(false)
const errorMessage = ref('')

const selectSpace = (space) => {
  selectedSpace.value = space
}

const handleBooking = async () => {
  errorMessage.value = ''
  
  if (!bookingDate.value) {
    errorMessage.value = 'Please select a date for your booking.'
    return
  }

  isSubmitting.value = true

  try {
    const userEmail = localStorage.getItem('user_email') || 'Guest'
    const totalAmount = selectedSpace.value.pricePerHour * duration.value

    // Database එකට insert කිරීම (bookings table එකක් ඇත්නම්)
    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          space_name: selectedSpace.value.name,
          booking_date: bookingDate.value,
          start_time: startTime.value,
          duration_hours: duration.value,
          total_price: totalAmount,
          user_email: userEmail,
          status: 'confirmed'
        }
      ])

    // Table එක නැතත් UI success එක පෙන්වයි
    if (error) console.warn('Database sync skipped:', error.message)

    bookingSuccess.value = true
  } catch (err) {
    errorMessage.value = 'Booking failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FBF4EA] py-10 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-6xl mx-auto">
      
      <!-- Page Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#4A3226] font-serif mb-2">Book Your Workspace</h1>
        <p class="text-[#8A7563] text-sm sm:text-base">Reserve your spot at AURA Cafe & Co-working space in seconds.</p>
      </div>

      <!-- Success Alert -->
      <div v-if="bookingSuccess" class="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center max-w-lg mx-auto mb-10 shadow-sm">
        <CheckCircle2 class="w-12 h-12 text-emerald-600 mx-auto mb-3" />
        <h3 class="text-xl font-bold text-emerald-900 mb-1">Booking Confirmed!</h3>
        <p class="text-xs text-emerald-700 mb-4">We look forward to hosting you at {{ selectedSpace.name }}.</p>
        <button 
          @click="bookingSuccess = false" 
          class="px-5 py-2 bg-[#4A3226] text-white rounded-xl text-xs font-bold hover:bg-[#3A2619] transition"
        >
          Book Another Space
        </button>
      </div>

      <!-- Main Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left: Space Selection (2 Columns) -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <h2 class="text-lg font-bold text-[#4A3226]">1. Select Space</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="space in spaces" 
              :key="space.id"
              @click="selectSpace(space)"
              class="bg-white rounded-2xl overflow-hidden border transition-all cursor-pointer hover:shadow-md flex flex-col"
              :class="selectedSpace.id === space.id ? 'border-[#C98A5E] ring-2 ring-[#C98A5E]/20' : 'border-[#EAD9C4]'"
            >
              <img :src="space.image" :alt="space.name" class="w-full h-40 object-cover" />
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-[#4A3226] text-base">{{ space.name }}</h3>
                    <span class="text-xs font-bold text-[#C98A5E] bg-[#FBF4EA] px-2 py-0.5 rounded-md">
                      Rs. {{ space.pricePerHour }}/hr
                    </span>
                  </div>
                  <p class="text-xs text-[#8A7563] mb-3 flex items-center gap-1">
                    <Users class="w-3.5 h-3.5" /> {{ space.capacity }}
                  </p>
                </div>
                
                <div class="border-t border-gray-100 pt-3 flex flex-wrap gap-2">
                  <span v-for="feat in space.features" :key="feat" class="text-[10px] bg-gray-100 text-[#4A3226] px-2 py-0.5 rounded-md font-medium">
                    {{ feat }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Reservation Details Card -->
        <div class="bg-white rounded-3xl p-6 border border-[#EAD9C4] shadow-sm h-fit">
          <h2 class="text-lg font-bold text-[#4A3226] mb-4">2. Reservation Details</h2>

          <div v-if="errorMessage" class="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleBooking" class="flex flex-col gap-4">
            
            <!-- Selected Space Summary -->
            <div class="p-3 bg-[#FBF4EA] rounded-xl border border-[#EAD9C4]/60">
              <span class="text-[10px] text-[#8A7563] uppercase font-bold tracking-wider">Selected Space</span>
              <p class="font-bold text-[#4A3226] text-sm">{{ selectedSpace.name }}</p>
            </div>

            <!-- Date Selection -->
            <div>
              <label class="block text-xs font-bold text-[#4A3226] mb-1">Date</label>
              <div class="relative flex items-center">
                <Calendar class="absolute left-3 w-4 h-4 text-[#8A7563]" />
                <input 
                  v-model="bookingDate" 
                  type="date" 
                  class="w-full pl-9 pr-3 py-2 bg-[#FBF4EA]/50 rounded-xl border border-[#EAD9C4] text-xs font-medium text-[#4A3226] focus:outline-none focus:border-[#C98A5E]"
                />
              </div>
            </div>

            <!-- Time & Duration -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[#4A3226] mb-1">Start Time</label>
                <div class="relative flex items-center">
                  <Clock class="absolute left-3 w-4 h-4 text-[#8A7563]" />
                  <input 
                    v-model="startTime" 
                    type="time" 
                    class="w-full pl-9 pr-2 py-2 bg-[#FBF4EA]/50 rounded-xl border border-[#EAD9C4] text-xs font-medium text-[#4A3226] focus:outline-none focus:border-[#C98A5E]"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-bold text-[#4A3226] mb-1">Duration (Hours)</label>
                <select 
                  v-model="duration" 
                  class="w-full px-3 py-2 bg-[#FBF4EA]/50 rounded-xl border border-[#EAD9C4] text-xs font-medium text-[#4A3226] focus:outline-none focus:border-[#C98A5E]"
                >
                  <option :value="1">1 Hour</option>
                  <option :value="2">2 Hours</option>
                  <option :value="4">4 Hours</option>
                  <option :value="8">Full Day (8 Hrs)</option>
                </select>
              </div>
            </div>

            <!-- Price Summary -->
            <div class="border-t border-[#EAD9C4] pt-4 mt-2">
              <div class="flex justify-between text-xs text-[#8A7563] mb-1">
                <span>Rate</span>
                <span>Rs. {{ selectedSpace.pricePerHour }} × {{ duration }} hrs</span>
              </div>
              <div class="flex justify-between text-base font-bold text-[#4A3226]">
                <span>Total Amount</span>
                <span class="text-[#C98A5E]">Rs. {{ selectedSpace.pricePerHour * duration }}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-3 bg-[#4A3226] hover:bg-[#3A2619] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 mt-2 shadow-md disabled:opacity-50"
            >
              <span>Confirm Booking</span>
              <ChevronRight class="w-4 h-4" />
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>