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
            <router-link to="/dashboard" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Riwayat
            </router-link>
            <router-link to="/profile" class="text-[#007BFF] font-medium border-b-2 border-[#007BFF] pb-1 transition-colors">
              Profil
            </router-link>
            <router-link to="/about" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Tentang
            </router-link>

          </nav>

          <!-- Mobile Menu Button -->
          <button class="md:hidden">
            <span class="material-icons text-gray-600">menu</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <!-- Header with Cover -->
        <div class="h-32 bg-gradient-to-r from-[#007BFF] to-[#0069D9] relative">
          <div class="absolute -bottom-16 left-8">
            <div class="relative group">
              <div class="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-[#007BFF] to-[#0069D9] flex items-center justify-center shadow-xl overflow-hidden bg-white">
                <img 
                    v-if="previewImage || profileData.photo" 
                    :src="previewImage || (profileData.photo ? '/' + profileData.photo : null)" 
                    class="w-full h-full object-cover"
                    alt="Profile Photo"
                />
                <span v-else class="material-icons text-white text-6xl">account_circle</span>
              </div>
              
              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden">

              <button
                @click="$refs.fileInput.click()"
                class="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all z-10"
                title="Ganti Foto"
              >
                <span class="material-icons text-[#007BFF] text-sm">camera_alt</span>
              </button>

              <div v-if="profileData.email" class="absolute top-0 right-0 w-6 h-6 bg-[#28A745] rounded-full border-2 border-white flex items-center justify-center z-10">
                <span class="material-icons text-white text-xs">check</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-20 px-8 pb-8">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 v-if="!isEditing" class="text-2xl font-bold text-gray-900 mb-1">{{ profileData.name }}</h2>
              <input 
                v-else 
                v-model="profileData.name" 
                class="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-[#007BFF] outline-none w-full bg-transparent"
                placeholder="Nama Lengkap"
              />
              <p class="text-gray-500">ID: USR-2025-1234</p>
            </div>
            <button
              @click="toggleEdit"
              :class="[
                'px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2',
                { 'bg-[#28A745] text-white hover:bg-[#218838]': isEditing },
                { 'bg-[#007BFF] text-white hover:bg-[#0069D9] hover:shadow-blue': !isEditing }
              ]"
            >
              <span class="material-icons text-sm">{{ isEditing ? 'save' : 'edit' }}</span>
              {{ isEditing ? 'Simpan' : 'Edit Profil' }}
            </button>
          </div>

          <!-- Info Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">email</span>
                <input
                  type="email"
                  v-model="profileData.email"
                  :disabled="!isEditing"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No. HP</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">phone</span>
                <input
                  type="tel"
                  v-model="profileData.phone"
                  :disabled="!isEditing"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-4 text-gray-400">location_on</span>
                <input
                  type="text"
                  v-model="profileData.address"
                  :disabled="!isEditing"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div class="bg-gradient-to-br from-[#E7F3FF] to-blue-50 rounded-2xl p-6">
            <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span class="material-icons">analytics</span> Statistik Laporan
            </h3>
            
            <!-- Completion Ring -->
            <div class="flex items-center gap-8 mb-6">
              <div class="relative w-24 h-24">
                <svg class="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="none"
                    class="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="none"
                    :stroke-dasharray="circleDashArray"
                    :stroke-dashoffset="circleDashOffset"
                    class="text-[#007BFF] transition-all duration-1000"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-xl font-bold text-gray-900">{{ completionRate }}%</span>
                </div>
              </div>
              
              <div class="flex-1">
                <p class="text-sm text-gray-600 mb-2">Tingkat Penyelesaian</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.selesai }} dari {{ stats.total }}</p>
                <p class="text-sm text-gray-500">Laporan terselesaikan</p>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-white rounded-xl">
                <div class="text-2xl font-bold text-[#28A745] mb-1">{{ stats.selesai }}</div>
                <div class="text-xs text-gray-600">Selesai</div>
              </div>
              <div class="text-center p-4 bg-white rounded-xl">
                <div class="text-2xl font-bold text-[#007BFF] mb-1">{{ stats.diproses }}</div>
                <div class="text-xs text-gray-600">Diproses</div>
              </div>
              <div class="text-center p-4 bg-white rounded-xl">
                <div class="text-2xl font-bold text-[#FFC107] mb-1">{{ stats.menunggu }}</div>
                <div class="text-xs text-gray-600">Menunggu</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <router-link to="/dashboard" class="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group">
          <div class="w-14 h-14 bg-[#E7F3FF] rounded-xl flex items-center justify-center group-hover:bg-[#007BFF] transition-colors">
            <span class="material-icons text-[#007BFF] group-hover:text-white text-2xl transition-colors">history</span>
          </div>
          <div class="text-left flex-1">
            <h4 class="font-semibold text-gray-900 mb-1">Lihat Riwayat</h4>
            <p class="text-sm text-gray-500">Pantau semua laporan</p>
          </div>
          <span class="material-icons text-gray-400 group-hover:text-[#007BFF] transition-colors">arrow_forward</span>
        </router-link>

        <router-link to="/report/step1" class="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group">
          <div class="w-14 h-14 bg-[#E7F3FF] rounded-xl flex items-center justify-center group-hover:bg-[#007BFF] transition-colors">
            <span class="material-icons text-[#007BFF] group-hover:text-white text-2xl transition-colors">add_circle</span>
          </div>
          <div class="text-left flex-1">
            <h4 class="font-semibold text-gray-900 mb-1">Lapor Baru</h4>
            <p class="text-sm text-gray-500">Buat laporan baru</p>
          </div>
          <span class="material-icons text-gray-400 group-hover:text-[#007BFF] transition-colors">arrow_forward</span>
        </router-link>
      </div>

      <!-- Logout Button -->
      <!-- Logout Button -->
      <button @click="handleLogout" class="w-full p-4 border-2 border-[#DC3545] text-[#DC3545] rounded-xl font-semibold hover:bg-[#DC3545] hover:text-white transition-all flex items-center justify-center gap-2">
        <span class="material-icons">logout</span>
        Keluar dari Akun
      </button>
    </main>
  </div>
</template>

<script>
import { useReportStore } from '../stores/report';

export default {
  setup() {
    const reportStore = useReportStore();
    return { reportStore };
  },
  data() {
    return {
      isEditing: false,
      selectedFile: null,
      previewImage: null,
      profileData: {
        name: 'User',
        email: 'user@example.com',
        phone: '-',
        address: '-',
        photo: null
      },

    };
  },
  mounted() {
    this.loadProfile();
    const userId = localStorage.getItem('user_id');
    if (userId) {
        this.reportStore.fetchReports(userId);
    }
  },
  computed: {
    stats() {
        const reports = this.reportStore.userReports;
        return {
            total: reports.length,
            selesai: reports.filter(r => r.status === 'Selesai').length,
            diproses: reports.filter(r => r.status === 'Diproses').length,
            menunggu: reports.filter(r => r.status === 'Menunggu').length
        };
    },
    completionRate() {
      if(this.stats.total === 0) return 0;
      return Math.round((this.stats.selesai / this.stats.total) * 100);
    },
    circleDashArray() {
      return 2 * Math.PI * 40;
    },
    circleDashOffset() {
      return 2 * Math.PI * 40 * (1 - this.completionRate / 100);
    }
  },
  methods: {
    loadProfile() {
      // Load all data from localStorage
      this.profileData.name = localStorage.getItem('user_name') || 'User';
      this.profileData.email = localStorage.getItem('user_email') || 'user@example.com';
      this.profileData.phone = localStorage.getItem('user_phone') || '-';
      this.profileData.address = localStorage.getItem('user_address') || '-';
      this.profileData.photo = localStorage.getItem('user_photo') || null;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    async toggleEdit() {
      if (this.isEditing) {
        // Saving
        try {
            const id = localStorage.getItem('user_id');
            const formData = new FormData();
            formData.append('name', this.profileData.name);
            formData.append('email', this.profileData.email);
            formData.append('phone', this.profileData.phone);
            formData.append('address', this.profileData.address);
            if (this.selectedFile) {
                formData.append('photo', this.selectedFile);
            }

            const response = await fetch(`/api/auth/profile/${id}`, {
                method: 'PUT',
                body: formData
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.message);
            
            // Update localStorage
            localStorage.setItem('user_name', this.profileData.name);
            localStorage.setItem('user_email', this.profileData.email);
            localStorage.setItem('user_phone', this.profileData.phone);
            localStorage.setItem('user_address', this.profileData.address);
            if (data.profile_photo) {
                localStorage.setItem('user_photo', data.profile_photo);
                // Update local state is automatic on reload, but here we update directly
                this.profileData.photo = data.profile_photo;
                this.previewImage = null;
                this.selectedFile = null;
            }
            
            alert('Profil berhasil diperbarui!');
        } catch (e) {
            alert('Gagal memperbarui profil: ' + e.message);
            return; // Don't toggle if failed
        }
      }
      this.isEditing = !this.isEditing;
    },
    handleLogout() {
        localStorage.clear();
        this.$router.push('/auth');
    }
  }
};
</script>

<style scoped>
/* You can add your specific styles here */
</style>
