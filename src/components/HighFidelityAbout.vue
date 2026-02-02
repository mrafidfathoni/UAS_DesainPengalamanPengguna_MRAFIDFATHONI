<template>
  <div class="min-h-screen bg-background">
    <!-- Sticky Header -->
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="flex items-center gap-2">
              <span class="material-icons text-[#007BFF] text-3xl">location_city</span>
              <span class="text-xl font-semibold text-gray-900">LaporinAja</span>
            </div>
          </router-link>

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
            <router-link v-if="isLoggedIn" to="/profile" class="text-gray-600 hover:text-[#007BFF] font-medium transition-colors">
              Profil
            </router-link>
            <router-link to="/about" class="text-[#007BFF] font-medium border-b-2 border-[#007BFF] pb-1 transition-colors">
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

    <!-- Hero Section -->
    <section class="relative h-[500px] overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="heroImage"
          alt="Aerial Smart City"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-[#007BFF]/80 via-[#0069D9]/60 to-black/40"></div>
      </div>
      
      <div class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div class="text-white max-w-3xl animate-fade-in">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            LaporinAja: Kota Pintar, Warga Aktif
          </h1>
          <p class="text-xl text-white/90 mb-6">
            Platform kolaboratif untuk mewujudkan kota yang lebih baik melalui partisipasi aktif masyarakat
          </p>

        </div>
      </div>
    </section>

    <!-- Misi & Visi -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gradient-to-br from-[#E7F3FF] to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div class="w-16 h-16 bg-[#007BFF] rounded-full flex items-center justify-center mb-6">
              <span class="material-icons text-white text-3xl">flag</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <p class="text-gray-700 leading-relaxed">
              Memberikan platform yang mudah dan cepat bagi masyarakat untuk melaporkan kondisi fasilitas publik yang memerlukan perbaikan. Kami berkomitmen untuk meningkatkan kualitas hidup warga melalui teknologi yang inklusif dan responsif.
            </p>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-[#E7F3FF] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div class="w-16 h-16 bg-[#007BFF] rounded-full flex items-center justify-center mb-6">
              <span class="material-icons text-white text-3xl">visibility</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h2>
            <p class="text-gray-700 leading-relaxed">
              Mewujudkan kota pintar dengan partisipasi aktif masyarakat dalam pemeliharaan fasilitas publik. Menciptakan ekosistem digital yang transparan, akuntabel, dan berpusat pada kebutuhan warga untuk Indonesia yang lebih baik.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Teknologi terdepan untuk pengalaman pelaporan yang optimal</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(feature, idx) in features" :key="idx" class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center group">
            <div :class="`w-20 h-20 ${feature.bg} rounded-full flex items-center justify-center mx-auto mb-6 transition-all`">
              <span :class="`material-icons ${feature.color} text-4xl transition-colors`">
                {{ feature.icon }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats with Counter Animation -->
    <section class="py-20 bg-gradient-to-br from-[#007BFF] to-[#0069D9]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Statistik LaporinAja</h2>
          <p class="text-xl text-white/80">Dampak nyata untuk kota yang lebih baik</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div class="text-6xl font-bold text-white mb-2 animate-counter">{{ counts.reports.toLocaleString() }}+</div>
            <div class="text-xl text-white/90">Total Laporan Masuk</div>
            <p class="text-sm text-white/70 mt-2">Sejak tahun 2023</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div class="text-6xl font-bold text-white mb-2 animate-counter">{{ counts.completion }}%</div>
            <div class="text-xl text-white/90">Laporan Selesai</div>
            <p class="text-sm text-white/70 mt-2">Diselesaikan {'<'} 7 hari</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
            <div class="text-6xl font-bold text-white mb-2 animate-counter">{{ counts.users.toLocaleString() }}</div>
            <div class="text-xl text-white/90">Warga Aktif</div>
            <p class="text-sm text-white/70 mt-2">Pengguna terdaftar</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team & Partners -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Team -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Tim Kami</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(member, idx) in team" :key="idx" class="text-center">
              <div class="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#0069D9] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span class="material-icons text-white text-6xl">person</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-gray-600">{{ member.role }}</p>
            </div>
          </div>
        </div>

        <!-- Partners -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Mitra Kami</h2>
          <div class="flex flex-wrap justify-center items-center gap-8">
            <div v-for="(partner, idx) in partners" :key="idx" class="px-8 py-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-[#007BFF] transition-all">
              <span class="text-lg font-semibold text-gray-700">{{ partner }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Siap Membuat Perbedaan?</h2>
        <p class="text-xl text-gray-300 mb-8">Bergabunglah dengan ribuan warga yang peduli untuk kota yang lebih baik</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/report/step1" class="px-8 py-4 bg-[#007BFF] text-white rounded-xl font-semibold hover:bg-[#0069D9] hover:shadow-blue transition-all flex items-center gap-2">
            <span class="material-icons">report_problem</span>
            Mulai Lapor Sekarang
          </router-link>
          <a href="mailto:info@laporinaja.id" class="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all flex items-center gap-2">
            <span class="material-icons">email</span>
            Hubungi Kami
          </a>
        </div>

        <div class="mt-12 pt-12 border-t border-gray-700 space-y-2 text-gray-400">
          <p class="flex items-center justify-center gap-2">
            <span class="material-icons text-sm">email</span>
            info@laporinaja.id
          </p>
          <p class="flex items-center justify-center gap-2">
            <span class="material-icons text-sm">phone</span>
            (021) 1234-5678
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      counts: { reports: 0, completion: 0, users: 0 },
      countersVisible: false,
      heroImage: "https://images.unsplash.com/photo-1753781466416-0109acf7098b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBzbWFydCUyMGNpdHklMjBkcm9uZXxlbnwxfHx8fDE3NjMwMTU5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        { icon: 'speed', title: 'Lapor < 3 Menit', desc: 'Proses pelaporan cepat dan mudah', color: 'text-[#007BFF]', bg: 'bg-[#E7F3FF]' },
        { icon: 'map', title: 'Peta Interaktif', desc: 'Lokasi akurat dengan GPS', color: 'text-[#28A745]', bg: 'bg-[#E8F5E9]' },
        { icon: 'track_changes', title: 'Tracking Real-Time', desc: 'Pantau progres setiap saat', color: 'text-[#FD7E14]', bg: 'bg-[#FFF3E0]' },
        { icon: 'notifications_active', title: 'Notifikasi Instan', desc: 'Update langsung ke perangkat', color: 'text-[#DC3545]', bg: 'bg-[#F8D7DA]' }
      ],
      team: [
        { name: 'Dr. Budi Santoso', role: 'Project Lead' },
        { name: 'Siti Nurhaliza', role: 'Tech Director' },
        { name: 'Ahmad Fauzi', role: 'Community Manager' }
      ],
      partners: ['Pemerintah Kota', 'BUMD Jaya', 'TechStartup ID']
    };
  },
  mounted() {
    const token = localStorage.getItem('user_token');
    this.isLoggedIn = !!token;

    setTimeout(() => {
      this.countersVisible = true;
    }, 500);

    if (this.countersVisible) {
      const targets = { reports: 50000, completion: 85, users: 120000 };
      let currentStep = 0;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        this.counts = {
          reports: Math.floor(targets.reports * progress),
          completion: Math.floor(targets.completion * progress),
          users: Math.floor(targets.users * progress)
        };
        if (currentStep >= steps) {
          clearInterval(timer);
          this.counts = targets;
        }
      }, interval);
    }
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.$router.push('/auth');
    }
  }
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
