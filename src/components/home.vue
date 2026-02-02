<script setup lang="ts">
const props = defineProps<{
  onNavigate: (page: string) => void;
}>();
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="border-b-2 border-black p-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <!-- Logo -->
          <div class="border-2 border-black px-4 py-2">
            <span>Logo LaporinAja</span>
          </div>

          <!-- Navigation -->
          <nav class="flex gap-4 flex-wrap text-sm">
            <button @click="props.onNavigate('home')" class="hover:underline">Home</button>
            <button @click="props.onNavigate('report-1')" class="hover:underline">Lapor</button>
            <button @click="props.onNavigate('dashboard')" class="hover:underline">Riwayat</button>
            <button @click="props.onNavigate('profile')" class="hover:underline">Profil</button>
            <button @click="props.onNavigate('about')" class="hover:underline">Tentang</button>
            <button @click="props.onNavigate('auth')" class="hover:underline">Masuk/Daftar</button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="space-y-8">
        <!-- Hero Image Placeholder -->
        <div class="w-full h-64 bg-gray-300 border-2 border-black flex items-center justify-center">
          <span class="text-gray-600">Foto Kota</span>
        </div>

        <!-- Hero Text -->
        <div class="text-center space-y-4">
          <h1 class="text-2xl">Selamat Datang di LaporinAja</h1>
          <p>Sistem Pelaporan Fasilitas Publik Kota Pintar</p>
        </div>

        <!-- CTA Button -->
        <div class="flex justify-center">
          <button
            @click="props.onNavigate('report-1')"
            class="px-8 py-3 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
          >
            Lapor Sekarang
          </button>
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div class="border-2 border-black p-8 bg-gray-100 text-center">
            <div class="text-xl mb-2">1</div>
            <div>Pilih Kategori</div>
          </div>
          <div class="border-2 border-black p-8 bg-gray-100 text-center">
            <div class="text-xl mb-2">2</div>
            <div>Tentukan Lokasi</div>
          </div>
          <div class="border-2 border-black p-8 bg-gray-100 text-center">
            <div class="text-xl mb-2">3</div>
            <div>Kirim Laporan</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
