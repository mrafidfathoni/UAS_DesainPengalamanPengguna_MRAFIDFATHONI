<script setup>
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-8">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Laporin Aja!
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Sampaikan laporan Anda dengan mudah dan cepat.
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p class="text-gray-700">Silahkan login atau buat laporan baru.</p>
            <!-- Placeholder key action -->
            <button class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Buat Laporan
            </button>
             <div class="mt-4 text-xs text-gray-400">
                <router-link to="/admin" class="hover:underline">Masuk sebagai Admin</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
