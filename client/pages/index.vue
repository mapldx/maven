<template>
  <div class="relative isolate overflow-hidden bg-white">
    <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
    </svg>
    <div class="mx-auto max-w-screen max-h-screen px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-32 lg:px-24">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <img class="h-11" src="/logo/cover.png" alt="Your Company" />
        <div class="mt-24 sm:mt-32 lg:mt-16">
          <a href="#" class="inline-flex space-x-6">
            <span class="rounded-full bg-red-500/10 px-4 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10">We're a Grizzlython entry!</span>
          </a>
        </div>
        <h1 class="mt-10 text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Create your own microsites for Web 3,<br><span class="text-blue-500">the way you imagine</span></h1>
        <p class="mt-6 lg:text-lg leading-8 text-gray-600 ">Say hello to Web 3's easiest plug-and-play solution for <span class="font-bold underline">token-gated forms and one-page sites.</span>
        Effortlessly create better value-add experiences for your community of holders in minutes.</p>
        <div class="mt-10 flex items-center gap-x-6">
          <ClientOnly>
                <WalletMultiButton />
                <template #placeholder>
                    Loading
                </template>
          </ClientOnly>
        </div>
      </div>
      <div class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img src="/landing.png" alt="" width="2432" height="1442" class="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import { useToast } from "vue-toastification";

import axios from 'axios'

const { publicKey } = useWallet()
const { wallet, program } = useAnchor()

const toast = useToast();
watch(wallet, async () => {
    if(wallet.value?.publicKey) {
      await axios.post('http://localhost/api/auth', { address: wallet.value?.publicKey.toString() })
      toast('Successfully connected to wallet!')
      navigateTo('/app')
    }
})

</script>