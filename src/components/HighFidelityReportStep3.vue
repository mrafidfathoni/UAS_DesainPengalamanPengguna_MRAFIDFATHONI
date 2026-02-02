<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header -->
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md mb-8">
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
            <router-link to="/report/step1" class="text-[#007BFF] font-medium border-b-2 border-[#007BFF] pb-1 transition-colors">
              Lapor
            </router-link>
            <router-link to="/dashboard" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
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

    <!-- Progress Bar Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between relative px-8">
             <!-- Progress Line Background -->
             <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 -z-0 mx-12">
                <!-- Active Progress Line (66% for Step 3) -->
                <div class="absolute left-0 top-0 bottom-0 bg-[#007BFF] transition-all duration-500" style="width: 66%"></div>
             </div>
             
             <!-- Step 1 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    <span class="material-icons text-sm">check</span>
                </div>
                <span class="text-xs font-medium text-[#007BFF]">Kategori</span>
             </div>
             
             <!-- Step 2 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    <span class="material-icons text-sm">check</span>
                </div>
                <span class="text-xs font-medium text-[#007BFF]">Lokasi</span>
             </div>

             <!-- Step 3 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-bold shadow-blue ring-4 ring-white">
                    3
                </div>
                <span class="text-xs font-medium text-gray-900">Detail</span>
             </div>

             <!-- Step 4 -->
             <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold ring-4 ring-white">
                    4
                </div>
                <span class="text-xs font-medium text-gray-400">Review</span>
             </div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Detail Laporan</h2>
            <p class="text-gray-500">Jelaskan kondisi kerusakan dan tambahkan foto untuk dokumentasi</p>
        </div>

        <!-- Description Input -->
        <div class="mb-8">
            <label class="block text-sm font-bold text-gray-700 mb-2">Deskripsi Kerusakan</label>
            <div class="relative">
            <textarea
                v-model="description"
                @input="handleInput"
                placeholder="Jelaskan kondisi kerusakan secara detail. Misalnya: ukuran lubang, tingkat kerusakan, dampak terhadap warga..."
                rows="6"
                class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 outline-none transition-all resize-none text-gray-700 bg-white"
            />
            <div class="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">{{ description.length }}/500</div>
            </div>
            
            <!-- Character Count Indicator -->
            <div v-if="description.length > 0" class="mt-2 flex items-center gap-3">
            <div class="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                class="h-full transition-all duration-300"
                :class="{
                    'bg-red-500': description.length < 50,
                    'bg-yellow-500': description.length >= 50 && description.length < 100,
                    'bg-green-500': description.length >= 100
                }"
                :style="{ width: `${Math.min((description.length / 100) * 100, 100)}%` }"
                ></div>
            </div>
            <span
                :class="{
                'text-red-500': description.length < 50,
                'text-yellow-600': description.length >= 50 && description.length < 100,
                'text-green-600': description.length >= 100
                }"
                class="text-xs font-bold"
            >
                {{ description.length < 50 ? 'Terlalu pendek' : description.length < 100 ? 'Cukup' : 'Sangat Detail' }}
            </span>
            </div>
        </div>

        <!-- Photo Upload -->
        <div class="mb-8">
            <label class="block text-sm font-bold text-gray-700 mb-2">Foto Pendukung <span class="text-gray-400 font-normal">(Maksimal 3)</span></label>

            <!-- Drag & Drop Zone -->
            <div
            v-if="photos.length < 3"
            @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @dragover.prevent="isDragging = true"
            @drop.prevent="handleDrop"
            @click="handleAddPhoto"
            :class="{
                'border-[#007BFF] bg-blue-50/50': isDragging,
                'border-gray-300 hover:border-[#007BFF] hover:bg-gray-50': !isDragging
            }"
            class="relative border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer group"
            >
            <div class="flex flex-col items-center gap-3">
                <div class="w-14 h-14 bg-blue-50 text-[#007BFF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="material-icons text-2xl">add_photo_alternate</span>
                </div>
                <div>
                    <h3 class="font-bold text-gray-900">Klik atau tarik foto di sini</h3>
                    <p class="text-xs text-gray-500 mt-1">Format JPG, PNG (Max 5MB)</p>
                </div>
            </div>
            <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                class="hidden"
            />
            </div>

            <!-- Photo Previews -->
            <div v-if="photos.length > 0" class="grid grid-cols-3 gap-4 mt-4">
            <div v-for="(photo, idx) in photos" :key="idx" class="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group border border-gray-200">
                <img v-if="photo.preview" :src="photo.preview" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center">
                <span class="material-icons text-gray-400 text-4xl">image</span>
                </div>
                
                <!-- Remove Button Overlay -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                <button
                    @click.stop="handleRemovePhoto(idx)"
                    class="bg-white text-red-500 rounded-full p-2 hover:bg-red-50 hover:scale-110 transition-all shadow-lg"
                    title="Hapus foto"
                >
                    <span class="material-icons text-xl block">delete</span>
                </button>
                </div>
                <div class="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">{{ idx + 1 }}</div>
            </div>
            
            <!-- Small Add Button if < 3 -->
            <div v-if="photos.length < 3">
                <button
                @click="handleAddPhoto"
                class="w-full h-full min-h-[100px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-[#007BFF] hover:bg-gray-50 transition-all gap-2 group"
                >
                <span class="material-icons text-gray-400 group-hover:text-[#007BFF] transition-colors">add_circle</span>
                <span class="text-xs text-gray-500 font-medium">Tambah Foto</span>
                </button>
            </div>
            </div>
        </div>

        <!-- Tips Info -->
        <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8 flex gap-3 items-start">
            <span class="material-icons text-[#007BFF] mt-0.5">lightbulb</span>
            <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">Tips Laporan Efektif</h4>
                <ul class="text-xs text-gray-600 space-y-1 list-disc list-inside">
                    <li>Jelaskan detail fisik kerusakan (lebar, kedalaman, materi)</li>
                    <li>Sebutkan patokan lokasi terdekat (jika ada)</li>
                    <li>Ambil foto dari jarak dekat dan jarak jauh sebagai perbandingan</li>
                </ul>
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center">
            <router-link
              to="/report/step2"
              class="px-8 py-3 rounded-xl font-bold text-[#007BFF] border-2 border-[#007BFF] hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <span class="material-icons text-sm">arrow_back</span>
              Kembali
            </router-link>
            <button
              @click="handleNext"
              :disabled="!description || description.length < 20"
              :class="{
                'bg-[#007BFF] shadow-blue hover:shadow-lg hover:-translate-y-0.5': description && description.length >= 20,
                'bg-gray-300 cursor-not-allowed': !(description && description.length >= 20)
              }"
              class="px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2"
            >
              Lanjut
              <span class="material-icons text-sm">arrow_forward</span>
            </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useReportStore } from '../stores/report';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const reportStore = useReportStore();
    const router = useRouter();
    const description = ref(reportStore.reportData.description || '');
    const photos = ref(reportStore.reportData.items || []);
    const isDragging = ref(false);
    const maxChars = 500;
    const fileInput = ref(null);
    const isLoggedIn = ref(false);

    onMounted(() => {
      const token = localStorage.getItem('user_token');
      isLoggedIn.value = !!token;
    });

    const handleLogout = () => {
        localStorage.clear();
        isLoggedIn.value = false;
        router.push('/auth');
    };

    const handleNext = () => {
      if (description.value && description.value.length >= 20) {
        reportStore.setDetails({
            description: description.value,
            items: photos.value
        });
        router.push('/report/step4');
      }
    };

    const handleInput = () => {
      if (description.value.length > maxChars) {
        description.value = description.value.slice(0, maxChars);
      }
    };

    const handleAddPhoto = () => {
      fileInput.value.click();
    };

    const handleDrop = (event) => {
        isDragging.value = false;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const processFile = (file) => {
        // Validation (optional: check type/size)
        if (!file.type.match('image.*')) {
            alert('Hanya boleh upload foto (JPG/PNG)');
            return;
        }

        photos.value = [ ...photos.value, file ];
        // Add preview property to the file object/proxy if needed or store separate
        // For simplicity, treating keys as file objects with preview attached
        photos.value[photos.value.length - 1].preview = URL.createObjectURL(file);
    };

    const handleRemovePhoto = (idx) => {
      photos.value.splice(idx, 1);
    };

    return {
      description,
      photos,
      isDragging,
      maxChars,
      fileInput,
      handleNext,
      handleInput,
      handleAddPhoto,
      handleDrop,
      handleFileChange,
      handleFileChange,
      handleRemovePhoto,
      isLoggedIn,
      handleLogout
    };
  }
};
</script>

<style scoped>
/* Scoped styles mainly using Tailwind */
</style>
