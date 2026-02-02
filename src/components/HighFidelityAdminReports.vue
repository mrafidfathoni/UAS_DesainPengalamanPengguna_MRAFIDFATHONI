<template>
  <div class="space-y-6 animate-fade-in-up">
    <!-- Header Controls -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-20 z-10 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
          :class="activeFilter === filter.value ? 'bg-[#007BFF] text-white shadow-blue' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <div class="relative w-full md:w-64">
        <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
        <input 
          type="text" 
          placeholder="Cari ID atau Kategori..." 
          class="w-full pl-10 pr-4 py-2 border rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>
    </div>

    <!-- Reports Grid -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID & Waktu</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Pelapor</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr 
              v-for="report in filteredReports" 
              :key="report.id" 
              class="hover:bg-blue-50/50 transition-colors cursor-pointer group"
              @click="$router.push(`/admin/reports/${report.id}`)"
            >
              <td class="px-6 py-4">
                <div class="font-bold text-[#007BFF]">{{ report.id }}</div>
                <div class="text-xs text-gray-500">{{ report.date }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                    {{ report.user.charAt(0) }}
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ report.user }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
                  {{ report.category }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
                  :class="getStatusClasses(report.status)"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDot(report.status)"></span>
                  {{ report.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-gray-400 hover:text-[#007BFF] md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-white rounded-lg shadow-sm">
                  <span class="material-icons">chevron_right</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useReportStore } from '../stores/report';

export default {
  setup() {
    const reportStore = useReportStore();
    const activeFilter = ref('semua');
    
    // Fetch reports on mount
    reportStore.fetchAllReports();

    const filters = [
      { label: 'Semua', value: 'semua' },
      { label: 'Menunggu', value: 'Menunggu' },
      { label: 'Diproses', value: 'Diproses' },
      { label: 'Selesai', value: 'Selesai' },
      { label: 'Ditolak', value: 'Ditolak' }
    ];

    const filteredReports = computed(() => {
      let reports = reportStore.adminReports;
      if (activeFilter.value === 'semua') return reports;
      return reports.filter(r => r.status === activeFilter.value);
    });

    const getStatusClasses = (status) => {
      switch(status) {
        case 'Menunggu': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'Diproses': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Selesai': return 'bg-green-50 text-green-700 border-green-200';
        case 'Ditolak': return 'bg-red-50 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const getStatusDot = (status) => {
      switch(status) {
        case 'Menunggu': return 'bg-yellow-500';
        case 'Diproses': return 'bg-blue-500';
        case 'Selesai': return 'bg-green-500';
        case 'Ditolak': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };

    return {
      activeFilter,
      filters,
      filteredReports,
      getStatusClasses,
      getStatusDot
    };
  }
};
</script>
