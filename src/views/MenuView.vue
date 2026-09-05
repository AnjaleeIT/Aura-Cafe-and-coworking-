<script setup>
import { ref, computed } from 'vue'
import { ShoppingBag, Plus, Sparkles, Check } from 'lucide-vue-next'

// Active Category Filter
const activeCategory = ref('All')

// Categories
const categories = ['All', 'Iced Coffee', 'Milk-Based', 'Classic', 'Specialty']

// Menu Items Data
const menuItems = ref([
  {
    id: 1,
    name: 'Iced Espresso',
    category: 'Iced Coffee',
    price: 650,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Caramel Macchiato',
    category: 'Milk-Based',
    price: 950,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Iced Latte',
    category: 'Iced Coffee',
    price: 850,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Flat White',
    category: 'Classic',
    price: 750,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 5,
    name: 'Vienna Coffee',
    category: 'Specialty',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 6,
    name: 'Coconut Iced Brew',
    category: 'Specialty',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400'
  }
])

// Shopping Cart State
const cart = ref([])

// Filtered Menu Items
const filteredMenu = computed(() => {
  if (activeCategory.value === 'All') return menuItems.value
  return menuItems.value.filter(item => item.category === activeCategory.value)
})

// Add to Cart
const addToCart = (item) => {
  const existing = cart.value.find(i => i.id === item.id)
  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ ...item, qty: 1 })
  }
}

// Total Price
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.qty), 0)
})
</script>

<template>
  <div style="background-color: #F8F4EF; min-height: 100vh; padding-bottom: 60px; font-family: 'Playfair Display', serif, sans-serif;">
    
    <div style="max-width: 1000px; margin: 0 auto; padding: 0 20px;">
      
      <!-- 1. HERO BANNER SECTION -->
      <div style="position: relative; height: 320px; border-radius: 28px; overflow: hidden; margin-top: 20px; box-shadow: 0 12px 30px rgba(0,0,0,0.08);">
        <img 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200" 
          alt="Coffee Banner"
          style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75);"
        />
        <div style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-color: white; text-align: center; color: white;">
          <h1 style="font-size: 42px; font-weight: 900; letter-spacing: 6px; margin: 0; text-transform: uppercase;">Order Coffee</h1>
          <p style="font-size: 14px; letter-spacing: 3px; font-weight: 500; margin-top: 8px; opacity: 0.9;">WELCOME TO AURA CAFE</p>
        </div>
      </div>

      <!-- 2. MENU HEADER & BASKET BAR -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px; margin-bottom: 24px;">
        <h2 style="font-size: 28px; font-weight: 800; color: #3C2A21; margin: 0;">Menu</h2>

        <!-- Basket Pill Button -->
        <div style="background-color: #C87D55; color: white; padding: 10px 20px; border-radius: 30px; display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 13px; box-shadow: 0 4px 12px rgba(200,125,85,0.3);">
          <ShoppingBag style="width: 18px; height: 18px;" />
          <span>My Basket ({{ cart.reduce((acc, item) => acc + item.qty, 0) }})</span>
          <span v-if="cartTotal > 0" style="background-color: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 12px;">
            LKR {{ cartTotal }}
          </span>
        </div>
      </div>

      <!-- 3. CATEGORY PILL BUTTONS -->
      <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 30px;">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          :style="{
            padding: '10px 22px',
            borderRadius: '25px',
            border: 'none',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            backgroundColor: activeCategory === cat ? '#C87D55' : '#EFE8DE',
            color: activeCategory === cat ? 'white' : '#665A48'
          }"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 4. PRODUCT GRID -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 24px;">
        <div 
          v-for="item in filteredMenu" 
          :key="item.id"
          style="background-color: white; border-radius: 20px; padding: 16px; border: 1px solid #EFE8DE; box-shadow: 0 6px 16px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between;"
        >
          <div style="height: 180px; border-radius: 14px; overflow: hidden; margin-bottom: 14px;">
            <img :src="item.image" :alt="item.name" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>

          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #3C2A21; margin: 0 0 6px 0;">{{ item.name }}</h3>
            <p style="font-size: 12px; color: #8C7A6B; margin: 0 0 14px 0;">{{ item.category }}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <span style="font-size: 15px; font-weight: 800; color: #C87D55;">LKR {{ item.price }}</span>
            <button 
              @click="addToCart(item)"
              style="background-color: #3C2A21; color: white; border: none; width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
            >
              <Plus style="width: 18px; height: 18px;" />
            </button>
          </div>
        </div>
      </div>

      <!-- 5. FEATURED PROMOTIONAL BANNER (PINTEREST STYLE) -->
      <div style="margin-top: 50px; background-color: #F8D7DA; border-radius: 24px; padding: 32px; display: flex; align-items: center; justify-content: space-between; position: relative; overflow: hidden; border: 1px solid #F5C6CB;">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; color: #842029; font-weight: 800; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">
            <Sparkles style="width: 16px; height: 16px;" />
            <span>New Addition</span>
          </div>
          <h2 style="font-size: 36px; font-weight: 900; color: #842029; margin: 0 0 8px 0;">Iced Latte</h2>
          <p style="font-size: 14px; color: #842029; margin: 0 0 20px 0; opacity: 0.85;">With espresso, caramel milk & organic ice coconut syrup.</p>
          
          <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 24px; font-weight: 900; color: #842029;">LKR 850</span>
            <span style="font-size: 14px; text-decoration: line-through; color: #A75D65;">LKR 1050</span>
            <span style="background-color: #842029; color: white; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700;">20% OFF</span>
          </div>
        </div>

        <div style="width: 160px; height: 160px; border-radius: 20px; overflow: hidden; flex-shrink: 0;">
          <img src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=400" alt="Special Drink" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>

    </div>
  </div>
</template>