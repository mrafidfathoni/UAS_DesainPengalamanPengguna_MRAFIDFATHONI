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
             <!-- Progress Line Background -->
             <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 -z-0 mx-12">
                <!-- Active Progress Line (100% for Step 4) -->
                <div class="absolute left-0 top-0 bottom-0 bg-[#007BFF] transition-all duration-500" style="width: 100%"></div>
             </div>
             
             <!-- Step 1 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    <span class="material-icons text-sm">check</span>
                </div>
                <span class="text-xs font-medium text-[#007BFF]">Kategori</span>
             </div>
             
             <!-- Step 2 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    <span class="material-icons text-sm">check</span>
                </div>
                <span class="text-xs font-medium text-[#007BFF]">Lokasi</span>
             </div>

             <!-- Step 3 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    <span class="material-icons text-sm">check</span>
                </div>
                <span class="text-xs font-medium text-[#007BFF]">Detail</span>
             </div>

             <!-- Step 4 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    4
                </div>
                <span class="text-xs font-medium text-gray-900">Review</span>
             </div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Review & Kirim</h2>
            <p class="text-gray-500">Pastikan data Anda sudah benar sebelum mengirim laporan</p>
        </div>

        <!-- Summary Content -->
        <!-- ID & Status Badge -->
        <div class="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">ID Laporan</p>
            <p class="text-lg font-mono font-bold text-gray-900">{{ reportId }}</p>
          </div>
          <div class="px-3 py-1 bg-blue-100 text-[#007BFF] rounded-full text-xs font-bold uppercase tracking-wide">
            Draft
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Left Column: Details -->
            <div class="space-y-6">
                <!-- Category -->
                <div>
                   <div class="flex items-center justify-between mb-2">
                     <h3 class="text-sm font-bold text-gray-700">Kategori</h3>
                     <router-link to="/report/step1" class="text-[#007BFF] text-xs font-bold hover:underline">Edit</router-link>
                   </div>
                   <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div class="w-10 h-10 bg-blue-100 text-[#007BFF] rounded-full flex items-center justify-center">
                            <span class="material-icons text-xl">category</span>
                        </div>
                        <span class="font-medium text-gray-900">{{ reportStore.reportData.category || 'Belum dipilih' }}</span>
                   </div>
                </div>

                <!-- Description -->
                <div>
                   <div class="flex items-center justify-between mb-2">
                     <h3 class="text-sm font-bold text-gray-700">Deskripsi</h3>
                     <router-link to="/report/step3" class="text-[#007BFF] text-xs font-bold hover:underline">Edit</router-link>
                   </div>
                   <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[100px]">
                        <p class="text-gray-700 text-sm leading-relaxed">{{ reportStore.reportData.description || 'Tidak ada deskripsi' }}</p>
                   </div>
                </div>

                <!-- Photos -->
                <div>
                   <div class="flex items-center justify-between mb-2">
                     <h3 class="text-sm font-bold text-gray-700">Foto Bukti</h3>
                     <router-link to="/report/step3" class="text-[#007BFF] text-xs font-bold hover:underline">Edit</router-link>
                   </div>
                   <div class="flex gap-3 overflow-x-auto pb-2">
                   <div class="flex gap-3 overflow-x-auto pb-2">
                        <div v-if="photoPreviews.length > 0" v-for="(preview, idx) in photoPreviews" :key="idx" class="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                            <img :src="preview" class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-black/10"></div>
                        </div>
                        <div v-else class="w-24 h-24 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                            <span class="material-icons text-gray-300">image_not_supported</span>
                        </div>
                   </div>
                   </div>
                </div>
            </div>

            <!-- Right Column: Location & Map -->
            <div>
                 <div class="flex items-center justify-between mb-2">
                     <h3 class="text-sm font-bold text-gray-700">Lokasi Kejadian</h3>
                     <router-link to="/report/step2" class="text-[#007BFF] text-xs font-bold hover:underline">Edit</router-link>
                 </div>
                 <div class="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                     <div class="p-4 border-b border-gray-100">
                        <div class="flex items-start gap-2">
                            <span class="material-icons text-[#007BFF] text-sm mt-0.5">location_on</span>
                            <p class="text-sm text-gray-800 font-medium">{{ reportStore.reportData.address || 'Lokasi belum ditentukan' }}</p>
                        </div>
                     </div>
                     <div class="h-48 w-full relative z-0">
                         <div id="map" class="w-full h-full z-0"></div>
                     </div>
                 </div>
            </div>
        </div>

        <!-- Agreement -->
        <div class="mb-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
            <label class="flex items-start gap-3 cursor-pointer group">
              <div class="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  v-model="isAgreed"
                  class="peer sr-only"
                />
                <div class="w-5 h-5 border-2 border-gray-400 rounded bg-white peer-checked:bg-[#007BFF] peer-checked:border-[#007BFF] transition-all"></div>
                <span class="material-icons absolute text-white text-sm left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">check</span>
              </div>
              <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors select-none">
                Saya menyatakan bahwa data yang saya kirimkan adalah benar dan dapat dipertanggungjawabkan.
              </span>
            </label>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center pt-6 border-t border-gray-100">
            <router-link
              to="/report/step3"
              class="px-8 py-3 rounded-xl font-bold text-[#007BFF] border-2 border-[#007BFF] hover:bg-blue-50 transition-all flex items-center gap-2"
              :class="{ 'opacity-50 pointer-events-none': isSubmitting || showSuccess }"
            >
              <span class="material-icons text-sm">arrow_back</span>
              Kembali
            </router-link>
            <button
              @click="handleSubmit"
              :disabled="!isAgreed || isSubmitting || showSuccess"
              class="px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2 shadow-blue hover:shadow-lg hover:-translate-y-0.5 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
              :class="{ 'bg-[#007BFF]': isAgreed, 'bg-gray-300': !isAgreed }"
            >
              <span v-if="isSubmitting" class="material-icons animate-spin text-sm">sync</span>
              {{ isSubmitting ? 'Mengirim...' : 'Kirim Laporan' }}
              <span v-if="!isSubmitting" class="material-icons text-sm">send</span>
            </button>
        </div>
      </div>
    </main>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div class="bg-white rounded-2xl p-8 max-w-sm w-full animate-scale-up shadow-2xl text-center">
        <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span class="material-icons text-5xl">check_circle</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Laporan Terkirim!</h3>
        <p class="text-gray-600 text-sm mb-6">Terima kasih telah berpartisipasi. Laporan Anda dengan ID <strong class="text-[#007BFF]">{{ reportId }}</strong> sdh kami terima.</p>
        
        <div class="space-y-3">
            <button
              @click="onGoToDashboard"
              class="w-full px-6 py-3 bg-[#007BFF] text-white rounded-xl font-bold hover:bg-[#0069D9] transition-all"
            >
              Lihat Status Laporan
            </button>
            <router-link
              to="/"
              class="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Kembali ke Beranda
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useReportStore } from '../stores/report';
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  setup() {
    const reportStore = useReportStore();
    const router = useRouter();
    const isAgreed = ref(false);
    const isSubmitting = ref(false);
    const showSuccess = ref(false);
    const photoPreviews = ref([]);
    const isLoggedIn = ref(false);
    let map = null;

    const reportId = computed(() => {
      // Just a random ID for display before submission
      return `LAP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    });

    onMounted(() => {
        const token = localStorage.getItem('user_token');
        isLoggedIn.value = !!token;

        // Init Map
        if (reportStore.reportData.location) {
             nextTick(() => {
                initMap(reportStore.reportData.location);
             });
        }

        // Init Photo Previews
        if (reportStore.reportData.items && reportStore.reportData.items.length > 0) {
            photoPreviews.value = reportStore.reportData.items.map(file => {
                if (file instanceof File) {
                    return URL.createObjectURL(file);
                } else if (file.preview) {
                    return file.preview;
                }
                return null;
            }).filter(p => p !== null);
        }
    });
    
    onUnmounted(() => {
        // Cleanup object URLs
        photoPreviews.value.forEach(url => URL.revokeObjectURL(url));
        if (map) {
            map.remove();
        }
    });

    const initMap = (locationStr) => {
        // Parse "lat, lng" string
        if (!locationStr) return;
        const [lat, lng] = locationStr.split(',').map(coord => parseFloat(coord.trim()));
        
        if (isNaN(lat) || isNaN(lng)) return;

        map = L.map('map', { zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false }).setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        // Fix Leaflet marker icon
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Static marker, no popup needed for review
        L.marker([lat, lng]).addTo(map);
    };

    const handleSubmit = async () => {
      if (!isAgreed.value) return;
      isSubmitting.value = true;
      
      const result = await reportStore.submitReport();
      isSubmitting.value = false;

      if (result.success) {
        showSuccess.value = true;
      } else {
        alert("Gagal mengirim laporan: " + (result.message || "Terjadi kesalahan server"));
      }
    };

    const onGoToDashboard = () => {
      reportStore.resetForm(); // Ensure clean slate
      router.push('/dashboard'); // Assuming user dashboard/history exists or redirect home
    };

    const handleLogout = () => {
        localStorage.clear();
        isLoggedIn.value = false;
        router.push('/auth');
    };

    return {
      reportStore,
      isAgreed,
      isSubmitting,
      showSuccess,
      reportId,
      handleSubmit,
      onGoToDashboard,
      photoPreviews,
      isLoggedIn,
      handleLogout
    };
  }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
    z-index: 0;
}
</style>
