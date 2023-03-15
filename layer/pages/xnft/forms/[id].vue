<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="max-h-[80%] w-auto items-center text-center">
      <nav v-if="!isLoading" class="space-y-1" aria-label="Sidebar">
        <div class="fixed top-0 left-0 w-full">
          <div class="mt-10">
            <img :src="user.image" class="rounded-full mx-auto block w-24 h-auto mb-6" alt="User profile picture">
            <p class="text-center text-sm font-light">View open forms</p>
            <p class="text-center pb-3 text-xl font-semibold">Your communities on Maven</p>
            <div class="flex justify-center space-x-2">
              <select class="px-2 py-1 rounded-md border-gray-400 border" v-model="selectedLink">
                <option v-for="link in valid" :key="link[1]" :value="link[2]">{{ link[2] }}</option>
              </select>
              <button class="px-2 py-1 bg-blue-500 text-white rounded-md" @click="formIndex(selectedLink)">Go</button>
            </div>
          </div>
        </div>
        <div>
          <div class="fixed bottom-0 left-0 w-full">
            <div class="bg-gray-100 text-center py-4">
              <img src="/logo/cover.png" class="inline-block align-middle w-24 h-auto" alt="Maven logo">
              <p class="text-xs mt-3 font-light">Create your own Web 3 forms and sites at <a href="#" class="text-blue-500 underline">usemaven.io</a></p>
              <p class="text-xs mt-2">Follow us on <a href="#" class="text-blue-500 underline">Twitter</a></p>
            </div>
          </div>
        </div>
      </nav>
      <nav v-else class="space-y-1" aria-label="Sidebar">
        <div class="fixed top-0 left-0 w-full">
          <div class="mt-10">
            <p class="text-xl font-semibold">Loading...</p>
            <div class="flex justify-center h-screen mt-3">
              <div class="border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()

var user = ref({})
var address = ref('')
var communities = ref([])
var match = ref([])
var valid = ref([])
var selectedLink = ref('')
var isLoading = ref(true)

async function fetchUser() {
  const { data } = await axios.get(`https://xnft-api-server.xnfts.dev/v1/users?user_id=${route.params.id}`)
  user.value = data.user
  address.value = data.user.publicKeys[0].publicKey
}

async function fetchCommunities() {
  const { data } = await axios.get(`https://cors.mini-schnauzer.workers.dev/?url=https://api-mainnet.magiceden.dev/v2/wallets/${address.value}/tokens?offset=0&limit=100&listStatus=both`)
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
  if (community == '') {
    toast.error('Please select a community')
    return
  }
  for (let i = 0; i < valid.value.length; i++) {
    if (valid.value[i][2] == community) {
      community = valid.value[i][1]
    }
  }
  navigateTo(`/xnft/forms/u/${community}?user=${route.params.id}`)
}

onMounted(async () => {
  console.log(route.params.id)
  await fetchUser()
  await fetchCommunities()
  isLoading.value = false
})

</script>
