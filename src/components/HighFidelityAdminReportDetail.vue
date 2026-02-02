<template>
  <div class="space-y-6 animate-fade-in-up pb-20">
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
          class="px-4 py-2 rounded-full text-sm font-bold border bg-yellow-50 text-yellow-700 border-yellow-200"
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
               <a :href="getImageUrl(photo)" target="_blank" class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <span class="material-icons text-white">open_in_new</span>
               </a>
            </div>
          </div>
          <div v-else-if="report.photo_path" class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <!-- Fallback for single photo_path -->
               <div class="aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative">
                   <img :src="getImageUrl(report.photo_path)" class="w-full h-full object-cover" />
                   <a :href="getImageUrl(report.photo_path)" target="_blank" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 text-white">
                        <span class="material-icons">open_in_new</span>
                   </a>
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
                <span class="material-icons text-xs">person</span>
                User {{ report.user_id }}
             </div>
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
        
        <!-- Official Response Form -->
        <div class="bg-white rounded-2xl shadow-lg border border-[#007BFF]/20 p-6 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-[#007BFF]"></div>
          <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons text-[#007BFF]">forum</span>
            Tanggapan Resmi/Respon
          </h3>
          
          <div v-if="hasResponded" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <div class="flex items-start gap-3">
              <span class="material-icons text-green-600">check_circle</span>
              <div>
                <p class="text-green-800 font-bold text-sm">Tanggapan Terkirim</p>
                <p class="text-green-700 text-sm mt-1">"{{ responseText }}"</p>
                <p class="text-green-600 text-xs mt-2">Oleh Admin - Baru saja</p>
              </div>
            </div>
          </div>

          <form v-else @submit.prevent="submitResponse">
            <div class="mb-4">
              <textarea
                v-model="responseText"
                rows="4"
                class="w-full p-4 border border-gray-300 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-blue-100 outline-none text-sm resize-none transition-all"
                placeholder="Tulis tanggapan untuk pelapor di sini..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-[#007BFF] text-white rounded-xl font-bold shadow-blue hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span class="material-icons text-sm">send</span>
              Kirim Tanggapan
            </button>
          </form>
        </div>

        <!-- Status Actions -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
           <h3 class="font-bold text-gray-900 mb-4">Update Status</h3>
           <div class="space-y-3">
             <button 
                @click="updateStatus('Diproses')"
                class="w-full py-3 border-2 border-[#17A2B8] text-[#17A2B8] hover:bg-[#17A2B8] hover:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
             >
               <span class="material-icons text-sm">loop</span>
               Proses Laporan
             </button>
             
             <button 
                @click="updateStatus('Selesai')"
                class="w-full py-3 border-2 border-[#28A745] text-[#28A745] hover:bg-[#28A745] hover:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
             >
               <span class="material-icons text-sm">check_circle</span>
               Tandai Selesai
             </button>

             <button 
                @click="updateStatus('Ditolak')"
                class="w-full py-3 border-2 border-[#DC3545] text-[#DC3545] hover:bg-[#DC3545] hover:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
             >
               <span class="material-icons text-sm">cancel</span>
               Tolak Laporan
             </button>
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
    const responseText = ref('');
    const hasResponded = ref(false);
    const logs = ref([]);
    let map = null;

    onMounted(async () => {
        const data = await reportStore.fetchReportById(rawId);
        if(data) {
            report.value = data;
            status.value = data.status || 'Menunggu';
            
            // Check for existing feedback
            if (data.feedback) {
                responseText.value = data.feedback;
                hasResponded.value = true;
                logs.value.unshift({
                    action: 'Tanggapan Admin (Tersimpan)',
                    time: new Date(data.created_at).toLocaleString(), 
                    note: data.feedback
                });
            }

            logs.value.unshift({
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

        map = L.map('map').setView([lat, lng], 15);

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
        // If path is already a full URL, return it
        if (path.startsWith('http')) return path;
        // Backend serves uploads at /uploads
        // path is like "uploads/filename.jpg"
        return `/${path}`;
    };
    
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Rusak';
    };

    const submitResponse = async () => {
      if(!responseText.value) return;
      
      // Update status to 'Diproses' automatically when responding if it's currently 'Menunggu'
      let newStatus = status.value;
      if (status.value === 'Menunggu') {
          newStatus = 'Diproses';
      }

      await updateStatus(newStatus, responseText.value);
      hasResponded.value = true;
    };

    const updateStatus = async (newStatus, feedbackMsg = '') => {
      const success = await reportStore.updateReportStatus(rawId, newStatus, feedbackMsg);
      if(success) {
          status.value = newStatus;
          logs.value.unshift({
            action: `Status: ${newStatus}`,
            time: 'Baru Saja',
            note: feedbackMsg || null
          });
      }
    };

    return {
      report,
      status,
      responseText,
      hasResponded,
      logs,
      submitResponse,
      updateStatus,
      getImageUrl,
      handleImageError
    };
  }
};
</script>

<style scoped>
/* Ensure map container has explicitly set height or uses flex/grid properly */
#map {
    width: 100%;
    height: 100%;
    min-height: 300px;
    z-index: 0;
}
</style>
