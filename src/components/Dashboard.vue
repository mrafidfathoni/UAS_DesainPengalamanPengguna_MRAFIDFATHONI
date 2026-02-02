<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  onNavigate: (page: string) => void;
}>();

type Report = {
  id: string;
  date: string;
  category: string;
  location: string;
  status: string;
};

const mockReports: Report[] = [
  { id: "LPR001", date: "2025-11-10", category: "Jalan Rusak", location: "Jl. Sudirman No. 45", status: "Diproses" },
  { id: "LPR002", date: "2025-11-08", category: "Lampu Mati", location: "Jl. Gatot Subroto", status: "Selesai" },
  { id: "LPR003", date: "2025-11-05", category: "Fasilitas Lain", location: "Taman Kota", status: "Menunggu" },
  { id: "LPR004", date: "2025-11-03", category: "Jalan Rusak", location: "Jl. Ahmad Yani", status: "Selesai" },
  { id: "LPR005", date: "2025-11-01", category: "Lampu Mati", location: "Jl. Diponegoro", status: "Ditolak" },
];

const searchId = ref("");
const sortBy = ref<"terbaru" | "terlama" | "status">("terbaru");

const getStatusColor = (status: string) => {
  switch (status) {
    case "Selesai":
      return "bg-gray-400";
    case "Diproses":
      return "bg-[#007BFF]";
    case "Menunggu":
      return "bg-gray-300";
    case "Ditolak":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};

const filteredReports = computed(() => {
  let reports = [...mockReports];

  if (searchId.value.trim()) {
    const q = searchId.value.trim().toLowerCase();
    reports = reports.filter((r) => r.id.toLowerCase().includes(q));
  }

  if (sortBy.value === "terbaru") {
    reports.sort((a, b) => b.date.localeCompare(a.date));
  } else if (sortBy.value === "terlama") {
    reports.sort((a, b) => a.date.localeCompare(b.date));
  } else if (sortBy.value === "status") {
    reports.sort((a, b) => a.status.localeCompare(b.status));
  }

  return reports;
});

// tombol "Terapkan Filter" di React cuma UI, jadi di Vue juga no-op (opsional)
const applyFilter = () => {};
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <button @click="props.onNavigate('home')" class="mb-2 hover:underline">
            ← Kembali ke Home
          </button>
          <h1 class="text-xl">Riwayat Laporan</h1>
        </div>
        <button
          @click="props.onNavigate('report-1')"
          class="px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
        >
          Lapor Baru
        </button>
      </div>

      <!-- Filter Section -->
      <div class="mb-6 border-2 border-black p-4 bg-gray-50">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="block text-sm">Cari ID Laporan</label>
            <input
              type="text"
              v-model="searchId"
              placeholder="Masukkan ID..."
              class="w-full p-2 border-2 border-black bg-white"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm">Urutkan</label>
            <select v-model="sortBy" class="w-full p-2 border-2 border-black bg-white">
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              @click="applyFilter"
              class="w-full px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="border-2 border-black overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-black bg-gray-100">
              <th class="p-3 text-left border-r-2 border-black">ID</th>
              <th class="p-3 text-left border-r-2 border-black">Tanggal</th>
              <th class="p-3 text-left border-r-2 border-black">Kategori</th>
              <th class="p-3 text-left border-r-2 border-black">Lokasi</th>
              <th class="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="report in filteredReports"
              :key="report.id"
              class="border-b border-black hover:bg-gray-50"
            >
              <td class="p-3 border-r-2 border-black">{{ report.id }}</td>
              <td class="p-3 border-r-2 border-black">{{ report.date }}</td>
              <td class="p-3 border-r-2 border-black">{{ report.category }}</td>
              <td class="p-3 border-r-2 border-black">{{ report.location }}</td>
              <td class="p-3">
                <span
                  :class="[
                    'px-3 py-1 text-white border border-black text-sm',
                    getStatusColor(report.status),
                  ]"
                >
                  {{ report.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer Info -->
      <div class="mt-4 text-sm text-gray-600">
        Menampilkan {{ filteredReports.length }} laporan
      </div>
    </div>
  </div>
</template>
