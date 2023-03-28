<template>
  <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src="/logo/default.png" alt="Your Company" />
            <img class="hidden h-8 w-auto lg:block" src="/logo/default.png" alt="Your Company" />
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
        <ClientOnly>
          <WalletMultiButton />
          <template #placeholder>
            Loading
          </template>
        </ClientOnly>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <ClientOnly>
            <WalletMultiButton />
            <template #placeholder>
              Loading
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800', 'block pl-3 pr-4 py-2 border-l-4 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
            <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
          </div>
          <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">{{ item.name }}</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { WalletMultiButton, useWallet } from 'solana-wallets-vue'

import { DisclosureButton } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'

import {
  Disclosure,
  DisclosurePanel,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const { publicKey } = useWallet()
const { wallet, program } = useAnchor()

const route = useRoute()
const { $toast } = useNuxtApp()

watch(wallet, () => {
    if(!wallet.value?.publicKey) {
      $toast('Successfully disconnected wallet!');
      navigateTo('/')
    }
})

</script>