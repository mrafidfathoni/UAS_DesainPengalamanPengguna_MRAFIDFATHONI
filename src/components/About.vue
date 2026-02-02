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
            <button @click="props.onNavigate('about')" class="underline">Tentang</button>
            <button @click="props.onNavigate('auth')" class="hover:underline">Masuk/Daftar</button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="space-y-8">
        <!-- Page Title -->
        <div class="text-center">
          <h1 class="text-2xl mb-2">Tentang LaporinAja</h1>
          <p class="text-gray-600">Sistem Pelaporan Fasilitas Publik Kota Pintar</p>
        </div>

        <!-- City Image Placeholder -->
        <div class="w-full h-80 bg-gray-300 border-2 border-black flex items-center justify-center">
          <span class="text-gray-600">Gambar Kota</span>
        </div>

        <!-- Misi & Visi -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border-2 border-black p-6 bg-gray-50">
            <h2 class="text-xl mb-4">Misi</h2>
            <p class="text-sm text-gray-600">
              Memberikan platform yang mudah dan cepat bagi masyarakat untuk melaporkan kondisi
              fasilitas publik yang memerlukan perbaikan.
            </p>
          </div>
          <div class="border-2 border-black p-6 bg-gray-50">
            <h2 class="text-xl mb-4">Visi</h2>
            <p class="text-sm text-gray-600">
              Mewujudkan kota pintar dengan partisipasi aktif masyarakat dalam pemeliharaan
              fasilitas publik.
            </p>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="space-y-4">
          <h2 class="text-xl text-center">Fitur Unggulan</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="border-2 border-black p-6 bg-gray-100 text-center">
              <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
              <h3 class="mb-2">Fitur 1</h3>
              <p class="text-sm text-gray-600">Pelaporan Mudah</p>
            </div>
            <div class="border-2 border-black p-6 bg-gray-100 text-center">
              <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
              <h3 class="mb-2">Fitur 2</h3>
              <p class="text-sm text-gray-600">Tracking Real-time</p>
            </div>
            <div class="border-2 border-black p-6 bg-gray-100 text-center">
              <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
              <h3 class="mb-2">Fitur 3</h3>
              <p class="text-sm text-gray-600">Notifikasi Update</p>
            </div>
            <div class="border-2 border-black p-6 bg-gray-100 text-center">
              <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
              <h3 class="mb-2">Fitur 4</h3>
              <p class="text-sm text-gray-600">Riwayat Lengkap</p>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="border-2 border-black p-8 bg-gray-50">
          <h2 class="text-xl text-center mb-6">Statistik LaporinAja</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="text-center">
              <div class="text-4xl mb-2">1,234</div>
              <div class="text-gray-600">Total Laporan Masuk</div>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-2">87%</div>
              <div class="text-gray-600">Laporan Selesai</div>
            </div>
          </div>
        </div>

        <!-- Contact Button -->
        <div class="flex justify-center pt-4">
          <button
            class="px-8 py-3 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
          >
            Hubungi Kami
          </button>
        </div>

        <!-- Additional Info -->
        <div class="border-2 border-black p-6 bg-gray-100 text-center">
          <p class="text-sm text-gray-600">
            Untuk informasi lebih lanjut, silakan hubungi kami melalui email atau telepon
          </p>
          <div class="mt-4 space-y-1">
            <p>Email: info@laporinaja.id</p>
            <p>Telepon: (021) 1234-5678</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
