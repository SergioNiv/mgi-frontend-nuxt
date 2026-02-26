<template>
  <div class="min-h-screen flex flex-col bg-white-off">
    <CommonAppHeader />

    <main class="grow p-4 md:p-6 max-w-7xl mx-auto w-full">
      <slot />
    </main>

    <CommonAppFooter />
  </div>
</template>
