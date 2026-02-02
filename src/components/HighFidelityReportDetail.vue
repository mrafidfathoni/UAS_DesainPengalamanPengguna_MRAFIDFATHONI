<template>
  <div class="space-y-6 animate-fade-in-up pb-20 p-4 max-w-7xl mx-auto">
    <!-- Back & Title -->
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50 transition-colors">
        <span class="material-icons text-gray-600">arrow_back</span>
      </button>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Detail Laporan</h1>
        <p class="text-gray-500 text-sm">ID: {{ $route.params.id }}</p>
      </div>
      <div class="ml-auto">
        <span 
          class="px-4 py-2 rounded-full text-sm font-bold border"
          :class="getStatusStyle(status)"
        >
          {{ status }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Main Content (Left) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Photo Gallery -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons text-[#007BFF]">collections</span>
            Foto Bukti
          </h3>
          <div v-if="report.photos && report.photos.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="(photo, idx) in report.photos" 
              :key="idx"
              class="aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative"
            >
               <img 
                :src="getImageUrl(photo)" 
                alt="Bukti Laporan" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                @error="handleImageError"
               />
               <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <span class="material-icons text-white">zoom_in</span>
               </div>
            </div>
          </div>
          <div v-else-if="report.photo_path" class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <!-- Fallback for single photo_path -->
               <div class="aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative">
                   <img :src="getImageUrl(report.photo_path)" class="w-full h-full object-cover" />
               </div>
          </div>
          <div v-else class="aspect-video bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-400">
               <div class="text-center">
                  <span class="material-icons text-4xl block mb-2">image_not_supported</span>
                  <span class="text-xs">Tidak ada foto</span>
               </div>
          </div>
        </div>

        <!-- Description -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons text-[#007BFF]">description</span>
            Keterangan Pelapor
          </h3>
          <p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
            "{{ report.description }}"
          </p>
          
          <div class="mt-4 flex items-center gap-6 text-sm text-gray-500">
             <div class="flex items-center gap-2">
                <span class="material-icons text-xs">calendar_today</span>
                {{ new Date(report.created_at).toLocaleString() }}
             </div>
             <div class="flex items-center gap-2">
                <span class="material-icons text-xs">category</span>
                {{ report.category }}
             </div>
          </div>
        </div>
        
        <!-- Location -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons text-[#007BFF]">location_on</span>
            Lokasi Kejadian
          </h3>
          <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
             <p class="font-medium text-blue-900">{{ report.address }}</p>
             <p class="text-sm text-blue-700">{{ report.location }}</p>
          </div>
          <div class="aspect-[2/1] bg-gray-200 rounded-xl w-full overflow-hidden border border-gray-200 relative z-0">
             <div id="map" class="w-full h-full z-0"></div>
          </div>
        </div>
      </div>

      <!-- Action Sidebar (Right) -->
      <div class="space-y-6">
        
        <!-- Official Response Area -->
        <div v-if="report.feedback" class="bg-white rounded-2xl shadow-lg border border-[#007BFF]/20 p-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-[#007BFF]"></div>
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons text-[#007BFF]">forum</span>
            Tanggapan Admin
          </h3>
          
          <div class="bg-green-50 border border-green-200 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <span class="material-icons text-green-600">check_circle</span>
              <div>
                <p class="text-green-800 font-bold text-sm">Respon Resmi</p>
                <p class="text-green-700 text-sm mt-1">"{{ report.feedback }}"</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Timeline -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 class="font-bold text-gray-900 mb-4">Riwayat Aktivitas</h3>
           <div class="border-l-2 border-gray-100 ml-3 space-y-6">
              <div v-for="(log, idx) in logs" :key="idx" class="relative pl-6">
                 <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-[#007BFF]"></div>
                 <p class="text-sm font-bold text-gray-900">{{ log.action }}</p>
                 <p class="text-xs text-gray-500 mt-1">{{ log.time }}</p>
                 <p v-if="log.note" class="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">{{ log.note }}</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useReportStore } from '../stores/report';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  setup() {
    const route = useRoute();
    const reportStore = useReportStore();
    const reportId = route.params.id;
    // Handle "LAP-id" format if passed or just raw ID
    const rawId = reportId.replace('LAP-', ''); 
    
    const report = ref({});
    const status = ref('Menunggu');
    const logs = ref([]);
    let map = null;

    onMounted(async () => {
        const data = await reportStore.fetchReportById(rawId);
        if(data) {
            report.value = data;
            status.value = data.status || 'Menunggu';
            
            // Build logs
            logs.value = [];
            
            if (data.feedback) {
                logs.value.unshift({
                    action: 'Tanggapan Admin',
                    time: 'Terkirim',
                    note: data.feedback
                });
            }

            if (data.status === 'Selesai') {
                logs.value.push({ action: 'Laporan Selesai', time: 'Updated', note: null });
            } else if (data.status === 'Diproses') {
                logs.value.push({ action: 'Laporan Diproses', time: 'Updated', note: null });
            }

            logs.value.push({
                action: 'Laporan Masuk',
                time: new Date(data.created_at).toLocaleString(),
                note: null
            });
            
            // Initialize map after data loaded
            if (data.location) {
                nextTick(() => {
                    initMap(data.location);
                });
            }
        }
    });
    
    const initMap = (locationStr) => {
        // Parse "lat, lng" string
        if (!locationStr) return;
        const [lat, lng] = locationStr.split(',').map(coord => parseFloat(coord.trim()));
        
        if (isNaN(lat) || isNaN(lng)) return;

        // Cleanup existing map if re-initializing
        if (map) {
            map.remove();
        }

        map = L.map('map', { scrollWheelZoom: false }).setView([lat, lng], 15);

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

        L.marker([lat, lng]).addTo(map)
            .bindPopup('Lokasi Kejadian')
            .openPopup();
    };

    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `/${path}`;
    };
    
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Rusak';
    };

    const getStatusStyle = (status) => {
      switch (status) {
        case 'Selesai': return 'bg-green-100 text-green-700 border-green-200';
        case 'Diproses': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'Menunggu': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Ditolak': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    return {
      report,
      status,
      logs,
      getImageUrl,
      handleImageError,
      getStatusStyle
    };
  }
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
    min-height: 300px;
    z-index: 0;
}
</style>
