<template>
  <div class="bg-white">
    <main>
      <NavBar />
      <div class="mx-auto w-full max-w-7xl px-6 pt-20 pb-16">
        <div class="mx-auto mt-18 max-w-2xl text-center">
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">{{ formElements.name }}</h1>
        </div>
        <div class="mx-auto mt-8 flow-root max-w-lg">
          <div class="flex items-center justify-center">
            <form class="px-3 pb-6">
              <div v-for="element in formElements.fields" :key="element.id">
                <div v-if="element.type == 'header'">
                  <img :src="element.src">
                </div>
                <div v-else-if="element.type === 'text'" class="mt-3">
                  <label class="block text-sm font-medium text-left text-gray-700">{{ element.label }}</label>
                  <input type="text" class="w-full p-2 border rounded" :placeholder="element.placeholder" :required="element.required" v-model="element.value" />
                </div>
                <div v-else-if="element.type === 'textarea'" class="mt-3">
                  <label class="block text-sm font-medium text-left text-gray-700">{{ element.label }}</label>
                  <textarea class="w-full p-2 border rounded" :placeholder="element.placeholder" :required="element.required" v-model="element.value"></textarea>
                </div>
                <div v-else-if="element.type === 'select'" class="mt-3">
                  <label class="block text-sm font-medium text-left text-gray-700">{{ element.label }}</label>
                  <select class="w-full p-2 border rounded" :required="element.required" v-model="element.value">
                    <option v-for="option in element.options" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </div>
                <div v-else-if="element.type === 'checkbox'" class="mt-3">
                  <div class="flex items-center mt-2">
                    <input type="checkbox" class="mr-2" :required="element.required" v-model="element.value" />
                    <label class="block text-sm font-medium text-left text-gray-700">{{ element.label }}</label>
                  </div>
                </div>
              </div>
              <button @click.prevent="submitForm" class="p-2 bg-blue-500 mt-4 rounded-md text-md text-white font-semibold">Submit form</button>
              <p class="truncate text-xs mt-4 font-light">This form was created by {{ formElements.owner }}</p>
              <p class="text-xs font-light">Maven will not be held liable for the content on this form.</p>
              <p class="text-xs font-light mt-2 underline text-blue-500"><a>Report this form</a></p>
            </form>
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
import axios from 'axios'
import { useToast } from 'vue-toastification';

const route = useRoute()
const toast = useToast()

const form = ref(route.params.form)
console.log(form.value)

const formElements = ref([])
const isLoaded = ref(false)

async function renderForms() {
  const response = await axios.get(`http://localhost/api/forms/get/${form.value}`)
  console.log(response.data)
  const data = response.data
  formElements.value.push({
    owner: data.owner,
    name: data.name,
    fields: data.fields,
  })
  console.log(formElements.value)
}

const submitForm = async () => {
  const address = route.query.user
  const formData = formElements.value["fields"].reduce((acc, field) => {
    return {
      timestamp: Date.now(),
      address: address,
      method: "website",
      ...acc,
      [field.label]: field.value,
    }
  }, {})
  const response = JSON.stringify(formData)
  await axios.post('http://localhost/api/forms/layer/submit', {
    id: form.value,
    response: response
  })
    .then(function (res) {
      console.log(res);
      toast.success('Form submitted successfully!')
    })
}

onBeforeMount(async () => {
  await renderForms()
  if (formElements.value.length > 0) {
    formElements.value = formElements.value[0]
    formElements.value["fields"] = JSON.parse(formElements.value["fields"])
    for (let i = 0; i < formElements.value["fields"].length; i++) {
      formElements.value["fields"][i].value = ""
    }
    isLoaded.value = true
  }
  console.log(formElements.value["fields"])
})
</script>