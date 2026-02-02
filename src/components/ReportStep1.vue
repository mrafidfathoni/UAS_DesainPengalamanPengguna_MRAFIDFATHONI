<script setup lang="ts">
const props = defineProps<{
  onNavigate: (page: string) => void;
  onSelectCategory: (category: string) => void;
  currentCategory: string;
}>();

const handleNext = () => {
  if (props.currentCategory) {
    props.onNavigate("report-2");
  }
};
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="props.onNavigate('home')" class="mb-4 hover:underline">
          ← Kembali ke Home
        </button>
        <h1 class="text-xl mb-2">Buat Laporan Baru</h1>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm">Step 1 dari 4</span>
        </div>
        <div class="w-full h-2 bg-gray-200 border border-black">
          <div class="w-1/4 h-full bg-[#007BFF]"></div>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <h2>Pilih Kategori Laporan</h2>

        <!-- Categories -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            @click="props.onSelectCategory('Jalan Rusak')"
            :class="[
              'border-2 border-black p-8 text-center transition-all hover:bg-gray-100',
              props.currentCategory === 'Jalan Rusak' ? 'bg-gray-200' : 'bg-white'
            ]"
          >
            <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
            <div>Jalan Rusak</div>
          </button>

          <button
            @click="props.onSelectCategory('Lampu Mati')"
            :class="[
              'border-2 border-black p-8 text-center transition-all hover:bg-gray-100',
              props.currentCategory === 'Lampu Mati' ? 'bg-gray-200' : 'bg-white'
            ]"
          >
            <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
            <div>Lampu Mati</div>
          </button>

          <button
            @click="props.onSelectCategory('Fasilitas Lain')"
            :class="[
              'border-2 border-black p-8 text-center transition-all hover:bg-gray-100',
              props.currentCategory === 'Fasilitas Lain' ? 'bg-gray-200' : 'bg-white'
            ]"
          >
            <div class="w-16 h-16 bg-gray-300 border border-black mx-auto mb-4"></div>
            <div>Fasilitas Lain</div>
          </button>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-8">
          <button
            @click="props.onNavigate('home')"
            class="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            @click="handleNext"
            :disabled="!props.currentCategory"
            class="px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
