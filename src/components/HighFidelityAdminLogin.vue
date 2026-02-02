<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col md:flex-row">
      <div class="p-8 w-full">
        <div class="text-center mb-8">
           <div class="inline-flex items-center justify-center w-20 h-20 bg-[#007BFF] rounded-3xl mb-6 shadow-lg shadow-blue-500/30">
            <span class="material-icons text-white text-4xl">verified_user</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p class="text-gray-500 text-sm">Masuk untuk mengelola laporan warga</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">person</span>
              <input
                v-model="username"
                type="text"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lock</span>
              <input
                v-model="password"
                type="password"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none transition-all"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          <div v-if="error" class="text-[#DC3545] text-sm text-center bg-red-50 p-2 rounded-lg">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 bg-[#007BFF] text-white rounded-xl font-semibold hover:bg-[#0069D9] transition-all flex items-center justify-center gap-2"
          >
            <span v-if="isLoading" class="material-icons animate-spin text-sm">sync</span>
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
          </button>
        </form>
        

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const isLoading = ref(false);

    const handleLogin = () => {
      isLoading.value = true;
      error.value = '';
      
      // Mock login
      setTimeout(() => {
        if (username.value === 'admin' && password.value === 'admin123') {
          localStorage.setItem('adminAuthenticated', 'true');
          router.push('/admin/dashboard');
        } else {
          error.value = 'Username atau password salah';
          isLoading.value = false;
        }
      }, 1500);
    };

    return {
      username,
      password,
      error,
      isLoading,
      handleLogin
    };
  }
};
</script>
