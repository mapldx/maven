<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="max-h-[80%] w-auto items-center text-center">
      <div v-if="isLoaded">
        <div class="fixed top-0 left-0 w-full">
          <div class="mt-6">
            <p class="text-center text-xl font-semibold">{{ formElements.name }}</p>
            <span v-if="formElements.encryption_key.length > 0" class="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">Responses are encrypted</span>
            <div class="shadow sm:rounded-md fixed top-20 left-0">
              <div class="divide-y divide-gray-200 w-screen max-h-[65vh] overflow-y-auto ">
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
                  <p class="truncate text-xs mt-4 font-light" v-if="formElements.encryption_key.length > 1">The creator of this form has opted for its responses to be encrypted.</p>
                  <p class="truncate text-xs mt-4 font-light">This form was created by {{ formElements.owner }}</p>
                  <p class="text-xs font-light">Maven will not be held liable for the content on this form.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Loading...</h1>
      </div>
      <div>
        <div class="fixed bottom-0 left-0 w-full">
          <div class="text-center py-4">
            <p><button @click="this.$router.go(-1)" class="font-light text-sm mb-2">← Go back</button></p>
            <img src="/logo/cover.png" class="inline-block align-middle w-24 h-auto" alt="Maven logo">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'

const route = useRoute()
const { $toast } = useNuxtApp()

const form = ref(route.params.form)
console.log(form.value)

const formElements = ref([])
const isLoaded = ref(false)

async function renderForms() {
  const response = await axios.get(`https://api.usemaven.app/api/forms/get/${form.value}`)
  console.log(response.data)
  const data = response.data
  formElements.value.push({
    owner: data.owner,
    name: data.name,
    fields: data.fields,
    encryption_key: data.encryption
  })
  console.log(formElements.value)
}

const submitForm = async () => {
  const { data } = await axios.get(`https://xnft-api-server.xnfts.dev/v1/users?user_id=${route.query.user}`)
  const address = data.user.publicKeys[0].publicKey
  const formData = formElements.value["fields"].reduce((acc, field) => {
    return {
      timestamp: Date.now(),
      address: address,
      method: "xnft_backpack",
      ...acc,
      [field.label]: field.value,
    }
  }, {})
  const response = JSON.stringify(formData)
  await axios.post('https://api.usemaven.app/api/forms/layer/submit', {
    id: form.value,
    response: response
  })
    .then(function (res) {
      console.log(res);
      $toast.success('Form submitted successfully!')
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