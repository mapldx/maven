<template>
  <div class="bg-white">
    <main v-if="!isConnected" class="mx-auto w-full max-w-7xl px-6 pt-36 pb-16">
      <img class="mx-auto h-12 w-auto" src="/logo/cover.png" alt="Your Company" />
      <div class="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
        <p class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">View your forms and sites</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">Your communities on Maven</h1>
      </div>
      <div class="mx-auto mt-8 flow-root max-w-lg">
        <div class="flex items-center justify-center">
          <ClientOnly>
            <WalletMultiButton />
            <template #placeholder>
              Loading
            </template>
          </ClientOnly>
        </div>
      </div>
    </main>
    <main v-else>
      <NavBar />
      <div class="mx-auto w-full max-w-7xl px-6 pt-20 pb-16">
        <div class="mx-auto mt-18 max-w-2xl text-center">
          <p class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">View your forms and sites</p>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">Your communities on Maven</h1>
        </div>
        <div class="mx-auto mt-8 flow-root max-w-lg">
          <div class="flex items-center justify-center">
            <div class="w-full">
              <img :src="user_image" class="rounded-full mx-auto block w-24 h-auto mb-6" alt="User profile picture">
              <div class="flex justify-center space-x-2">
                <select class="px-2 py-1 rounded-md border-gray-400 border" v-model="selectedLink">
                  <option v-for="link in valid" :key="link[1]" :value="link[2]">{{ link[2] }}</option>
                </select>
                <button class="px-2 py-1 bg-blue-500 text-white rounded-md" @click="formIndex(selectedLink)">Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div>
      <div class="fixed bottom-0 left-0 w-full">
        <div class="bg-gray-200 text-center py-4">
          <p class="text-md font-semibold">Create your own Web 3 forms and sites at <a href="https://twitter.com/usemaven_"
              class="text-blue-500 underline">@usemaven_</a></p>
          <!-- <p class="text-xs mt-2">For best experience, use Maven as an xNFT on Backpack, on Phantom for iOS/Android, and Solflare for Saga.</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { BookmarkSquareIcon, BookOpenIcon, QueueListIcon, RssIcon } from '@heroicons/vue/24/solid'

import { ChevronRightIcon } from '@heroicons/vue/20/solid'

import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import { useToast } from "vue-toastification";

import axios from 'axios'

const { publicKey } = useWallet()
const { wallet, program } = useAnchor()

const toast = useToast();
const isConnected = computed(() => !!wallet.value?.publicKey)
const user_image = ref(null)

watch(wallet, async () => {
  if (wallet.value?.publicKey) {
    await axios.post('http://localhost/api/auth', { address: wallet.value?.publicKey.toString() })
    await retrieveUser()
    await fetchCommunities()
    toast('Successfully connected to wallet!')
  }
})

onMounted(async () => {
  await retrieveUser()
  await fetchCommunities()
})

var communities = ref([])
var valid = ref([])
var match = ref([])

async function retrieveUser() {
  if (wallet.value?.publicKey) {
    const address = wallet.value?.publicKey.toString()
    const { data } = await axios.get(`https://cors.mini-schnauzer.workers.dev/?url=https://api-mainnet.magiceden.dev/v2/wallets/${address}/tokens?offset=0&limit=100&listStatus=both`)
    const image = await data.find(item => item.image !== null && item.image !== undefined).image;
    user_image.value = image
  }
}

async function fetchCommunities() {
  const address = wallet.value?.publicKey.toString()
  const { data } = await axios.get(`https://cors.mini-schnauzer.workers.dev/?url=https://api-mainnet.magiceden.dev/v2/wallets/${address}/tokens?offset=0&limit=100&listStatus=both`)
  for (let i = 0; i < data.length; i++) {
    var mintAddress = data[i].mintAddress
    var collection = data[i].collection
    var collectionName = data[i].collectionName
    communities.value.push([mintAddress, collection, collectionName])
  }
  var req = []
  for (let i = 0; i < communities.value.length; i++) {
    for (let j = 0; j < communities.value[i].length - 1; j++) {
      if (communities.value[i][j] != null || communities.value[i][j] != undefined) {
        req.push(communities.value[i][j])
      }
    }
  }
  await axios.post('http://localhost/api/documents/match', { data: req })
    .then((res) => {
      match.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  for (let i = 0; i < communities.value.length; i++) {
    for (let j = 0; j < match.value.length; j++) {
      if (match.value[j] == communities.value[i][1]) {
        valid.value.push(communities.value[i])
      }
    }
  }
}

function formIndex(community) {
  const address = wallet.value?.publicKey.toString()
  if (community == undefined || community == null || community == '') {
    toast.error('Please select a community')
    return
  }
  for (let i = 0; i < valid.value.length; i++) {
    if (valid.value[i][2] == community) {
      community = valid.value[i][1]
    }
  }
  navigateTo(`/connect/forms/u/${community}?user=${address}`)
}


</script>