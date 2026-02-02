<script setup lang="ts">
type ReportData = {
  category: string
  location: string
  description: string
  address: string
}

const props = defineProps<{
  onNavigate: (page: string) => void
  reportData: ReportData
  onSubmit: () => void
}>()
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="props.onNavigate('report-3')" class="mb-4 hover:underline">
          ← Kembali
        </button>
        <h1 class="text-xl mb-2">Buat Laporan Baru</h1>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm">Step 4 dari 4</span>
        </div>
        <div class="w-full h-2 bg-gray-200 border border-black">
          <div class="w-full h-full bg-[#007BFF]"></div>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <h2>Ringkasan Laporan</h2>

        <!-- Summary Box -->
        <div class="border-2 border-black p-6 space-y-4 bg-gray-50">
          <div class="space-y-1">
            <div class="text-sm text-gray-600">Kategori</div>
            <div>{{ props.reportData.category || "-" }}</div>
          </div>

          <div class="border-t-2 border-gray-300 pt-4 space-y-1">
            <div class="text-sm text-gray-600">Lokasi</div>
            <div>{{ props.reportData.address || "-" }}</div>
          </div>

          <div class="border-t-2 border-gray-300 pt-4 space-y-1">
            <div class="text-sm text-gray-600">Deskripsi</div>
            <div>{{ props.reportData.description || "-" }}</div>
          </div>

          <div class="border-t-2 border-gray-300 pt-4">
            <div class="text-sm text-gray-600 mb-2">Foto Pendukung</div>
            <div
              class="w-full h-32 bg-gray-300 border border-black flex items-center justify-center"
            >
              <span class="text-gray-600">Preview Foto</span>
            </div>
          </div>
        </div>

        <!-- Info Box -->
        <div class="border-2 border-black p-4 bg-gray-100">
          <p class="text-sm">
            Pastikan semua informasi sudah benar sebelum mengirim laporan. Laporan akan diproses
            dalam 1-3 hari kerja.
          </p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-8">
          <button
            @click="props.onNavigate('report-3')"
            class="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100"
          >
            Kembali
          </button>

          <button
            @click="props.onSubmit"
            class="px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
          >
            Kirim Laporan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
