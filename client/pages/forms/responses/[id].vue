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
              <div v-for="item in stats" :key="item.name"
                class="overflow-hidden rounded-lg bg-gray-200 px-4 py-5 shadow-lg sm:p-6">
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
                <button type="button" @click="downloadCSV"
                  class="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Export
                  as CSV</button>
              </div>
            </div>
            <div class="mt-8 flow-root">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">#
                          </th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            v-for="label in header" :key="label">{{ label }}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(response, index) in responses" :key="index">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index
                          }}</td>
                          <td class="whitespace-normal px-3 py-4 text-sm text-gray-500"
                            v-for="field in header" :key="field">{{ response[field] }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed left-0 w-full h-[10%] flex items-center justify-center" v-else-if="isEncrypted">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col items-center">
              <p class="mb-4">{{ id }} is encrypted</p>
              <div class="flex items-center">
                <input type="file" class="hidden" @change="handleFileUpload" id="fileInput" />
                <label for="fileInput" class="bg-blue-500 p-3 text-sm text-white rounded-md cursor-pointer">Upload
                  decryption key</label>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed left-0 w-full h-[10%] flex items-center justify-center" v-else-if="responses.length == 0">
          <div class="max-w-7xl">
            <div class="flex flex-col items-center">
              <p class="mb-2">{{ id }} is awaiting responses</p>
              <div class="flex items-center">
                <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">No responses yet</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-else>
          <h1>Currently editing</h1>
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Loading data...</h1>
        </div>
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

var isEncrypted = ref(false)
var { $toast } = useNuxtApp()

var header = ref([])

onMounted(async () => {
  const { data } = await axios.get(`https://api.usemaven.app/api/forms/get/${id}`)
  formData.value = data
  fields.value = JSON.parse(formData.value.fields)
  responses.value = JSON.parse(formData.value.responses)
  if (formData.value.encryption != undefined || formData.value.encryption != null) {
    if (formData.value.encryption.length > 1) {
      isEncrypted.value = true
    }
  }
  num_responses = responses.value.length
  console.log("Form is encrypted: " + isEncrypted.value)
  if (!isEncrypted.value && responses.value.length > 0) {
    console.log(responses.value)
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
    var header_first = Object.keys(responses.value[0]);
    console.log('First response has: ' + header_first.length)
    var header_newest = Object.keys(responses.value[responses.value.length - 1]);
    console.log('Newest response has: ' + header_newest.length)
    if (header_first.length > header_newest.length) {
      header.value = header_first
    } else {
      header.value = header_newest
    }
    isLoaded.value = true
  }
})

const decryptionKey = ref(null);
const decryptedData = ref('');

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const pemString = reader.result.toString();
      const pemArray = pemString.split('\n').filter(line => line.trim() !== '');
      const pem = pemArray.slice(1, pemArray.length - 1).join('');
      const pemBuffer = new Uint8Array(atob(pem).split('').map(char => char.charCodeAt(0)));

      let privateKey;
      try {
        privateKey = await window.crypto.subtle.importKey(
          "pkcs8",
          pemBuffer,
          {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
          },
          true,
          ["decrypt"]
        );
      } catch (error) {
        console.error("Failed to import private key:", error);
      }
      var response = responses.value
      var decryptedData = []
      if (response.length == 0) {
        $toast('Form has no responses yet', {
          type: 'error',
          position: 'top-center',
          duration: 5000
        })
        return
      }
      for (let i = 0; i < response.length; i++) {
        var data = await decrypt(response[i], privateKey)
        console.log(data)
        decryptedData.push(data)
      }
      responses.value = decryptedData
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
      var header_first = Object.keys(responses.value[0]);
      var header_newest = Object.keys(responses.value[responses.value.length - 1]);
      if (header_first.length > header_newest.length) {
        header.value = header_first
      } else {
        header.value = header_newest
      }
      isLoaded.value = true
    } catch (Exception) {
      console.error(Exception);
    }
  };
  reader.readAsText(file);
}

async function decrypt(response, privateKey) {
  const ciphertext = atob(response)
  const ciphertextBuffer = new Uint8Array(ciphertext.split('').map(char => char.charCodeAt(0)));
  const iv = ciphertextBuffer.subarray(0, 12);
  const encryptedKey = ciphertextBuffer.subarray(iv.length, iv.length + 256);
  const encryptedData = ciphertextBuffer.subarray(encryptedKey.length);
  const decryptedSymmetricKey = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedKey
  );
  const jwkSymmetricKey = JSON.parse(
    new TextDecoder().decode(decryptedSymmetricKey)
  );
  decryptedData.value = jwkSymmetricKey
  const symmetricKey = await window.crypto.subtle.importKey(
    "jwk",
    jwkSymmetricKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  const encrypted = encryptedData.slice(12);
  const decryptedCiphertext = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    symmetricKey,
    encrypted
  );
  const decrypted = new TextDecoder().decode(decryptedCiphertext);
  decryptedData.value = decrypted;
  return decryptedData.value
}

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
  var header_first = Object.keys(items[0]);
  var header_newest = Object.keys(items[items.length - 1]);
  if (header_first.length > header_newest.length) {
    var header = header_first
  } else {
    var header = header_newest
  }
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