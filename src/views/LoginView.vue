<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, Mail, ShieldCheck, ArrowRight, User, Loader2 } from 'lucide-vue-next'
import { supabase } from '../supabase'

const router = useRouter()

const isRegister = ref(false)
const fullName = ref('')
const email = ref('')
const password = ref('')
const role = ref('customer')

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const toggleView = (mode) => {
  isRegister.value = mode
  errorMessage.value = ''
  successMessage.value = ''
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!email.value || !password.value || (isRegister.value && !fullName.value)) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  isLoading.value = true

  try {
    if (isRegister.value) {
      // ----------------- REGISTER -----------------
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            full_name: fullName.value,
            role: role.value
          }
        }
      })

      if (error) throw error

      successMessage.value = 'Registration successful! You can now log in.'
      isRegister.value = false
      password.value = ''

    } else {
      // ----------------- LOGIN -----------------
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if (authError) throw authError

      // Supabase profiles table එකෙන් Role එක පරීක්ෂා කිරීම
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .maybeSingle()

      // Database එකේ profile role එක නැත්නම් user metadata හෝ email එක මගින් admin ද කියා තීරණය කිරීම
      let actualRole = profile?.role || authData.user.user_metadata?.role

      if (!actualRole) {
        if (email.value.includes('admin') || role.value === 'admin') {
          actualRole = 'admin'
        } else {
          actualRole = 'customer'
        }
      }

      // Selected Tab එක Admin වී Database/Metadata එකේ Access නැතිනම් Block කිරීම
      if (role.value === 'admin' && actualRole !== 'admin' && actualRole !== 'staff') {
        errorMessage.value = 'Access denied! You do not have Staff/Admin permissions.'
        await supabase.auth.signOut()
        isLoading.value = false
        return
      }

      // LocalStorage Sync කිරීම
      localStorage.setItem('user_role', actualRole)
      localStorage.setItem('is_logged_in', 'true')
      localStorage.setItem('user_email', email.value)

      // Dynamic Redirect Logic
      if (actualRole === 'admin' || actualRole === 'staff' || role.value === 'admin') {
        await router.push('/admin')
      } else {
        await router.push('/spaces')
      }
    }

  } catch (err) {
    errorMessage.value = err.message || 'An error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-[85vh] flex items-center justify-center p-5 bg-[#FBF4EA]">
    <div class="w-full max-w-md bg-white rounded-3xl p-8 border border-[#EAD9C4] shadow-xl">
      
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-extrabold text-[#4A3226] tracking-widest mb-1 font-serif">AURA</h1>
        <p class="text-xs text-[#B9805A] font-semibold uppercase tracking-wider">
          {{ isRegister ? 'Create a new account' : 'Sign in to your account' }}
        </p>
      </div>

      <!-- Alerts -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs mb-5 text-center font-medium">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-xl text-xs mb-5 text-center font-medium">
        {{ successMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        
        <!-- Role Selector Switcher -->
        <div class="flex p-1 bg-[#F3E5D3] rounded-xl border border-[#EAD9C4]">
          <button 
            type="button"
            @click="role = 'customer'"
            class="flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200"
            :class="role === 'customer' ? 'bg-[#4A3226] text-white shadow-xs' : 'text-[#6B5544] hover:text-[#4A3226]'"
          >
            Customer
          </button>
          <button 
            type="button"
            @click="role = 'admin'"
            class="flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200"
            :class="role === 'admin' ? 'bg-[#C98A5E] text-white shadow-xs' : 'text-[#6B5544] hover:text-[#4A3226]'"
          >
            Staff / Admin
          </button>
        </div>

        <!-- Full Name (Register Mode Only) -->
        <div v-if="isRegister">
          <label class="block text-xs font-bold text-[#4A3226] mb-1.5">Full Name</label>
          <div class="relative flex items-center">
            <User class="absolute left-3 w-4 h-4 text-[#8A7563]" />
            <input 
              v-model="fullName"
              type="text" 
              placeholder="e.g. Kasun Perera"
              class="w-full pl-9 pr-4 py-2.5 bg-[#FBF4EA]/50 rounded-xl border border-[#EAD9C4] text-xs focus:outline-none focus:border-[#C98A5E] text-[#4A3226]"
            />
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label class="block text-xs font-bold text-[#4A3226] mb-1.5">Email Address</label>
          <div class="relative flex items-center">
            <Mail class="absolute left-3 w-4 h-4 text-[#8A7563]" />
            <input 
              v-model="email"
              type="email" 
              placeholder="auraadmin@gmail.com"
              class="w-full pl-9 pr-4 py-2.5 bg-[#FBF4EA]/50 rounded-xl border border-[#EAD9C4] text-xs focus:outline-none focus:border-[#C98A5E] text-[#4A3226]"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-xs font-bold text-[#4A3226] mb-1.5">Password</label>
          <div class="relative flex items-center">
            <Lock class="absolute left-3 w-4 h-4 text-[#8A7563]" />
            <input 
              v-model="password"
              type="password" 
              placeholder="••••••••"
              class="w-full pl-9 pr-4 py-2.5 bg-[#FBF4EA]/50 rounded-xl border border-[#EAD9C4] text-xs focus:outline-none focus:border-[#C98A5E] text-[#4A3226]"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 mt-2 rounded-xl bg-[#4A3226] hover:bg-[#3A2619] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-70 active:scale-98"
        >
          <span v-if="!isLoading">{{ isRegister ? 'Create Account' : 'Sign In' }}</span>
          <span v-else>{{ isRegister ? 'Registering...' : 'Signing In...' }}</span>
          <ArrowRight v-if="!isLoading" class="w-4 h-4" />
          <Loader2 v-else class="w-4 h-4 animate-spin" />
        </button>

      </form>

      <!-- Toggle Mode Button -->
      <div class="text-center mt-5 text-xs text-[#8A7563]">
        <span v-if="!isRegister">Don't have an account? </span>
        <span v-else>Already have an account? </span>
        <button 
          type="button" 
          @click="toggleView(!isRegister)"
          class="font-bold text-[#C98A5E] hover:underline bg-transparent border-0 cursor-pointer"
        >
          {{ isRegister ? 'Sign In' : 'Register Now' }}
        </button>
      </div>

      <!-- Footer Security Text -->
      <div class="mt-6 text-center text-[11px] text-[#8A7563] flex items-center justify-center gap-1.5">
        <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
        <span>Secure Access • AURA Workspace System</span>
      </div>

    </div>
  </div>
</template>