<template>
  <div class="min-h-screen flex items-center justify-center">
    <ClientOnly>
      <WalletMultiButton />
      <template #placeholder>
        Loading
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

import { WalletMultiButton, useWallet } from 'solana-wallets-vue'

import axios from 'axios'

const { publicKey } = useWallet()
const { wallet, program } = useAnchor()

const { $toast } = useNuxtApp()
watch(wallet, async () => {
    if(wallet.value?.publicKey) {
      await axios.post('https://api.usemaven.app/api/auth', { address: wallet.value?.publicKey.toString() })
      $toast('Successfully connected to wallet!')
      navigateTo('/app')
    }
})

</script>