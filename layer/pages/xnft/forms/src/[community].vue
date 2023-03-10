<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="max-h-[80%] w-auto items-center text-center">
      <div class="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200 w-screen">
          <li v-for="form in forms" :key="form">
            <a href="#" class="block hover:bg-gray-50">
              <div class="">
                <div class="flex items-center justify-between">
                  <p class="truncate text-sm font-medium text-indigo-600">{{ form.name }}</p>
                  <div class="ml-2 flex flex-shrink-0">
                    <p class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Accepting responses</p>
                  </div>
                </div>
                <div class="">
                  <div class="">
                    <p class="flex items-center text-sm text-gray-500">
                      {{ form.desc }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <p><button @click="this.$router.go(-1)">← Return to home</button></p>
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