<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  onNavigate: (page: string) => void;
  onSetDescription: (description: string) => void;
  currentDescription: string;
}>();

const description = ref(props.currentDescription);
const hasPhoto = ref(false);

// kalau parent mengganti currentDescription, ikut update
watch(
  () => props.currentDescription,
  (val) => {
    description.value = val;
  },
);

const handleNext = () => {
  if (description.value) {
    props.onSetDescription(description.value);
    props.onNavigate("report-4");
  }
};
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="props.onNavigate('report-2')" class="mb-4 hover:underline">
          ← Kembali
        </button>
        <h1 class="text-xl mb-2">Buat Laporan Baru</h1>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm">Step 3 dari 4</span>
        </div>
        <div class="w-full h-2 bg-gray-200 border border-black">
          <div class="w-3/4 h-full bg-[#007BFF]"></div>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <h2>Detail Laporan</h2>

        <!-- Description -->
        <div class="space-y-2">
          <label class="block">Deskripsi</label>
          <textarea
            v-model="description"
            placeholder="Jelaskan kondisi fasilitas yang ingin dilaporkan..."
            rows="6"
            class="w-full p-3 border-2 border-black bg-white resize-none"
          />
        </div>

        <!-- Photo Upload -->
        <div class="space-y-2">
          <label class="block">Foto Pendukung</label>
          <div class="border-2 border-black p-8 bg-gray-100">
            <div v-if="hasPhoto" class="space-y-2">
              <div
                class="w-full h-48 bg-gray-300 border border-black flex items-center justify-center"
              >
                <span class="text-gray-600">Preview Foto</span>
              </div>
              <button @click="hasPhoto = false" class="text-sm hover:underline">
                Hapus Foto
              </button>
            </div>

            <button
              v-else
              @click="hasPhoto = true"
              class="w-full p-6 border-2 border-dashed border-black bg-white hover:bg-gray-50"
            >
              Klik untuk Upload Foto
            </button>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-8">
          <button
            @click="props.onNavigate('report-2')"
            class="px-6 py-2 border-2 border-black bg-white hover:bg-gray-100"
          >
            Kembali
          </button>

          <button
            @click="handleNext"
            :disabled="!description"
            class="px-6 py-2 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
