<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  onNavigate: (page: string) => void;
  onSetLocation: (location: string, address: string) => void;
  currentAddress: string;
}>();

const address = ref(props.currentAddress);

// kalau parent mengganti currentAddress, ikut update
watch(
  () => props.currentAddress,
  (val) => {
    address.value = val;
  },
);

const handleNext = () => {
  if (address.value) {
    props.onSetLocation("GPS Coordinates", address.value);
    props.onNavigate("report-3");
  }
};

const handleUseGPS = () => {
  address.value = "Lokasi dari GPS";
  props.onSetLocation("GPS Coordinates", "Lokasi dari GPS");
};
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="props.onNavigate('report-1')" class="mb-4 hover:underline">
          ← Kembali
        </button>
        <h1 class="text-xl mb-2">Buat Laporan Baru</h1>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm">Step 2 dari 4</span>
        </div>
        <div class="w-full h-2 bg-gray-200 border border-black">
          <div class="w-2/4 h-full bg-[#007BFF]"></div>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <h2>Tentukan Lokasi</h2>

        <!-- Map Placeholder -->
        <div class="w-full h-80 bg-gray-300 border-2 border-black flex items-center justify-center">
          <span class="text-gray-600">Peta</span>
        </div>

        <!-- Address Input -->
        <div class="space-y-2">
          <label class="block">Alamat</label>
          <input
            type="text"
            v-model="address"
            placeholder="Masukkan alamat lengkap..."
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <!-- GPS Button -->
        <button
          @click="handleUseGPS"
          class="w-full p-3 border-2 border-black bg-gray-100 hover:bg-gray-200"
        >
          Gunakan Lokasi GPS Saya
        </button>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-8">
          <button
            @click="props.onNavigate('report-1')"
            class="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100"
          >
            Kembali
          </button>

          <button
            @click="handleNext"
            :disabled="!address"
            class="px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
