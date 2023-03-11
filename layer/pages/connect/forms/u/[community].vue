<template>
  <div class="bg-white">
    <main>
      <NavBar />
      <div class="mx-auto w-full max-w-7xl px-6 pt-20 pb-16">
        <div class="mx-auto mt-18 max-w-2xl text-center">
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">View open forms</h1>
        </div>
        <div class="mx-auto mt-8 flow-root max-w-lg">
          <div class="flex items-center justify-center">
            <div class="w-full">
              <ul role="list" class="bg-white divide-y divide-gray-200 w-full max-h-[65vh] overflow-y-auto ">
                <li v-for="(form, index) in forms" :key="index">
                  <a :href="`http://localhost:3000/xnft/forms/u/view/${ids[index++]}?user=${user}`"
                    class="block hover:bg-gray-200">
                    <div class="mx-8 p-2">
                      <div class="flex items-center justify-between">
                        <p class="text-md text-left font-medium text-indigo-600">{{ form.name }}</p>
                        <div class="flex flex-shrink-0">
                          <p class="rounded-md bg-green-100 text-sm font-semibold text-green-800 p-1">Open</p>
                        </div>
                      </div>
                      <div class="">
                        <p class="flex items-center text-sm text-gray-500">
                          {{ form.desc }}
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div>
      <div class="fixed bottom-0 left-0 w-full">
        <div class="bg-gray-200 text-center py-4">
          <p class="text-md font-semibold">Create your own Web 3 forms and sites at <a href="#"
              class="text-blue-500 underline">usemaven.io</a></p>
          <p class="text-xs mt-2">For best experience, use Maven as an xNFT on Backpack, on Phantom for iOS/Android, and
            Solflare for Saga.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

const route = useRoute()
const community = ref(route.params.community)
const user = ref(route.query.user)

async function fetchForms() {
  console.log(`http://localhost/api/forms/${community.value}`)
  await axios.get(`http://localhost/api/forms/${community.value}`)
    .then(response => {
      ids.value = response.data
    })
}

var ids = ref([])
var forms = ref([])
async function renderForms() {
  await fetchForms()
  for (let i = 0; i < ids.value.length; i++) {
    const response = await axios.get(`http://localhost/api/forms/get/${ids.value[i]}`)
    console.log(response.data)
    const data = response.data
    forms.value.push({
      name: data.name,
      desc: data.desc,
    })
  }
}

onMounted(async () => {
  await fetchForms()
  await renderForms()
  console.log(route.query.user)
})
</script>