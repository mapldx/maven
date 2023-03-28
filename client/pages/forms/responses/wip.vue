<template>
  <main>
    <NavBar />
    <div class="py-10 mb-12">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-if="isLoaded">
          <h1>Viewing responses for</h1>
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">{{ formData.name }}</h1>
          <div class="mt-8">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Overview</h3>
            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div v-for="item in stats" :key="item.name" class="overflow-hidden rounded-lg bg-gray-200 px-4 py-5 shadow-lg sm:p-6">
                <dt class="truncate text-sm font-medium text-gray-500">{{ item.name }}</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ item.stat }}</dd>
              </div>
            </dl>
          </div>
          <div class="mt-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900">Responses</h1>
              </div>
              <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button type="button" @click="downloadCSV" class="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Export as CSV</button>
              </div>
            </div>
            <div class="mt-8 flow-root">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">#</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" v-for="label in Object.keys(responses[0])" :key="label">{{ label }}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(response, index) in responses" :key="index">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index }}</td>
                          <td class="whitespace-normal px-3 py-4 text-sm text-gray-500" v-for="field in Object.keys(responses[0])" :key="field">{{ response[field] }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-else>
          <h1>Viewing responses for</h1>
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Loading data...</h1>
        </div>
        <section>
          <TransitionRoot appear :show="isEncryptOpen" as="template">
            <Dialog as="div" @close="closeEncryptModal" class="relative z-10">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
              </TransitionChild>

              <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                  <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95">
                    <DialogPanel
                      class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                        Create encryption keys for {{ formData.name }}
                      </DialogTitle>
                      <div class="text-sm mt-2 mb-2">This encrypts your form's responses so that only you can read them.</div>
                      <div class="text-sm mt-2">
                        <h1 class="mb-1">Read carefully:</h1>
                        <ul>
                          <li class="mb-1">1. By enabling encryption, Maven enters a zero-knowledge state. This means that
                            Maven is unable to see form response data.</li>
                          <li class="mb-1">2. You will need to save the encryption keys in a safe place. If you lose them,
                            you will not be able to decrypt your form response data and Maven cannot recover it for you.
                          </li>
                        </ul>
                      </div>
                      <button :disabled="!agreeToTerms" class="mt-2 bg-blue-500 p-2 text-sm text-white rounded-md disabled:bg-gray-300"
                        @click="createEncryption">Download key</button>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
        </section>
      </header>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios'

const route = useRoute()
var id = route.params.id

var isLoaded = ref(false)
var formData = ref({})

var fields = ref([])
var responses = ref([])

var num_responses = ref(0)
var stats = ref([])

var isEncryptOpen = ref(false)
async function openEncryptModal() {
  isEncryptOpen.value = true
}

onMounted(async () => {
  const { data } = await axios.get(`https://api.usemaven.app/api/forms/get/${id}`)
  formData.value = data
  fields.value = JSON.parse(formData.value.fields)
  responses.value = JSON.parse(formData.value.responses)
  num_responses = responses.value.length
  for (let i = 0; i < responses.value.length; i++) {
    responses.value[i] = JSON.parse(responses.value[i])
  }
  const addresses = responses.value.map(response => response.address);
  const uniqueAddresses = new Set(addresses);
  var response_stat = null
  const timestamp = responses.value[num_responses - 1].timestamp
  const currentTime = Date.now();
  const diff = currentTime - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    response_stat = `${days} day(s) ago`
  } else if (hours > 0) {
    response_stat = `${hours} hour(s) ago`
  } else if (minutes > 0) {
    response_stat = `${minutes} minute(s) ago`
  } else {
    response_stat = `${seconds} second(s) ago`
  }
  stats = [
    { name: 'Number of Responses', stat: num_responses },
    { name: 'Unique Respondents by Address', stat: uniqueAddresses.size },
    { name: 'Most Recent Response', stat: response_stat },
  ]
  for (let i = 0; i < responses.value.length; i++) {
    responses.value[i].timestamp = new Date(responses.value[i].timestamp).toLocaleString()
  }
  isLoaded.value = true
})

async function downloadCSV() {
  const jsonData = { data: responses.value };
  const csvData = convertToCSV(jsonData);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function convertToCSV(jsonData) {
  const items = jsonData.data;
  const replacer = (key, value) => (value === null ? '' : value); 
  const header = Object.keys(items[0]);
  const csv = [
    header.join(','), 
    ...items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    )
  ].join('\r\n');
  return csv;
}

</script>