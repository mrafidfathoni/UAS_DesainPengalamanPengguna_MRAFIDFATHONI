<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
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
            <router-link to="/" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Home
            </router-link>
            <router-link to="/report/step1" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Lapor
            </router-link>
            <router-link to="/dashboard" class="text-[#007BFF] font-medium border-b-2 border-[#007BFF] pb-1 transition-colors">
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

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- User Greeting -->
      <div class="bg-gradient-to-r from-[#007BFF] to-[#0069D9] rounded-2xl p-8 mb-8 text-white shadow-blue">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span class="material-icons text-4xl">account_circle</span>
          </div>
          <div>
            <h2 class="text-2xl font-semibold mb-1">Halo, {{ userName }}! 👋</h2>
            <p class="text-white/80">Terima kasih atas kontribusi Anda untuk kota yang lebih baik</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div class="text-3xl font-bold mb-1">{{ stats.total }}</div>
            <div class="text-sm text-white/80">Total Laporan</div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div class="text-3xl font-bold mb-1">{{ stats.selesai }}</div>
            <div class="text-sm text-white/80">Selesai</div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div class="text-3xl font-bold mb-1">{{ stats.diproses }}</div>
            <div class="text-sm text-white/80">Diproses</div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div class="text-3xl font-bold mb-1">{{ stats.menunggu }}</div>
            <div class="text-sm text-white/80">Menunggu</div>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Cari ID Laporan</label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                v-model="searchId"
                type="text"
                placeholder="LAP-2025-XXXX"
                class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filterStatus"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
            >
              <option value="semua">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reports Table - Desktop -->
      <div class="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID Laporan</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lokasi</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Progres</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggapan</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="report in filteredReports" :key="report.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <span class="font-medium text-[#007BFF]">{{ report.id }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ report.date }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span class="material-icons text-gray-400 text-sm">
                    {{ getCategoryIcon(report.category) }}
                  </span>
                  <span class="text-sm text-gray-900">{{ report.category }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{{ report.location }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusStyle(report.status)"
                >
                  <span class="material-icons text-sm">{{ getStatusIcon(report.status) }}</span>
                  {{ report.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    class="h-full"
                    :style="{ width: report.progress + '%' }"
                    :class="getProgressBarClass(report.progress)"
                  ></div>
                </div>
                <span class="text-xs text-gray-500 mt-1">{{ report.progress }}%</span>
              </td>
              <td class="px-6 py-4 max-w-xs">
                <p v-if="report.feedback" class="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100 italic">"{{ report.feedback }}"</p>
                <span v-else class="text-gray-400 text-sm">-</span>
              </td>
              <td class="px-6 py-4">
                <button 
                  @click="$router.push(`/report/${report.id}`)"
                  class="text-[#007BFF] hover:text-[#0069D9] transition-colors"
                >
                  <span class="material-icons">visibility</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Reports Cards - Mobile -->
      <div class="md:hidden space-y-4">
        <div v-for="report in filteredReports" :key="report.id" class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="font-semibold text-[#007BFF]">{{ report.id }}</span>
              <p class="text-sm text-gray-500">{{ report.date }}</p>
            </div>
            <span
              class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
              :class="getStatusStyle(report.status)"
            >
              <span class="material-icons text-xs">{{ getStatusIcon(report.status) }}</span>
              {{ report.status }}
            </span>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
              <span class="material-icons text-gray-400 text-sm">
                {{ getCategoryIcon(report.category) }}
              </span>
              <span class="text-gray-900">{{ report.category }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span class="material-icons text-gray-400 text-sm">location_on</span>
              {{ report.location }}
            </div>
          </div>

          <div class="mb-3">
            <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                class="h-full"
                :style="{ width: report.progress + '%' }"
                :class="getProgressBarClass(report.progress)"
              ></div>
            </div>
            <span class="text-xs text-gray-500 mt-1">Progres: {{ report.progress }}%</span>
          </div>

          <div v-if="report.feedback" class="mb-4 bg-green-50 border border-green-100 rounded-xl p-3">
              <div class="flex items-start gap-2">
                  <span class="material-icons text-green-600 text-sm mt-0.5">forum</span>
                  <div>
                      <p class="text-xs font-bold text-green-800">Tanggapan Admin</p>
                      <p class="text-xs text-green-700 mt-1">"{{ report.feedback }}"</p>
                  </div>
              </div>
          </div>

          <button 
            @click="$router.push(`/report/${report.id}`)"
            class="w-full py-2 text-[#007BFF] hover:bg-[#E7F3FF] rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-icons text-sm">visibility</span>
            Lihat Detail
          </button>
        </div>
      </div>

      <!-- FAB - Mobile -->
      <router-link
        to="/report/step1"
        class="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#007BFF] text-white rounded-full shadow-blue flex items-center justify-center hover:bg-[#0069D9] transition-all hover:scale-110"
      >
        <span class="material-icons">add</span>
      </router-link>
    </main>
  </div>
</template>

<script>
import { useReportStore } from '../stores/report';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const reportStore = useReportStore();
    const router = useRouter(); // Initialize router
    const searchId = ref('');
    const sortBy = ref('terbaru');
    const filterStatus = ref('semua');
    const userName = ref('User');
    const isLoggedIn = ref(false);

    onMounted(() => {
      const token = localStorage.getItem('user_token');
      if (!token) {
        router.push('/auth');
        return;
      }
      isLoggedIn.value = !!token;
      userName.value = localStorage.getItem('user_name') || 'User';
      const userId = localStorage.getItem('user_id');
      reportStore.fetchReports(userId);
    });

    const filteredReports = computed(() => {
      let reports = reportStore.userReports.map(r => ({
          ...r,
          progress: r.status === 'Selesai' ? 100 : (r.status === 'Diproses' ? 50 : 0)
      })); // Map progress based on status

      if (searchId.value) {
        reports = reports.filter((report) => report.id.toLowerCase().includes(searchId.value.toLowerCase()));
      }
      if (filterStatus.value !== 'semua') {
        reports = reports.filter((report) => report.status.toLowerCase() === filterStatus.value);
      }
      if (sortBy.value === 'terbaru') {
        reports = reports.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      return reports;
    });

    const stats = computed(() => ({
        total: reportStore.userReports.length,
        selesai: reportStore.userReports.filter((r) => r.status === 'Selesai').length,
        diproses: reportStore.userReports.filter((r) => r.status === 'Diproses').length,
        menunggu: reportStore.userReports.filter((r) => r.status === 'Menunggu').length,
    }));

    const getStatusStyle = (status) => {
      switch (status) {
        case 'Selesai': return 'bg-[#28A745] text-white';
        case 'Diproses': return 'bg-[#007BFF] text-white';
        case 'Menunggu': return 'bg-[#FFC107] text-gray-900';
        case 'Ditolak': return 'bg-[#DC3545] text-white';
        default: return 'bg-gray-300 text-gray-700';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'Selesai': return 'check_circle';
        case 'Diproses': return 'autorenew';
        case 'Menunggu': return 'schedule';
        case 'Ditolak': return 'cancel';
        default: return 'help';
      }
    };
    
    const getCategoryIcon = (category) => {
        if(category.includes('Jalan')) return 'directions_car';
        if(category.includes('Lampu')) return 'lightbulb';
        if(category.includes('Sampah')) return 'delete';
        return 'warning';
    };

    const getProgressBarClass = (progress) => {
      if (progress === 100) return 'bg-[#28A745]';
      if (progress > 0) return 'bg-[#007BFF]';
      return 'bg-gray-300';
    };

    const handleLogout = () => {
        localStorage.clear();
        reportStore.userReports = []; // Clear reports from memory
        router.push('/auth');
    };

    return {
      handleLogout,
      isLoggedIn,
      userName,
      searchId,
      sortBy,
      filterStatus,
      filteredReports,
      stats,
      getStatusStyle,
      getStatusIcon,
      getCategoryIcon,
      getProgressBarClass
    };
  }
};
</script>

<style scoped>
/* Add your custom styles if needed */
</style>
