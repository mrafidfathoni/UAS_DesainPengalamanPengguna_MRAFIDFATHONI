<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-xl fixed h-full z-20 hidden md:flex flex-col">
      <div class="p-6 border-b">
        <div class="flex items-center gap-2">
          <span class="material-icons text-[#007BFF] text-3xl">location_city</span>
          <span class="text-xl font-semibold text-gray-900">LaporinAja</span>
        </div>
      </div>
      
      <nav class="flex-1 py-6 px-4 space-y-2">
        <router-link
          to="/admin/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium"
          :class="$route.path.includes('/dashboard') ? 'bg-[#E7F3FF] text-[#007BFF]' : 'text-gray-600 hover:bg-gray-50'"
        >
          <span class="material-icons">dashboard</span>
          Dashboard
        </router-link>
        
        <router-link
          to="/admin/reports"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium"
          :class="$route.path.includes('/reports') ? 'bg-[#E7F3FF] text-[#007BFF]' : 'text-gray-600 hover:bg-gray-50'"
        >
          <span class="material-icons">assignment</span>
          Laporan Warga
        </router-link>

        <router-link
          to="/admin/settings"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium"
          :class="$route.path.includes('/settings') ? 'bg-[#E7F3FF] text-[#007BFF]' : 'text-gray-600 hover:bg-gray-50'"
        >
          <span class="material-icons">settings</span>
          Pengaturan
        </router-link>
      </nav>

      <div class="p-4 border-t mt-auto">
        <div class="flex items-center gap-3 px-2">
          <div class="w-10 h-10 rounded-full bg-[#E7F3FF] flex items-center justify-center text-[#007BFF] font-bold text-sm">
            SA
          </div>
          <div class="overflow-hidden">
            <h4 class="text-sm font-bold text-gray-900 truncate">System Admin</h4>
            <p class="text-xs text-gray-500 truncate">admin@laporinaja.id</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
      <!-- Header Mobile -->
      <header class="bg-white shadow-sm md:hidden p-4 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center gap-2">
          <span class="material-icons text-[#007BFF]">location_city</span>
          <span class="font-semibold text-gray-900">LaporinAja</span>
        </div>
        <button class="text-gray-600">
          <span class="material-icons">menu</span>
        </button>
      </header>

      <!-- Desktop Header -->
      <header class="hidden md:flex bg-white shadow-sm h-16 items-center justify-between px-8 sticky top-0 z-10">
        <h2 class="text-xl font-semibold text-gray-800">{{ pageTitle }}</h2>
        <div class="flex items-center gap-6">
          <button class="relative text-gray-500 hover:text-gray-900 transition-colors">
            <span class="material-icons">notifications_none</span>
            <span class="absolute top-0.5 right-0.5 w-2 h-2 bg-[#DC3545] rounded-full border border-white"></span>
          </button>
          
          <button 
            @click="handleLogout"
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors"
          >
            <span class="material-icons text-xl">logout</span>
            Keluar
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 md:p-8 flex-1 overflow-x-hidden">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const pageTitle = computed(() => {
      if (route.path.includes('/dashboard')) return 'Dashboard Overview';
      if (route.path.includes('/reports')) return 'Manajemen Laporan';
      if (route.path.includes('/settings')) return 'Pengaturan';
      return 'Admin Panel';
    });

    const handleLogout = () => {
      localStorage.removeItem('adminAuthenticated');
      router.push('/admin/login');
    };

    return {
      pageTitle,
      handleLogout
    };
  }
};
</script>
