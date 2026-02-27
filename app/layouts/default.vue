<template>
  <div class="flex flex-col min-h-dvh antialiased bg-white-off">
    <CommonAppHeader />

    <main class="grow p-4 md:p-6 max-w-7xl mx-auto w-full flex-1">
      <slot />
    </main>

    <CommonAppFooter />
  </div>
</template>
