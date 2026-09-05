<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { LayoutDashboard, Users, BookOpenCheck, Coffee, LogOut } from 'lucide-vue-next'

const router = useRouter()

const adminLinks = [
  { name: 'control-panel-overview', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
  { name: 'space-management', label: 'Workspaces', icon: BookOpenCheck, path: '/admin/spaces' },
  { name: 'user-management', label: 'Users', icon: Users, path: '/admin/users' },
  { name: 'order-management', label: 'Orders (KDS)', icon: Coffee, path: '/admin/orders' },
]

// Logout Logic
const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <div style="display: flex; min-height: 100vh; background-color: #F5EFE6; font-family: sans-serif;">
    
    <!-- SIDEBAR -->
    <aside style="width: 260px; background-color: #2D1E18; color: #EADBC8; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; flex-shrink: 0;">
      <div>
        <!-- Admin Logo -->
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 40px;">
          <RouterLink to="/" style="text-decoration: none; color: #FDFBF7; font-size: 24px; font-weight: 800; letter-spacing: 2px;">
            AURA
          </RouterLink>
          <span style="font-size: 10px; text-transform: uppercase; font-weight: 700; background-color: #C87D55; color: white; padding: 2px 8px; border-radius: 12px;">Admin</span>
        </div>

        <!-- Navigation Links -->
        <nav style="display: flex; flex-direction: column; gap: 8px;">
          <RouterLink
            v-for="link in adminLinks"
            :key="link.name"
            :to="link.path"
            style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; text-decoration: none; font-size: 14px; font-weight: 600; transition: all 0.2s;"
            :style="$route.name === link.name ? 'background-color: #C87D55; color: white;' : 'color: #D5C6B1;'"
          >
            <component :is="link.icon" style="width: 18px; height: 18px;" />
            <span>{{ link.label }}</span>
          </RouterLink>
        </nav>
      </div>

      <!-- Logout Button -->
      <button 
        @click="handleLogout"
        style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #D5C6B1; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 600; width: 100%; text-align: left;"
      >
        <LogOut style="width: 18px; height: 18px;" />
        <span>Logout</span>
      </button>
    </aside>

    <!-- MAIN CONTENT AREA -->
    <main style="flex: 1; padding: 32px; overflow-y: auto;">
      <!-- TOP HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #DFC3A6;">
        <h1 style="font-size: 24px; font-weight: 700; color: #2D1E18; margin: 0; display: flex; align-items: center; gap: 10px;">
          <LayoutDashboard style="width: 24px; height: 24px; color: #8B5E3C;" />
          <span>AURA Control Panel</span>
        </h1>
        <span style="font-size: 12px; color: #8B5E3C; font-weight: 600; font-family: monospace;">STAFF ACCESS | Colombo 07</span>
      </div>
      
      <!-- PAGE CONTENT LOADED HERE -->
      <RouterView />
    </main>

  </div>
</template>