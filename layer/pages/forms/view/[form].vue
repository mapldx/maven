<template>
  <div class="bg-white">
    <main>
      <NavBar />
      <div class="mx-auto w-screen pt-8 lg:pt-16 pb-24">
        <div class="mx-auto mt-18 text-center">
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">{{ formElements.name }}</h1>
        </div>
        <div class="mx-auto mt-8 max-w-screen w-screen lg:max-w-lg">
          <form class="pb-6 px-3">
            <div v-for="element in formElements.fields" :key="element.id">
              <div v-if="element.type == 'header'">
                <img :src="element.src">
              </div>
              <div v-else-if="element.type === 'text'" class="mt-3">
                <label class="block text-sm font-medium text-left text-gray-700">{{ element.label }}</label>
                <input type="text" class="w-full p-2 border rounded" :placeholder="element.placeholder"
                  :required="element.required" v-model="element.value" />
              </div>
              <div v-else-if="element.type === 'textarea'" class="mt-3">
                <label class="block text-sm font-medium text-left text-gray-700">{{ element.label }}</label>
                <textarea class="w-full p-2 border rounded" :placeholder="element.placeholder"
                  :required="element.required" v-model="element.value"></textarea>
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
            <button @click.prevent="submitForm"
              class="p-2 bg-blue-500 mt-8 rounded-md text-md text-white font-semibold">Submit form</button>
            <p class="truncate text-xs mt-4 font-light" v-if="encryption_key.length > 1">The creator of this form has
              opted for its responses to be encrypted.</p>
            <p class="truncate text-xs mt-4 font-light">This form was created by {{ formElements.owner }}.</p>
            <p class="text-xs font-light">Maven will not be held liable for the content on this form.</p>
            <p class="text-xs font-light mt-2 underline text-blue-500"><a
                :href="'https://twitter.com/intent/tweet?via=usemaven_&text=Report%3A%20' + form">Report this form</a></p>
          </form>
        </div>
      </div>
    </main>
    <div>
      <div class="lg:fixed bottom-0 left-0 w-full">
        <div class="bg-gray-200 text-center py-4">
          <p class="text-md font-semibold">Create your own Web 3 forms and sites at <a
              href="https://twitter.com/usemaven_" class="text-blue-500 underline">@usemaven_</a></p>
          <!-- <p class="text-xs mt-2">Coming soon as an xNFT on Backpack, on Phantom for iOS/Android, and Saga.</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useWallet } from 'solana-wallets-vue';

const route = useRoute()
const { $toast } = useNuxtApp()

const wallet = useWallet()

const form = ref("form-" + route.params.form)
console.log(form.value)

const formElements = ref([])
const isLoaded = ref(false)
var encryption_key = ref('')

async function renderForms() {
  const response = await axios.get(`https://api.usemaven.app/api/forms/get/${form.value}`)
  console.log(response.data)
  const data = response.data
  formElements.value.push({
    owner: data.owner,
    name: data.name,
    desc: data.description,
    fields: data.fields,
    encryption: data.encryption
  })
  console.log(formElements.value)
  if (formElements.value[0].encryption != undefined || formElements.value[0].encryption != null) {
    encryption_key.value = formElements.value[0].encryption
  }
}

useSeoMeta({
  title: () => `Maven - ${formElements.value.name}`,
  ogTitle: () => `Your form on Maven`,
  description: () => 'Create your own token-gated forms and sites at usemaven.app in 5 minutes or less.',
  ogDescription: () => 'Create your own token-gated forms and sites at usemaven.app in 5 minutes or less.',
  image: () => 'https://usemaven.app/icon.png',
  ogImage: () => 'https://usemaven.app/icon.png',
  twitterCard: () => 'summary',
})

async function encrypt(response) {
  const publicKeyBuffer = new Uint8Array(atob(encryption_key.value).split('').map(char => char.charCodeAt(0)));
  let publicKey;
  try {
    publicKey = await window.crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" },
      },
      true,
      ["encrypt"]
    );
  } catch (error) {
    console.error("Failed to import public key:", error);
  }

  // Generate a random symmetric encryption key
  const symmetricKey = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  // Encrypt the plaintext with the symmetric key
  const encodedPlaintext = new TextEncoder().encode(response);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    symmetricKey,
    encodedPlaintext
  );

  // Export the symmetric key in JWK format
  const jwkSymmetricKey = await window.crypto.subtle.exportKey(
    "jwk",
    symmetricKey
  );

  // Encrypt the JWK symmetric key with the public key
  const encodedSymmetricKey = new TextEncoder().encode(
    JSON.stringify(jwkSymmetricKey)
  );
  const encryptedSymmetricKey = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encodedSymmetricKey
  );

  const ivBuffer = new Uint8Array(iv);
  const message = new Uint8Array(
    ivBuffer.byteLength + encryptedSymmetricKey.byteLength + ciphertext.byteLength
  );
  message.set(ivBuffer, 0);
  message.set(new Uint8Array(encryptedSymmetricKey), ivBuffer.byteLength);
  message.set(new Uint8Array(ciphertext), ivBuffer.byteLength + encryptedSymmetricKey.byteLength);

  // Return the base64-encoded message buffer
  return btoa(String.fromCharCode(...message));
}

const submitForm = async () => {
  if (wallet.publicKey.value == null) {
    $toast.error('Please connect your wallet to submit this form')
    return
  }
  const address = wallet.publicKey.value.toString() || undefined
  var formData = formElements.value["fields"].reduce((acc, field) => {
    return {
      timestamp: Date.now(),
      address: address,
      method: "website",
      ...acc,
      [field.label]: field.value,
    }
  }, {})
  formData = JSON.stringify(formData)
  console.log(formData)
  if (encryption_key.value.length > 0) {
    formData = await encrypt(formData)
  }
  await axios.post('https://api.usemaven.app/api/forms/layer/submit', {
    id: form.value,
    response: formData
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