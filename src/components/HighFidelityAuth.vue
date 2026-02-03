<template>
  <div class="min-h-screen bg-gradient-to-br from-[#E7F3FF] via-white to-blue-50 flex items-center justify-center p-4">
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#007BFF]/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0069D9]/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md">
      <!-- Back Button -->
      <router-link
        to="/"
        class="absolute -top-12 left-0 flex items-center gap-2 text-gray-600 hover:text-[#007BFF] transition-colors"
      >
        <span class="material-icons">arrow_back</span>
        <span>Kembali ke Home</span>
      </router-link>

      <!-- Main Card -->
      <div class="glass rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/50">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="material-icons text-[#007BFF] text-4xl">location_city</span>
            <span class="text-2xl font-bold text-gray-900">LaporinAja</span>
          </div>
          <p class="text-gray-600">Sistem Pelaporan Fasilitas Publik</p>
        </div>

        <!-- Tab Switcher -->
        <div v-if="mode !== 'forgot'" class="flex bg-gray-100 rounded-2xl p-1 mb-8">
          <button
            @click="setMode('login')"
            :class="{'bg-white text-[#007BFF] shadow-md': mode === 'login', 'text-gray-600 hover:text-gray-900': mode !== 'login'}"
            class="flex-1 py-3 rounded-xl font-semibold transition-all"
          >
            Masuk
          </button>
          <button
            @click="setMode('register')"
            :class="{'bg-white text-[#007BFF] shadow-md': mode === 'register', 'text-gray-600 hover:text-gray-900': mode !== 'register'}"
            class="flex-1 py-3 rounded-xl font-semibold transition-all"
          >
            Daftar
          </button>
        </div>
        <div v-else class="text-center mb-8">
            <h3 class="text-xl font-bold text-gray-800">Reset Password</h3>
            <p class="text-gray-500 text-sm">Masukkan email dan password baru Anda</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name (Register only) -->
          <div v-if="mode === 'register'">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">person</span>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Nama Anda"
                required
                class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">email</span>
              <input
                v-model="formData.email"
                type="email"
                @input="validateEmail"
                placeholder="email@example.com"
                required
                class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
              />
              <span
                v-if="validation.email !== null"
                :class="validation.email ? 'text-[#28A745]' : 'text-[#DC3545]'"
                class="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {{ validation.email ? 'check_circle' : 'cancel' }}
              </span>
            </div>
            <p v-if="validation.email === false" class="mt-1 text-xs text-[#DC3545]">Email tidak valid</p>
          </div>

          <!-- Phone (Register only) -->
          <div v-if="mode === 'register'">
            <label class="block text-sm font-medium text-gray-700 mb-2">No. HP</label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">phone</span>
              <input
                v-model="formData.phone"
                type="tel"
                @input="validatePhone"
                placeholder="0812-xxxx-xxxx"
                required
                class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
              />
              <span
                v-if="validation.phone !== null"
                :class="validation.phone ? 'text-[#28A745]' : 'text-[#DC3545]'"
                class="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {{ validation.phone ? 'check_circle' : 'cancel' }}
              </span>
            </div>
            <p v-if="validation.phone === false" class="mt-1 text-xs text-[#DC3545]">Format: 0812xxxxxxxx</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ mode === 'forgot' ? 'Password Baru' : 'Password' }}
            </label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lock</span>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                @input="validatePassword"
                placeholder="••••••••"
                required
                class="w-full pl-10 pr-20 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span class="material-icons text-sm">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
              <span
                v-if="validation.password !== null"
                :class="validation.password ? 'text-[#28A745]' : 'text-[#DC3545]'"
                class="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {{ validation.password ? 'check_circle' : 'cancel' }}
              </span>
            </div>
            <p v-if="validation.password === false" class="mt-1 text-xs text-[#DC3545]">Minimal 8 karakter</p>
          </div>

          <!-- Confirm Password (Register & Forgot) -->
          <div v-if="mode === 'register' || mode === 'forgot'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lock</span>
              <input
                v-model="formData.confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
              />
              <span
                v-if="formData.confirmPassword && formData.password !== formData.confirmPassword"
                class="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#DC3545] text-sm"
              >
                cancel
              </span>
              <span
                v-if="formData.confirmPassword && formData.password === formData.confirmPassword"
                class="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#28A745] text-sm"
              >
                check_circle
              </span>
            </div>
            <p v-if="formData.confirmPassword && formData.password !== formData.confirmPassword" class="mt-1 text-xs text-[#DC3545]">Password tidak cocok</p>
          </div>

          <!-- Forgot Password (Login only) -->
          <div v-if="mode === 'login'" class="text-right">
            <button type="button" @click="setMode('forgot')" class="text-sm text-[#007BFF] hover:underline">
              Lupa password?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            :class="isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#007BFF] text-white hover:bg-[#0069D9] hover:shadow-blue hover:-translate-y-0.5'"
          >
            <span v-if="isLoading" class="material-icons animate-spin">sync</span>
            <span v-else>
              <span class="material-icons">
                {{ mode === 'login' ? 'login' : (mode === 'register' ? 'person_add' : 'lock_reset') }}
              </span>
              {{ mode === 'login' ? 'Masuk' : (mode === 'register' ? 'Daftar' : 'Reset Password') }}
            </span>
          </button>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 text-[#DC3545] px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
            <span class="material-icons text-sm">error</span>
            {{ errorMessage }}
          </div>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Atau lanjutkan dengan</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="space-y-3">
          <button
            @click="handleSocialLogin('google')"
            class="w-full py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group"
          >
            <div class="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span class="text-[#4285F4]">G</span>
            </div>
            <span class="text-gray-700 group-hover:text-gray-900">Lanjutkan dengan Google</span>
          </button>

          <button
            @click="handleSocialLogin('facebook')"
            class="w-full py-3 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group"
          >
            <div class="w-6 h-6 bg-[#1877F2] rounded flex items-center justify-center">
              <span class="text-white font-bold text-sm">f</span>
            </div>
            <span class="text-gray-700 group-hover:text-gray-900">Lanjutkan dengan Facebook</span>
          </button>
        </div>

        <!-- Toggle Mode -->
        <div class="mt-6 text-center text-sm text-gray-600">
          <p v-if="mode === 'login'">
            Belum punya akun?{' '}
            <button @click="setMode('register')" class="text-[#007BFF] font-semibold hover:underline">
              Daftar di sini
            </button>
          </p>
          <p v-else-if="mode === 'register'">
            Sudah punya akun?{' '}
            <button @click="setMode('login')" class="text-[#007BFF] font-semibold hover:underline">
              Masuk di sini
            </button>
          </p>
          <p v-else>
            Sudah ingat password?{' '}
            <button @click="setMode('login')" class="text-[#007BFF] font-semibold hover:underline">
              Masuk di sini
            </button>
          </p>
        </div>

        <!-- Terms (Register only) -->
        <p v-if="mode === 'register'" class="mt-6 text-xs text-center text-gray-500">
          Dengan mendaftar, Anda menyetujui{' '}
          <a href="#" class="text-[#007BFF] hover:underline">Syarat & Ketentuan</a> dan{' '}
          <a href="#" class="text-[#007BFF] hover:underline">Kebijakan Privasi</a>
        </p>

        <!-- Admin Login Link -->
        <div class="mt-8 text-center pt-6 border-t border-gray-100">
          <router-link to="/admin/login" class="text-xs text-gray-400 hover:text-[#007BFF] transition-colors flex items-center justify-center gap-1">
            <span class="material-icons text-xs">admin_panel_settings</span>
            Login sebagai Admin
          </router-link>
        </div>
      </div>

      <!-- Footer Note -->
      <p class="mt-6 text-center text-sm text-gray-600">
        <span class="material-icons text-sm align-middle mr-1">security</span>
        Data Anda aman dan terenkripsi
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'login', // 'login' or 'register'
      formData: {
        name: '',
        email: '',
        password: '',
        phone: '',
        confirmPassword: ''
      },
      validation: {
        email: null,
        password: null,
        phone: null,
        confirmPassword: null
      },
      isLoading: false,
      showPassword: false,
      errorMessage: ''
    };
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
      this.errorMessage = '';
    },
    validateEmail() {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
      this.validation.email = this.formData.email.length > 0 ? isValid : null;
    },
    validatePassword() {
      const isValid = this.formData.password.length >= 8;
      this.validation.password = this.formData.password.length > 0 ? isValid : null;
    },
    validatePhone() {
      const isValid = /^08\d{8,11}$/.test(this.formData.phone.replace(/-/g, ''));
      this.validation.phone = this.formData.phone.length > 0 ? isValid : null;
    },
    async handleSubmit() {
      this.isLoading = true;
      this.errorMessage = '';

      const BASE_URL = import.meta.env.VITE_API_URL || '';
      const API_URL = `${BASE_URL}/api/auth`;
      let endpoint = '';
      let payload = {};

      if (this.mode === 'login') {
          endpoint = '/login';
          payload = { email: this.formData.email, password: this.formData.password };
      } else if (this.mode === 'register') {
          endpoint = '/register';
          payload = { 
              name: this.formData.name,
              email: this.formData.email, 
              password: this.formData.password,
              phone: this.formData.phone
          };
      } else if (this.mode === 'forgot') {
          endpoint = '/reset-password';
          payload = {
              email: this.formData.email,
              newPassword: this.formData.password
          };
      }
      
      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Terjadi kesalahan');
        }

        // Success
        if (this.mode === 'login') {
            // Save token if needed, for now just redirect
            localStorage.setItem('user_token', data.token);
            localStorage.setItem('user_id', data.id);
            localStorage.setItem('user_name', data.name);
            localStorage.setItem('user_email', data.email);
            localStorage.setItem('user_phone', data.phone || '');
            localStorage.setItem('user_address', data.address || '');
            this.$router.push('/'); // Go to Home on login
        } else if (this.mode === 'register') {
            // Register success
            alert('Registrasi berhasil! Silakan masuk dengan akun baru Anda.');
            this.setMode('login');
        } else if (this.mode === 'forgot') {
            // Reset success
            alert('Password berhasil diubah! Silakan masuk dengan password baru.');
            this.setMode('login');
        }

      } catch (error) {
        this.errorMessage = error.message;
        // alert(this.errorMessage); // Using inline error message instead
      } finally {
        this.isLoading = false;
      }
    },
    handleSocialLogin(provider) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push('/');
      }, 1000);
    }
  }
};
</script>

<style scoped>
/* Custom Styles */
</style>
