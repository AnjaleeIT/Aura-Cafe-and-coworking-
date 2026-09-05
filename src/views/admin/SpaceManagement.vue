<script setup>
import { ref } from 'vue'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'

// Mock Data for UI Testing
const spaces = ref([
  {
    id: 1,
    name: 'Focus Desk #01',
    category: 'Hot Desk',
    pricePerHour: 450,
    status: 'Available'
  },
  {
    id: 2,
    name: 'Quiet Pod #04',
    category: 'Soundproof Zone',
    pricePerHour: 850,
    status: 'Occupied'
  }
])

const toggleStatus = (space) => {
  if (space.status === 'Available') space.status = 'Maintenance'
  else space.status = 'Available'
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="font-size: 22px; font-weight: 700; color: #2D1E18;">Workspace Management</h2>
      <button style="background-color: #C87D55; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
        <Plus style="width: 16px; height: 16px;" />
        <span>Add Space</span>
      </button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <div v-for="space in spaces" :key="space.id" style="background-color: white; border: 1px solid #E0D6C3; border-radius: 16px; padding: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #2D1E18;">{{ space.name }}</h3>
        <p style="margin: 0 0 15px 0; color: #8B5E3C; font-weight: bold;">LKR {{ space.pricePerHour }} / hr</p>
        <button @click="toggleStatus(space)" style="padding: 6px 12px; border-radius: 8px; border: 1px solid #CCC; cursor: pointer;">
          Status: {{ space.status }}
        </button>
      </div>
    </div>
  </div>
</template>