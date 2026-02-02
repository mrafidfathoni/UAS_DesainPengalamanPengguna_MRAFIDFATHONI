<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md mb-8">
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
            <router-link to="/" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Home
            </router-link>
            <router-link to="/report/step1" class="text-[#007BFF] font-medium border-b-2 border-[#007BFF] pb-1 transition-colors">
              Lapor
            </router-link>
            <router-link to="/dashboard" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Riwayat
            </router-link>
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

    <!-- Progress Bar Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between relative px-8">
             <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 -z-0 mx-12"></div>
             <!-- Step 1 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    1
                </div>
                <span class="text-xs font-medium text-gray-900">Kategori</span>
             </div>
             
             <!-- Step 2 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold ring-4 ring-white">
                    2
                </div>
                <span class="text-xs font-medium text-gray-400">Lokasi</span>
             </div>

             <!-- Step 3 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold ring-4 ring-white">
                    3
                </div>
                <span class="text-xs font-medium text-gray-400">Detail</span>
             </div>

             <!-- Step 4 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold ring-4 ring-white">
                    4
                </div>
                <span class="text-xs font-medium text-gray-400">Review</span>
             </div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Pilih Kategori Kerusakan</h2>
            <p class="text-gray-500">Pilih jenis fasilitas yang ingin Anda laporkan</p>
          </div>

          <!-- Category Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.name)"
              class="group relative h-[240px] rounded-2xl overflow-hidden text-left transition-all duration-300 ring-offset-2 focus:outline-none"
              :class="{ 
                'ring-4 ring-[#007BFF] bg-gray-900': reportStore.reportData.category === category.name,
                'hover:ring-4 hover:ring-gray-200 bg-gray-800': reportStore.reportData.category !== category.name 
              }"
            >
              <!-- Background Image -->
              <ImageWithFallback
                  :src="category.image"
                  :alt="category.name"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              <!-- Content -->
              <div class="absolute bottom-0 left-0 p-6 z-10 w-full">
                 <h3 class="text-white font-bold text-lg mb-1 group-hover:text-[#007BFF] transition-colors">{{ category.name }}</h3>
                 <p class="text-gray-300 text-xs leading-relaxed">{{ category.desc }}</p>
              </div>

              <!-- Selected Indicator -->
              <div 
                v-if="reportStore.reportData.category === category.name"
                class="absolute top-4 right-4 bg-[#007BFF] text-white rounded-full p-1 shadow-lg animate-scale-up z-20"
              >
                  <span class="material-icons text-sm block">check</span>
              </div>
            </button>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between items-center">
            <button
              @click="$router.push('/')"
              class="px-8 py-3 rounded-xl font-bold text-[#007BFF] border-2 border-[#007BFF] hover:bg-blue-50 transition-all"
            >
              Batal
            </button>
            <button
              @click="handleNext"
              :disabled="!reportStore.reportData.category"
              class="px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2"
              :class="{
                'bg-[#007BFF] shadow-blue hover:shadow-lg hover:-translate-y-0.5': reportStore.reportData.category,
                'bg-gray-300 cursor-not-allowed': !reportStore.reportData.category
              }"
            >
              Lanjut
              <span class="material-icons text-sm">arrow_forward</span>
            </button>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
import ImageWithFallback from './figma/ImageWithFallback.vue';
import { useReportStore } from '../stores/report';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  components: {
    ImageWithFallback,
  },
  setup() {
    const reportStore = useReportStore();
    const router = useRouter();
    const isLoggedIn = ref(false);

    onMounted(() => {
      const token = localStorage.getItem('user_token');
      isLoggedIn.value = !!token;
    });

    const handleLogout = () => {
        localStorage.clear();
        isLoggedIn.value = false;
        router.push('/auth');
    };

    const selectCategory = (category) => {
      reportStore.setCategory(category);
    };

    const handleNext = () => {
      if (reportStore.reportData.category) {
        router.push('/report/step2');
      }
    };

    return {
      reportStore,
      isLoggedIn,
      handleLogout,
      selectCategory,
      handleNext,
      categories: [
        {
          id: 'jalan-rusak',
          name: 'Jalan Rusak',
          desc: 'Jalan berlubang, retak, atau rusak',
          image: 'https://images.unsplash.com/photo-1740486604216-5230af12485d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFja2VkJTIwZGFtYWdlZCUyMHJvYWR8ZW58MXx8fHwxNzYzMDE1OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'lampu-mati',
          name: 'Lampu Mati',
          desc: 'Lampu jalan mati atau rusak', // Reverting text as well if needed, but user said "gambar". The previous text was "Lampu Mati" vs "Lampu Jalan Mati". I'll use "Lampu Mati" to be safe or keep the new text? User said "kembalikan seperti sebelumnya aslian menggunakan foto sebelumnya". I'll revert both image and text to match Step 249 completely for safety.
          image: 'https://images.unsplash.com/photo-1685992830281-2eef1f9bd3e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBzdHJlZXRsaWdodCUyMG5pZ2h0fGVufDF8fHx8MTc2Mjk0ODU0MXww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'fasilitas-lain',
          name: 'Fasilitas Lain',
          desc: 'Taman, bangku, tong sampah, dll',
          image: 'https://images.unsplash.com/photo-1670219286484-179d3dd3d047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwcGFyayUyMGJlbmNofGVufDF8fHx8MTc2MzAxNTk0OHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ]
    };
  }
};
</script>

<style scoped>
/* Scoped styles mainly handled by tailwind */
</style>
