<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  onNavigate: (page: string) => void;
}>();

const mode = ref<"login" | "register">("login");
</script>

<template>
  <div class="min-h-screen p-4">
    <div class="max-w-md mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <button @click="props.onNavigate('home')" class="mb-4 hover:underline">
          ← Kembali ke Home
        </button>
        <h1 class="text-xl">
          {{ mode === "login" ? "Masuk" : "Daftar Akun" }}
        </h1>
      </div>

      <!-- Tab Switcher -->
      <div class="flex border-2 border-black mb-6">
        <button
          @click="mode = 'login'"
          :class="[
            'flex-1 p-3 border-r-2 border-black transition-all',
            mode === 'login' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
          ]"
        >
          Masuk
        </button>
        <button
          @click="mode = 'register'"
          :class="[
            'flex-1 p-3 transition-all',
            mode === 'register' ? 'bg-gray-200' : 'bg-white hover:bg-gray-50'
          ]"
        >
          Daftar
        </button>
      </div>

      <!-- Login Form -->
      <div v-if="mode === 'login'" class="border-2 border-black p-6 space-y-6">
        <div class="space-y-2">
          <label class="block">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <div class="space-y-2">
          <label class="block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <button
          @click="props.onNavigate('home')"
          class="w-full px-6 py-3 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
        >
          Masuk
        </button>

        <div class="border-t-2 border-gray-300 pt-4">
          <button class="w-full p-3 border-2 border-black bg-white hover:bg-gray-50">
            Masuk dengan Google
          </button>
        </div>

        <div class="text-center text-sm">
          <a href="#" class="hover:underline">Lupa password?</a>
        </div>
      </div>

      <!-- Register Form -->
      <div v-else class="border-2 border-black p-6 space-y-6">
        <div class="space-y-2">
          <label class="block">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Nama Anda"
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <div class="space-y-2">
          <label class="block">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <div class="space-y-2">
          <label class="block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <div class="space-y-2">
          <label class="block">No. HP</label>
          <input
            type="tel"
            placeholder="0812-xxxx-xxxx"
            class="w-full p-3 border-2 border-black bg-white"
          />
        </div>

        <button
          @click="props.onNavigate('home')"
          class="w-full px-6 py-3 bg-[#007BFF] text-white border-2 border-black transition-all hover:bg-[#0069D9] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
        >
          Daftar
        </button>

        <div class="border-t-2 border-gray-300 pt-4">
          <button class="w-full p-3 border-2 border-black bg-white hover:bg-gray-50">
            Daftar dengan Google
          </button>
        </div>

        <div class="text-center text-sm text-gray-600">
          Dengan mendaftar, Anda menyetujui syarat dan ketentuan
        </div>
      </div>
    </div>
  </div>
</template>
