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

      <div class="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <UButton
          to="/register"
          size="xl"
          color="primary"
          icon="i-lucide-rocket"
          class="w-full sm:w-auto"
        >
          Get Started
        </UButton>

        <UButton
          to="/heroes"
          size="xl"
          color="secondary"
          variant="soft"
          icon="i-lucide-sparkles"
          class="w-full sm:w-auto"
        >
          Explore Heroes
        </UButton>

        <UButton
          to="https://github.com/MaxAndreev27/nuxt-dashboard"
          target="_blank"
          size="xl"
          color="neutral"
          variant="outline"
          icon="i-simple-icons-github"
          class="w-full sm:w-auto"
        >
          GitHub
        </UButton>
      </div>

      <div class="mt-12 max-w-5xl mx-auto">
        <UCard class="overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur">
          <div class="relative aspect-video overflow-hidden bg-linear-to-br from-primary-500/20 via-amber-400/10 to-slate-900/10 dark:from-primary-500/15 dark:via-amber-400/10 dark:to-slate-950/20">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.25),_transparent_35%)]" />
            <div class="absolute inset-0 flex items-center justify-center p-8">
              <div class="w-full max-w-3xl rounded-2xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-gray-700/70 dark:bg-gray-900/80">
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
                      Dashboard Preview
                    </p>
                    <h3 class="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                      Hero management at a glance
                    </h3>
                  </div>
                  <div class="inline-flex w-fit rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-500">
                    Live UI
                  </div>
                </div>

                <div class="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div class="rounded-xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-800/60">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Active heroes</span>
                      <span class="text-lg font-semibold text-gray-900 dark:text-white">24</span>
                    </div>
                    <div class="mt-4 space-y-3">
                      <div class="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div class="h-2.5 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div class="h-2.5 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gradient-to-br from-primary-500/10 to-amber-400/10 p-4 dark:border-gray-700">
                    <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/15 text-lg font-semibold text-primary-500">
                        H
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900 dark:text-white">
                          Hero Dashboard
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          Fast CRUD workflow
                        </p>
                      </div>
                    </div>
                    <div class="rounded-lg border border-dashed border-primary-500/30 bg-white/70 p-3 text-sm text-gray-600 dark:bg-gray-900/50 dark:text-gray-300">
                      Manage entities, track status, and keep your UI polished.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
