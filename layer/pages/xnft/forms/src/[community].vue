<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="max-h-[80%] w-auto items-center text-center">
      <div class="fixed top-0 left-0 w-full">
        <div class="mt-10">
          <p class="text-center text-xl font-semibold">View open forms</p>
        </div>
      </div>
      <div class="shadow sm:rounded-md fixed top-24 left-0">
        <ul role="list" class="bg-white divide-y divide-gray-200 w-screen max-h-[65vh] overflow-y-auto ">
          <li v-for="form in forms" :key="form">
            <a href="#" class="block hover:bg-gray-200">
              <div class="mx-8 p-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-left font-medium text-indigo-600">{{ form.name }}</p>
                  <div class="flex flex-shrink-0">
                    <p class="rounded-md bg-green-100 text-xs font-semibold text-green-800 p-1">Open</p>
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
      <div>
        <div class="fixed bottom-0 left-0 w-full">
          <div class="bg-gray-100 text-center py-4">
            <p><button @click="this.$router.go(-1)" class="font-light text-sm mb-4">← Go back</button></p>
            <img src="/logo/cover.png" class="inline-block align-middle w-24 h-auto" alt="Maven logo">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

const route = useRoute()
const community = ref(route.params.community)

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
  console.log(forms.value)
})
</script>