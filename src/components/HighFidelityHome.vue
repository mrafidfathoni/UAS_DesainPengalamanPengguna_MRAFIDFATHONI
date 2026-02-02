<template>
  <div class="min-h-screen bg-background">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="flex items-center gap-2">
              <span class="material-icons text-[#007BFF] text-3xl">location_city</span>
              <span class="text-xl font-semibold text-gray-900">LaporinAja</span>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8">
            <router-link to="/" class="text-[#007BFF] font-medium border-b-2 border-[#007BFF] pb-1 transition-colors">
              Home
            </router-link>
            <button @click="handleLaporClick" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Lapor
            </button>
            <button @click="handleRiwayatClick" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Riwayat
            </button>
            <router-link v-if="isLoggedIn" to="/profile" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Profil
            </router-link>
            <router-link to="/about" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Tentang
            </router-link>

            <router-link v-if="!isLoggedIn" to="/auth" class="px-4 py-2 bg-[#007BFF] text-white rounded-lg hover:bg-[#0069D9] transition-all hover:shadow-blue">
              Masuk/Daftar
            </router-link>
            <button v-else @click="handleLogout" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
                Keluar
            </button>
          </nav>

          <!-- Mobile Menu Button -->
          <button class="md:hidden">
            <span class="material-icons text-gray-600">menu</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Login Notification -->
    <div v-if="showLoginNotification" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
        <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4">
            <span class="material-icons text-red-500">lock</span>
            <div>
                <h4 class="font-bold text-sm">Akses Dibatasi</h4>
                <p class="text-xs">Silakan login terlebih dahulu untuk melanjutkan</p>
            </div>
            <button @click="$router.push('/auth')" class="bg-red-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-red-700 transition-colors ml-2">
                Login Sekarang
            </button>
            <button @click="showLoginNotification = false" class="text-red-400 hover:text-red-600 ml-2">
                <span class="material-icons text-sm">close</span>
            </button>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="relative h-[600px] md:h-[700px] overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBuaWdodCUyMHNreWxpbmV8ZW58MXx8fHwxNzYzMDE1OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Smart City Skyline"
          class="w-full h-full object-cover"
        />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#007BFF]/40"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div class="max-w-3xl animate-fade-in">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Laporkan. Pantau. Perbaiki.
          </h1>
          <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Wujudkan kota pintar bersama warga. Laporkan kerusakan fasilitas publik dengan mudah dan pantau perkembangannya secara real-time.
          </p>

          <!-- CTA Button with Ripple Effect -->
          <button
            @click="handleLaporClick"
            class="group relative px-8 py-4 bg-[#007BFF] text-white rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:bg-[#0069D9] hover:shadow-blue hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <span class="relative z-10 flex items-center gap-2">
              <span class="material-icons">report_problem</span>
              Lapor Sekarang
              <span class="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- 3-Step Workflow -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara Melapor
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Hanya 3 langkah mudah untuk membuat laporan
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div @click="handleLaporClick" class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 block">
            <div class="w-16 h-16 bg-[#E7F3FF] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#007BFF] transition-colors">
              <span class="material-icons text-[#007BFF] text-3xl group-hover:text-white transition-colors">
                directions_car
              </span>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold">
                1
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Pilih Kerusakan
              </h3>
            </div>
            <p class="text-gray-600">
              Pilih kategori kerusakan fasilitas yang ingin dilaporkan dari pilihan yang tersedia
            </p>
          </div>

          <!-- Step 2 -->
          <div @click="handleLaporClick" class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 block">
            <div class="w-16 h-16 bg-[#E7F3FF] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#007BFF] transition-colors">
              <span class="material-icons text-[#007BFF] text-3xl group-hover:text-white transition-colors">
                location_on
              </span>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold">
                2
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Tentukan Lokasi
              </h3>
            </div>
            <p class="text-gray-600">
              Tandai lokasi kerusakan pada peta atau gunakan GPS untuk akurasi yang lebih baik
            </p>
          </div>

          <!-- Step 3 -->
          <div @click="handleLaporClick" class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 block">
            <div class="w-16 h-16 bg-[#E7F3FF] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#007BFF] transition-colors">
              <span class="material-icons text-[#007BFF] text-3xl group-hover:text-white transition-colors">
                send
              </span>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold">
                3
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Kirim & Lacak
              </h3>
            </div>
            <p class="text-gray-600">
              Kirim laporan dan pantau progres perbaikan secara real-time melalui dashboard
            </p>
          </div>
        </div>
      </div>
    </section>



    <!-- Footer -->
    <footer class="bg-[#0F172A] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="md:col-span-2">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-icons text-[#007BFF] text-3xl">location_city</span>
              <span class="text-xl font-bold tracking-tight">LaporinAja</span>
            </div>
            <p class="text-slate-400 text-lg leading-relaxed max-w-sm">
              Sistem pelaporan fasilitas publik untuk mewujudkan kota pintar yang responsif terhadap kebutuhan warga.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-6">Link Cepat</h4>
            <div class="space-y-4">
              <router-link to="/about" class="block text-slate-400 hover:text-[#007BFF] transition-colors">
                Tentang Kami
              </router-link>
              <button @click="handleLaporClick" class="block text-left text-slate-400 hover:text-[#007BFF] transition-colors">
                Buat Laporan
              </button>
              <router-link to="/dashboard" class="block text-slate-400 hover:text-[#007BFF] transition-colors">
                Riwayat Laporan
              </router-link>

            </div>
          </div>
          <div>
            <h4 class="font-bold text-lg mb-6">Kontak</h4>
            <div class="space-y-4 text-slate-400">
              <p class="flex items-center gap-3">
                 <span class="material-icons text-sm">email</span>
                 info@laporinaja.id
              </p>
              <p class="flex items-center gap-3">
                 <span class="material-icons text-sm">phone</span>
                 (021) 1234-5678
              </p>
            </div>
          </div>
        </div>
        <div class="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; 2025 LaporinAja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false);
const showLoginNotification = ref(false);
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('user_token');
  isLoggedIn.value = !!token;
});

const handleLogout = () => {
    localStorage.clear();
    // Force reload via router or location to update state
    isLoggedIn.value = false;
    router.push('/auth');
};

const handleLaporClick = () => {
  if (isLoggedIn.value) {
    router.push('/report/step1');
  } else {
    showLoginNotification.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        showLoginNotification.value = false;
    }, 5000);
  }
};

const handleRiwayatClick = () => {
  if (isLoggedIn.value) {
    router.push('/dashboard');
  } else {
    showLoginNotification.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        showLoginNotification.value = false;
    }, 5000);
  }
};
</script>

<style scoped>
/* You can add custom styles for your component here */
</style>
