<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- Welcome Banner -->
    <div class="bg-gradient-to-r from-[#007BFF] to-[#0069D9] rounded-2xl p-8 text-white shadow-lg">
      <h1 class="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h1>
      <p class="text-white/80">Berikut adalah ringkasan aktivitas laporan hari ini.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="(stat, idx) in stats" :key="idx" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div class="flex items-start justify-between mb-4">
          <div :class="`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`">
             <span class="material-icons text-white">{{ stat.icon }}</span>
          </div>
          <span :class="`text-sm font-semibold px-2 py-1 rounded-lg ${stat.badgeBg} ${stat.badgeColor}`">
            {{ stat.growth }}
          </span>
        </div>
        <h3 class="text-gray-500 text-sm font-medium mb-1">{{ stat.label }}</h3>
        <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Reports -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-900">Laporan Terbaru</h3>
          <router-link to="/admin/reports" class="text-[#007BFF] text-sm font-medium hover:underline">Lihat Semua</router-link>
        </div>
        
        <div class="space-y-4">
          <div v-for="report in recentReports" :key="report.id" class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div class="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center border mr-4">
              <span class="material-icons text-gray-500 text-sm">{{ getCategoryIcon(report.category) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                 <h4 class="font-semibold text-gray-900 truncate">{{ report.category }}</h4>
                 <span class="text-xs text-gray-400">{{ report.time }}</span>
              </div>
              <p class="text-sm text-gray-500 truncate">{{ report.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Required -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Perlu Tindakan</h3>
        <div class="space-y-4">
           <div class="p-4 bg-[#FFF3CD] border border-[#FFEeba] rounded-xl">
             <div class="flex gap-3">
               <span class="material-icons text-[#856404]">warning</span>
               <div>
                 <h4 class="font-bold text-[#856404] text-sm">Verifikasi Tertunda</h4>
                 <p class="text-[#856404] text-xs mt-1">Cek laporan status Menunggu.</p>
               </div>
             </div>
             <button @click="$router.push('/admin/reports')" class="mt-3 w-full py-2 bg-white text-[#856404] text-xs font-bold rounded-lg hover:bg-opacity-90">
               Tinjau Sekarang
             </button>
           </div>
           
           <div class="p-4 bg-[#E2E3E5] border border-[#D6D8DB] rounded-xl">
             <div class="flex gap-3">
               <span class="material-icons text-[#383D41]">schedule</span>
               <div>
                 <h4 class="font-bold text-[#383D41] text-sm">Tenggat Waktu</h4>
                 <p class="text-[#383D41] text-xs mt-1">Pastikan SLA terpenuhi.</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useReportStore } from '../stores/report';
import { onMounted, computed } from 'vue';

export default {
  setup() {
    const reportStore = useReportStore();

    onMounted(() => {
        reportStore.fetchAllReports();
    });

    const stats = computed(() => {
        const reports = reportStore.adminReports;
        const total = reports.length;
        const selesai = reports.filter(r => r.status === 'Selesai').length;
        const diproses = reports.filter(r => r.status === 'Diproses').length;
        const menunggu = reports.filter(r => r.status === 'Menunggu').length;

        return [
            { label: 'Total Laporan', value: total, icon: 'folder', bg: 'bg-[#007BFF]', growth: 'Live', badgeBg: 'bg-blue-50', badgeColor: 'text-blue-600' },
            { label: 'Selesai', value: selesai, icon: 'check_circle', bg: 'bg-[#28A745]', growth: 'Live', badgeBg: 'bg-green-50', badgeColor: 'text-green-600' },
            { label: 'Diproses', value: diproses, icon: 'loop', bg: 'bg-[#17A2B8]', growth: 'Live', badgeBg: 'bg-cyan-50', badgeColor: 'text-cyan-600' },
            { label: 'Menunggu', value: menunggu, icon: 'schedule', bg: 'bg-[#FFC107]', growth: 'Live', badgeBg: 'bg-yellow-50', badgeColor: 'text-yellow-600' },
        ];
    });

    const recentReports = computed(() => {
        return reportStore.adminReports.slice(0, 5).map(r => ({
            id: r.id,
            category: r.category,
            desc: r.desc || r.description, // Store might use different keys
            time: r.date
        }));
    });
    
    const getCategoryIcon = (cat) => {
        if(!cat) return 'warning';
        if(cat.includes('Jalan')) return 'edit_road';
        if(cat.includes('Lampu')) return 'lightbulb';
        if(cat.includes('Sampah')) return 'delete';
        return 'warning';
    }

    return { stats, recentReports, getCategoryIcon };
  }
};
</script>
