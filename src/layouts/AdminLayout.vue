<script setup>
import { ref } from 'vue';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from 'lucide-vue-next';

// State for sidebar toggle on mobile
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex items-center justify-between h-16 px-6 bg-slate-800">
        <span class="text-xl font-bold tracking-wider uppercase">Admin Panel</span>
        <button @click="toggleSidebar" class="lg:hidden text-gray-400 hover:text-white">
          <X size="24" />
        </button>
      </div>

      <nav class="p-4 space-y-2">
        <router-link to="/admin" class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <LayoutDashboard size="20" class="mr-3" />
          <span>Dashboard</span>
        </router-link>
        <a href="#" class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <FileText size="20" class="mr-3" />
          <span>Laporan</span>
        </a>
        <a href="#" class="flex items-center p-3 text-gray-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size="20" class="mr-3" />
          <span>Pengaturan</span>
        </a>
      </nav>

      <div class="absolute bottom-0 w-full p-4 border-t border-slate-800">
        <router-link to="/" class="flex items-center p-3 text-gray-400 hover:text-white transition-colors">
          <LogOut size="20" class="mr-3" />
          <span>Keluar</span>
        </router-link>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
        <button @click="toggleSidebar" class="lg:hidden text-gray-500 hover:text-gray-700">
          <Menu size="24" />
        </button>
        <div class="flex items-center space-x-4">
          <div class="relative">
             <span class="text-sm font-medium text-gray-700">Admin User</span>
          </div>
          <div class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <slot></slot>
      </main>
    </div>
    
    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="toggleSidebar"
      class="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
    ></div>
  </div>
</template>
