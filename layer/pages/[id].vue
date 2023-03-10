<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="max-h-[80%] w-auto items-center text-center">
      <nav class="space-y-1" aria-label="Sidebar">
        <div class="fixed top-0 left-0 w-full">
          <div class="mt-10">
            <img :src="user.image" class="rounded-full mx-auto block w-24 h-auto mb-6" alt="User profile picture">
            <p class="text-center pb-2 text-xl font-semibold">Your communities on Maven</p>
            <div class="flex justify-center space-x-2">
              <select class="px-2 py-1 rounded-md border-gray-400 border" v-model="selectedLink">
                <option v-for="link in communities" :key="link.href" :value="link.href">{{ link[2] }}</option>
              </select>
              <button class="px-2 py-1 bg-blue-500 text-white rounded-md" @click="goToLink(selectedLink)">Go</button>
            </div>
          </div>
        </div>
        <div>
          <div class="fixed bottom-0 left-0 w-full">
            <div class="bg-gray-100 text-center py-4">
              <img src="/logo/cover.png" class="inline-block align-middle w-24 h-auto" alt="Maven logo">
              <p class="text-xs mt-3 font-light">Create your own Web 3 forms and sites at <a href="#" class="text-blue-500 underline">usemaven.io</a></p>
              <p class="text-xs mt-2"><a href="#" class="text-blue-500 underline">Twitter</a></p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
const route = useRoute()

var user = ref({})
var address = ref('')
var communities = ref([])

async function fetchUser() {
  const { data } = await axios.get(`https://xnft-api-server.xnfts.dev/v1/users?user_id=${route.params.id}`)
  user.value = data.user
  address.value = data.user.publicKeys[0].publicKey
}

async function fetchCommunities() {
  const { data } = await axios.get(`https://api-mainnet.magiceden.dev/v2/wallets/${address.value}/tokens?offset=0&limit=100&listStatus=both`)
  for (let i = 0; i < data.length; i++) {
    var mintAddress = data[i].mintAddress
    var collection = data[i].collection
    var collectionName = data[i].collectionName
    communities.value.push([mintAddress, collection, collectionName])
  }
  console.log(communities.value)
}

onMounted(async () => {
  console.log(route.params.id)
  await fetchUser()
  await fetchCommunities()
})

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
</script>