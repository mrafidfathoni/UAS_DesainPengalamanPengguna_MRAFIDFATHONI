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
             <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 -z-0 mx-12">
                <div class="absolute left-0 top-0 bottom-0 bg-[#007BFF] transition-all duration-500" style="width: 33%"></div>
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
                    2
                </div>
                <span class="text-xs font-medium text-gray-900">Lokasi</span>
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
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Tentukan Lokasi</h2>
            <p class="text-gray-500">Tandai lokasi kerusakan pada peta atau gunakan lokasi Anda</p>
        </div>

        <!-- Address Input (Top) -->
        <div class="mb-6">
            <div class="relative">
                <input
                    v-model="address"
                    type="text"
                    placeholder="Cari alamat atau landmark..."
                    class="w-full pl-5 pr-12 py-3 border border-gray-300 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 outline-none transition-all text-gray-700 bg-white"
                />
                <span class="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    location_on
                </span>
            </div>
        </div>

        <!-- Map Container -->
        <div class="mb-6 rounded-xl overflow-hidden border-2 border-[#007BFF]/30 relative h-[400px]">
             <div id="map" class="w-full h-full z-0"></div>
        </div>

        <!-- GPS Button (Bottom) -->
        <button
            @click="handleUseGPS"
            :disabled="isUsingGPS"
            class="w-full mb-10 py-3 border-2 border-[#007BFF] text-[#007BFF] rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
            <span :class="`material-icons ${isUsingGPS ? 'animate-pulse' : ''}`">
                near_me
            </span>
            {{ isUsingGPS ? 'Mencari Lokasi...' : 'Gunakan Lokasi GPS Saya' }}
        </button>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center">
            <router-link
              to="/report/step1"
              class="px-8 py-3 rounded-xl font-bold text-[#007BFF] border-2 border-[#007BFF] hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <span class="material-icons text-sm">arrow_back</span>
              Kembali
            </router-link>
            <button
              @click="handleNext"
              :disabled="!address"
              class="px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2"
              :class="{
                'bg-[#007BFF] shadow-blue hover:shadow-lg hover:-translate-y-0.5': address,
                'bg-gray-300 cursor-not-allowed': !address
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
import { useReportStore } from '../stores/report';
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  setup() {
    const reportStore = useReportStore();
    const router = useRouter();
    const address = ref(reportStore.reportData.address || '');
    const coordinates = ref(reportStore.reportData.location || null);
    const isUsingGPS = ref(false);
    const isLoggedIn = ref(false);
    let map = null;
    let marker = null;

    // Default Jakarta coordinates
    const defaultLat = -6.2088;
    const defaultLng = 106.8456;

    onMounted(() => {
      const token = localStorage.getItem('user_token');
      isLoggedIn.value = !!token;
      initMap();
    });

    const handleLogout = () => {
        localStorage.clear();
        isLoggedIn.value = false;
        router.push('/auth');
    };
    
    // Clean up map instance
    onUnmounted(() => {
        if (map) {
            map.remove();
            map = null;
        }
    });

    const initMap = () => {
      // Use stored location if available, else default
      let startLat = defaultLat;
      let startLng = defaultLng;
      
      if (coordinates.value) {
          const [lat, lng] = coordinates.value.split(',').map(c => parseFloat(c));
          if (!isNaN(lat) && !isNaN(lng)) {
              startLat = lat;
              startLng = lng;
          }
      }

      map = L.map('map', { zoomControl: false }).setView([startLat, startLng], 15);
      
      // Add zoom control top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Fix Leaflet marker icon issue in Webpack/Vite
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      marker = L.marker([startLat, startLng], { draggable: true }).addTo(map);

      marker.bindPopup("Geser pin ini ke lokasi laporan").openPopup();

      marker.on('dragend', (event) => {
        const position = marker.getLatLng();
        updateLocation(position.lat, position.lng);
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        updateLocation(e.latlng.lat, e.latlng.lng);
      });
    };

    const updateLocation = async (lat, lng) => {
      coordinates.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      // Simple reverse geocoding simulation or fetch
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        if (data.display_name) {
          address.value = data.display_name;
        }
      } catch (e) {
        console.error("Geocoding error", e);
        address.value = `Lokasi: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }
    };

    const handleUseGPS = () => {
      isUsingGPS.value = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if(map) {
                map.setView([latitude, longitude], 16);
                marker.setLatLng([latitude, longitude]);
            }
            updateLocation(latitude, longitude);
            isUsingGPS.value = false;
          },
          (error) => {
            alert('Gagal mengambil lokasi GPS: ' + error.message);
            isUsingGPS.value = false;
          }
        );
      } else {
        alert('Browser Anda tidak mendukung Geolocation.');
        isUsingGPS.value = false;
      }
    };

    const handleNext = () => {
      if (address.value) {
        reportStore.setLocation(coordinates.value, address.value);
        router.push('/report/step3');
      }
    };

    return {
      address,
      coordinates,
      isUsingGPS,
      handleNext,
      handleUseGPS,
      isLoggedIn,
      handleLogout
    };
  }
};
</script>

<style scoped>
#map {
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
