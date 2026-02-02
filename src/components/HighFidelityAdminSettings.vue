<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Pengaturan</h2>
      <p class="text-gray-500">Kelola pengaturan sistem dan preferensi admin</p>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-t-2xl border-b border-gray-200">
      <div class="flex items-center px-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-4 font-medium text-sm transition-colors border-b-2"
          :class="activeTab === tab.id ? 'border-[#007BFF] text-[#007BFF]' : 'border-transparent text-gray-500 hover:text-gray-700'"
        >
          <div class="flex items-center gap-2">
            <span class="material-icons text-lg" v-if="tab.icon">{{ tab.icon }}</span>
            {{ tab.label }}
          </div>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-white rounded-b-2xl shadow-sm p-8 min-h-[500px]">
      
      <!-- Profil Admin Tab -->
      <div v-if="activeTab === 'profile'" class="max-w-4xl">
        
        <!-- Profile Header -->
        <div class="flex items-center gap-6 mb-8">
          <div class="w-20 h-20 bg-[#E7F3FF] rounded-full flex items-center justify-center text-[#007BFF] font-bold text-2xl">
            SA
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900">Profil Administrator</h3>
            <p class="text-gray-500">Kelola informasi profil Anda</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nama Lengkap -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
              <input
                v-model="profile.name"
                type="text"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                placeholder="Nama Lengkap"
              />
            </div>
            
            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all bg-gray-50"
                placeholder="Email"
                readonly
              />
            </div>

            <!-- Nomor Telepon -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
              <input
                v-model="profile.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                placeholder="+62"
              />
            </div>

            <!-- Role -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <input
                v-model="profile.role"
                type="text"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                disabled
              />
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-100 pt-6 mt-6">
            <h4 class="font-semibold text-gray-900 mb-4">Ubah Password</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm text-gray-600 mb-2">Password Lama</label>
                <input
                  v-model="password.current"
                  type="password"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                  placeholder="Password Lama"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-2">Password Baru</label>
                <input
                  v-model="password.new"
                  type="password"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                  placeholder="Password Baru"
                />
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              class="px-6 py-3 bg-[#007BFF] text-white font-medium rounded-xl hover:bg-[#0069D9] transition-all flex items-center gap-2 shadow-blue hover:shadow-lg hover:-translate-y-0.5"
            >
              <span class="material-icons text-sm">save</span>
              Simpan Perubahan
            </button>
          </div>
        </form>

      </div>

      <!-- Notifikasi Tab -->
      <div v-if="activeTab === 'notifications'" class="max-w-4xl space-y-8">
        <div>
          <h3 class="text-lg font-bold text-gray-900">Preferensi Notifikasi</h3>
          <p class="text-gray-500">Atur bagaimana Anda ingin menerima notifikasi</p>
        </div>

        <div class="border border-gray-200 rounded-xl p-6">
          <h4 class="font-semibold text-gray-900 mb-4">Email Notifications</h4>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="notifications.email.newReport" class="w-5 h-5 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]">
              <span class="text-gray-700 group-hover:text-gray-900">Laporan Baru Masuk</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="notifications.email.statusChange" class="w-5 h-5 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]">
              <span class="text-gray-700 group-hover:text-gray-900">Perubahan Status Laporan</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="notifications.email.dailySummary" class="w-5 h-5 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]">
              <span class="text-gray-700 group-hover:text-gray-900">Ringkasan Harian</span>
            </label>
          </div>
        </div>

        <div class="border border-gray-200 rounded-xl p-6">
          <h4 class="font-semibold text-gray-900 mb-4">Push Notifications</h4>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="notifications.push.newReport" class="w-5 h-5 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]">
              <span class="text-gray-700 group-hover:text-gray-900">Laporan Baru Masuk</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="notifications.push.statusChange" class="w-5 h-5 rounded border-gray-300 text-[#007BFF] focus:ring-[#007BFF]">
              <span class="text-gray-700 group-hover:text-gray-900">Perubahan Status Laporan</span>
            </label>
          </div>
        </div>

        <div class="pt-4">
          <button class="px-6 py-3 bg-[#007BFF] text-white font-medium rounded-xl hover:bg-[#0069D9] transition-all flex items-center gap-2 shadow-blue">
            <span class="material-icons text-sm">save</span>
            Simpan Pengaturan
          </button>
        </div>
      </div>

      <!-- Sistem Tab -->
      <div v-if="activeTab === 'system'" class="max-w-4xl space-y-8">
        <div>
          <h3 class="text-lg font-bold text-gray-900">Pengaturan Sistem</h3>
          <p class="text-gray-500">Konfigurasi sistem dan aturan bisnis</p>
        </div>

        <div class="space-y-6">
          <!-- Auto Verify -->
          <div class="border border-gray-200 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h4 class="font-semibold text-gray-900">Auto-Verifikasi Laporan</h4>
              <p class="text-sm text-gray-500">Verifikasi otomatis untuk laporan tertentu</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="system.autoVerify" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007BFF]"></div>
            </label>
          </div>

          <!-- Max Photos -->
          <div class="border border-gray-200 rounded-xl p-6">
            <h4 class="font-semibold text-gray-900 mb-2">Maksimal Foto per Laporan</h4>
            <input type="number" v-model="system.maxPhotos" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-[#007BFF] outline-none">
          </div>

          <!-- Retention -->
          <div class="border border-gray-200 rounded-xl p-6">
            <h4 class="font-semibold text-gray-900 mb-2">Masa Simpan Laporan (Hari)</h4>
            <input type="number" v-model="system.retentionDays" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-[#007BFF] outline-none">
          </div>

          <!-- Maintenance Mode -->
          <div class="border border-[#DC3545]/20 bg-[#DC3545]/5 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h4 class="font-semibold text-[#DC3545]">Mode Maintenance</h4>
              <p class="text-sm text-[#DC3545]/80">Sistem akan offline untuk umum</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="system.maintenanceMode" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#DC3545]"></div>
            </label>
          </div>
        </div>

        <div class="pt-4">
          <button class="px-6 py-3 bg-[#007BFF] text-white font-medium rounded-xl hover:bg-[#0069D9] transition-all flex items-center gap-2 shadow-blue">
            <span class="material-icons text-sm">save</span>
            Simpan Pengaturan
          </button>
        </div>
      </div>

      <!-- Kategori Tab -->
      <div v-if="activeTab === 'categories'" class="max-w-4xl space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Kategori Laporan</h3>
            <p class="text-gray-500">Kelola kategori untuk klasifikasi laporan</p>
          </div>
          <button 
            @click="openModal()"
            class="px-4 py-2 bg-[#007BFF] text-white font-medium rounded-xl hover:bg-[#0069D9] transition-all flex items-center gap-2 shadow-blue"
          >
            <span class="material-icons text-sm">add</span>
            Tambah Kategori
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="cat in categories" :key="cat.id" class="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow bg-white">
            <div class="flex items-center gap-4">
              <div :class="`w-12 h-12 rounded-full flex items-center justify-center ${cat.bgClass || 'bg-gray-100'} ${cat.textClass || 'text-gray-600'}`">
                <span class="material-icons">{{ cat.icon }}</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ cat.name }}</h4>
                <p class="text-sm text-gray-500">{{ cat.count || 0 }} laporan</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openModal(cat)" class="px-3 py-1.5 text-sm font-medium text-[#007BFF] hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
              <button @click="deleteCategory(cat.id)" class="px-3 py-1.5 text-sm font-medium text-[#DC3545] hover:bg-red-50 rounded-lg transition-colors">Hapus</button>
            </div>
          </div>
        </div>

        <!-- Modal Add/Edit Category -->
        <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                <h3 class="text-xl font-bold text-gray-900 mb-6">{{ isEditingCategory ? 'Edit Kategori' : 'Tambah Kategori' }}</h3>
                
                <form @submit.prevent="saveCategory" class="space-y-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Kategori</label>
                    <input 
                      v-model="categoryForm.name"
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                      placeholder="Contoh: Jalan Rusak"
                      required
                    >
                  </div>
                  
                  <!-- Icon Picker -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Pilih Ikon</label>
                    <div class="grid grid-cols-6 gap-2 border border-gray-200 p-3 rounded-xl max-h-48 overflow-y-auto custom-scrollbar">
                        <button 
                            type="button"
                            v-for="icon in availableIcons" 
                            :key="icon"
                            @click="categoryForm.icon = icon"
                            class="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                            :class="categoryForm.icon === icon ? 'bg-[#007BFF] text-white shadow-blue' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'"
                            :title="icon"
                        >
                            <span class="material-icons text-xl">{{ icon }}</span>
                        </button>
                    </div>
                  </div>

                  <!-- Color Picker -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Warna Tema</label>
                    <div class="flex flex-wrap gap-3">
                        <button
                            type="button"
                            v-for="(theme, idx) in colorThemes"
                            :key="idx"
                            @click="selectTheme(theme)"
                            class="w-10 h-10 rounded-full flex items-center justify-center transition-all border-2"
                            :class="[
                                theme.bgClass, theme.textClass,
                                categoryForm.bgClass === theme.bgClass ? 'border-[#007BFF] ring-2 ring-[#007BFF]/20 scale-110' : 'border-transparent'
                            ]"
                        >
                             <span v-if="categoryForm.bgClass === theme.bgClass" class="material-icons text-sm">check</span>
                        </button>
                    </div>
                  </div>

                  <div class="pt-4 flex items-center gap-3">
                    <button 
                      type="button" 
                      @click="closeModal"
                      class="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Batal
                    </button>
                    <button 
                      type="submit"
                      class="flex-1 py-3 bg-[#007BFF] text-white font-medium rounded-xl hover:bg-[#0069D9] transition-all shadow-blue"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'HighFidelityAdminSettings',
  setup() {
    const activeTab = ref('profile');
    
    const tabs = [
      { id: 'profile', label: 'Profil Admin', icon: 'person' },
      { id: 'notifications', label: 'Notifikasi', icon: 'notifications' },
      { id: 'system', label: 'Sistem', icon: 'security' },
      { id: 'categories', label: 'Kategori', icon: 'list' }
    ];

    const profile = ref({
      name: 'System Admin',
      email: 'admin@laporinaja.id',
      phone: '+62 812 3456 7890',
      role: 'Super Admin'
    });

    const password = ref({
      current: '',
      new: ''
    });

    const notifications = ref({
        email: { newReport: true, statusChange: true, dailySummary: true },
        push: { newReport: false, statusChange: true }
    });

    const system = ref({
        autoVerify: false,
        maxPhotos: 5,
        retentionDays: 365,
        maintenanceMode: false
    });

    const categories = ref([]);
    const showModal = ref(false);
    const isEditingCategory = ref(false);
    const categoryForm = ref({ id: null, name: '', icon: '', bgClass: '', textClass: '' });

    const availableIcons = ref([
        'edit_road', 'lightbulb', 'delete', 'water_drop', 'waves', 
        'report_problem', 'construction', 'home', 'school', 'local_hospital',
        'forest', 'pets', 'bolt', 'wifi', 'restaurant',
        'directions_bus', 'park', 'warning', 'security', 'error'
    ]);

    const colorThemes = ref([
        { bgClass: 'bg-blue-100', textClass: 'text-blue-600' },
        { bgClass: 'bg-yellow-100', textClass: 'text-yellow-600' },
        { bgClass: 'bg-green-100', textClass: 'text-green-600' },
        { bgClass: 'bg-red-100', textClass: 'text-red-600' },
        { bgClass: 'bg-purple-100', textClass: 'text-purple-600' },
        { bgClass: 'bg-orange-100', textClass: 'text-orange-600' },
        { bgClass: 'bg-gray-100', textClass: 'text-gray-600' },
    ]);

    const selectTheme = (theme) => {
        categoryForm.value.bgClass = theme.bgClass;
        categoryForm.value.textClass = theme.textClass;
    };

    const openModal = (cat = null) => {
        if(cat) {
            isEditingCategory.value = true;
            categoryForm.value = { ...cat };
            if(!categoryForm.value.bgClass) {
                // Backward compatibility default
                selectTheme(colorThemes.value[0]);
            }
        } else {
            isEditingCategory.value = false;
            categoryForm.value = { 
                id: null, 
                name: '', 
                icon: availableIcons.value[0], 
                bgClass: colorThemes.value[0].bgClass,
                textClass: colorThemes.value[0].textClass
            };
        }
        showModal.value = true;
    };

    const closeModal = () => {
        showModal.value = false;
    };

    const saveCategory = () => {
        if(isEditingCategory.value) {
            const index = categories.value.findIndex(c => c.id === categoryForm.value.id);
            if(index !== -1) {
                const existing = categories.value[index];
                categories.value[index] = { 
                    ...existing, 
                    ...categoryForm.value
                };
            }
        } else {
            const newId = categories.value.length > 0 ? Math.max(...categories.value.map(c => c.id)) + 1 : 1;
            categories.value.push({
                id: newId,
                name: categoryForm.value.name,
                icon: categoryForm.value.icon,
                count: 0,
                bgClass: categoryForm.value.bgClass,
                textClass: categoryForm.value.textClass
            });
        }
        localStorage.setItem('admin_categories', JSON.stringify(categories.value));
        closeModal();
    };

    const deleteCategory = (id) => {
        if(confirm('Hapus kategori ini?')) {
            categories.value = categories.value.filter(c => c.id !== id);
            localStorage.setItem('admin_categories', JSON.stringify(categories.value));
        }
    };

    onMounted(() => {
        const saved = localStorage.getItem('admin_categories');
        if(saved) {
            categories.value = JSON.parse(saved);
        } else {
            // Defaults
            categories.value = [
                { id: 1, name: 'Jalan Rusak', count: 342, icon: 'edit_road', bgClass: 'bg-blue-100', textClass: 'text-blue-600' },
                { id: 2, name: 'Lampu Jalan Mati', count: 198, icon: 'lightbulb', bgClass: 'bg-yellow-100', textClass: 'text-yellow-600' },
                { id: 3, name: 'Sampah Menumpuk', count: 256, icon: 'delete', bgClass: 'bg-green-100', textClass: 'text-green-600' },
                { id: 4, name: 'Air PDAM Mati', count: 145, icon: 'water_drop', bgClass: 'bg-red-100', textClass: 'text-red-600' },
                { id: 5, name: 'Drainase Tersumbat', count: 178, icon: 'waves', bgClass: 'bg-gray-100', textClass: 'text-gray-600' },
            ];
            localStorage.setItem('admin_categories', JSON.stringify(categories.value));
        }
    });

    const saveProfile = () => {
      // Simulate save
      alert('Perubahan profil berhasil disimpan!');
      password.value.current = '';
      password.value.new = '';
    };

    return {
      activeTab,
      tabs,
      profile,
      password,
      notifications,
      system,
      categories,
      showModal,
      isEditingCategory,
      categoryForm,
      availableIcons,
      colorThemes,
      selectTheme,
      openModal,
      closeModal,
      saveCategory,
      deleteCategory,
      saveProfile
    };
  }
};
</script>

<style scoped>
/* Custom shadow for the button to match the premium look */
.shadow-blue {
  box-shadow: 0 4px 14px 0 rgba(0, 123, 255, 0.39);
}
</style>
