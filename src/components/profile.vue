<script setup lang="ts">
const props = defineProps<{
  onNavigate: (page: string) => void;
}>();
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="props.onNavigate('home')" class="mb-4 hover:underline">
          ← Kembali ke Home
        </button>
        <h1 class="text-xl">Profil Pengguna</h1>
      </div>

      <!-- Profile Card -->
      <div class="border-2 border-black p-6 space-y-6">
        <!-- Profile Header -->
        <div class="flex items-center gap-6 pb-6 border-b-2 border-gray-300">
          <!-- Profile Photo -->
          <div
            class="w-24 h-24 rounded-full bg-gray-300 border-2 border-black flex items-center justify-center flex-shrink-0"
          >
            <span class="text-sm text-gray-600">Foto</span>
          </div>

          <!-- Name -->
          <div>
            <h2 class="text-xl">Nama Pengguna</h2>
            <p class="text-sm text-gray-600">ID: USR12345</p>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1">
              <div class="text-sm text-gray-600">Email</div>
              <div class="p-2 border-2 border-black bg-gray-100">user@email.com</div>
            </div>

            <div class="space-y-1">
              <div class="text-sm text-gray-600">No. HP</div>
              <div class="p-2 border-2 border-black bg-gray-100">0812-3456-7890</div>
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm text-gray-600">Jumlah Laporan</div>
            <div class="p-2 border-2 border-black bg-gray-100">5 Laporan</div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="border-2 border-black p-4 bg-gray-50">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-xl">2</div>
              <div class="text-sm text-gray-600">Selesai</div>
            </div>
            <div>
              <div class="text-xl">1</div>
              <div class="text-sm text-gray-600">Diproses</div>
            </div>
            <div>
              <div class="text-xl">2</div>
              <div class="text-sm text-gray-600">Lainnya</div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            class="flex-1 px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
          >
            Edit Profil
          </button>

          <button
            @click="props.onNavigate('home')"
            class="flex-1 px-6 py-2 border-2 border-black bg-white hover:bg-gray-100"
          >
            Keluar
          </button>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="mt-6 space-y-2">
        <button
          @click="props.onNavigate('dashboard')"
          class="w-full p-3 border-2 border-black bg-white text-left hover:bg-gray-50"
        >
          → Lihat Riwayat Laporan
        </button>

        <button
          @click="props.onNavigate('report-1')"
          class="w-full p-3 border-2 border-black bg-white text-left hover:bg-gray-50"
        >
          → Buat Laporan Baru
        </button>
      </div>
    </div>
  </div>
</template>
