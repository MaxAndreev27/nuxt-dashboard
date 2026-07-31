<template>
  <section class="relative overflow-hidden py-20 md:py-32">
    <div
      aria-hidden="true"
      class="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80"
    >
      <div
        class="aspect-1155/678 w-36.125rem max-w-none -translate-x-1/2 bg-linear-to-tr from-primary-500 to-amber-400 opacity-20 sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>

    <UContainer class="text-center">
      <div class="mb-6 flex justify-center">
        <UBadge
          color="primary"
          variant="soft"
          class="rounded-full px-3 py-1 text-sm font-medium"
        >
          ✨ Nuxt 4 & Nuxt UI v4 Powered
        </UBadge>
      </div>

      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
        Manage data conveniently with <span class="text-primary-500">Nuxt Dashboard</span>
      </h1>

      <p class="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        A ready-to-use dashboard interface for analytics, monitoring, and user management. Quick start without unnecessary configurations.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <UButton
          to="/register"
          size="xl"
          color="primary"
          icon="i-heroicons-rocket-launch"
        >
          Get Started
        </UButton>

        <UButton
          to="https://github.com/MaxAndreev27/nuxt-dashboard"
          target="_blank"
          size="xl"
          color="neutral"
          variant="outline"
          icon="i-simple-icons-github"
        >
          GitHub
        </UButton>
      </div>

      <div class="mt-12 max-w-5xl mx-auto">
        <UCard class="p-2 border border-gray-200 dark:border-gray-800 shadow-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <div class="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
            <span class="text-gray-400 text-sm">Сюди можна вставити скріншот дашборду або візуальний компонент</span>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
