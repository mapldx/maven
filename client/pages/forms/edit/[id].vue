<template>
  <div class="min-h-full">
    <NavBar />

    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-if="isLoaded">
          <h1>Currently editing</h1>
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">{{ formData.name }}</h1>
        </div>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-else>
          <h1>Currently editing</h1>
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Loading data...</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-8xl sm:px-6 lg:px-8">
          <main class="mt-8 pb-8">
            <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <!-- Main 3 column grid -->
              <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 bg-gray-200 p-8 rounded-lg">
                <!-- Form preview -->
                <div v-if="formElements.length === 0" class="text-gray-500 text-center">
                  Add elements to the form preview...
                </div>
                <div v-else>
                  <h1 class="mb-4 text-2xl font-bold">{{ formData.name }}</h1>
                  <div v-if="formElements[0].type === 'header'">
                    <div class="mb-4">
                      <img :src="formElements[0].src" alt="Header Photo" class="w-full h-auto">
                    </div>
                  </div>
                  <div v-for="(element, index) in formElements" :key="index">
                    <div v-if="element.type === 'text'">
                      <label class="block mb-2 mt-4 relative">{{ element.label }}
                        <button class="absolute top-0 right-0 bg-yellow-200 text-sm"
                          @click="openModal(element.id, element.type)">Set up</button>
                        <button class="absolute top-0 right-0 mr-14 bg-red-200 text-sm"
                          @click="deleteField(element.id)">Delete</button>
                      </label>
                      <input type="text" class="w-full p-2 border rounded" :placeholder="element.placeholder" />
                    </div>
                    <div v-else-if="element.type === 'textarea'">
                      <label class="block mb-2 mt-4 relative">{{ element.label }}
                        <button class="absolute top-0 right-0 bg-yellow-200 text-sm"
                          @click="openModal(element.id, element.type)">Set up</button>
                        <button class="absolute top-0 right-0 mr-14 bg-red-200 text-sm"
                          @click="deleteField(element.id)">Delete</button>
                      </label>
                      <textarea class="w-full p-2 border rounded" :placeholder="element.placeholder"></textarea>
                    </div>
                    <div v-else-if="element.type === 'file'">
                      <label class="block mb-2 mt-4 relative">{{ element.label }}
                        <button class="absolute top-0 right-0 bg-yellow-200 text-sm"
                          @click="openModal(element.id, element.type)">Set up</button>
                        <button class="absolute top-0 right-0 mr-14 bg-red-200 text-sm"
                          @click="deleteField(element.id)">Delete</button>
                      </label>
                      <input type="file" class="w-full border rounded">
                    </div>
                    <div v-else-if="element.type === 'select'">
                      <label class="block mb-2 mt-4 relative">{{ element.label }}
                        <button class="absolute top-0 right-0 bg-yellow-200 text-sm"
                          @click="openModal(element.id, element.type)">Set up</button>
                        <button class="absolute top-0 right-0 mr-14 bg-red-200 text-sm"
                          @click="deleteField(element.id)">Delete</button>
                      </label>
                      <select class="w-full p-2 border rounded">
                        <option v-for="option in element.options" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                    <div v-else-if="element.type === 'checkbox'">
                      <button class="mr-3 bg-red-200 text-sm" @click="deleteField(element.id)">Delete</button>
                      <button class=" bg-yellow-200 text-sm" @click="openModal(element.id, element.type)">Set up</button>
                      <div class="flex items-center mt-2">
                        <input type="checkbox" class="mr-2" />
                        <label class="block">{{ element.label }}</label>
                      </div>
                    </div>
                  </div>
                  <button class="p-2 bg-blue-500 mt-4 rounded-md text-md text-white font-semibold">Submit form</button>
                </div>
                <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                  <section aria-labelledby="section-1-title">
                    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
                      <div class="p-6">
                        <!-- Pick element column -->
                        <div class="flex-1 px-4">
                          <h2 class="text-lg font-bold mb-4">Step 1</h2>
                          <div class="mb-4">
                            <button @click="openFilePicker" class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                              Upload Header Photo
                            </button>
                          </div>
                          <h2 class="text-lg font-bold mb-4">Step 2</h2>
                          <div class="grid grid-cols-2 gap-4">
                            <div v-for="element in elements" :key="element.name">
                              <button @click="addElement(element)"
                                class="block w-full text-left border rounded p-2 hover:bg-gray-100"
                                v-if="element.label != 'Header Photo'">
                                {{ element.label }}
                              </button>
                            </div>
                          </div>
                          <h2 class="text-lg font-bold mb-4 mt-4">Step 3 (Optional)</h2>
                          <label class="block mb-2 mt-4 relative">Who can access this form?
                            <button class="absolute top-0 right-0 bg-yellow-200 text-sm">e.g.
                              https://magiceden.io/marketplace/lily</button>
                          </label>
                          <input type="text" class="w-full p-2 border rounded"
                            placeholder="Paste a Magic Eden marketplace link to your collection" v-model="targetEl" />
                          <h2 class="text-lg font-bold mb-4 mt-4">Step 4 (Optional)</h2>
                          <button class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600" @click="openEncryptModal">
                            Enable encryption
                          </button>
                          <h2 class="text-lg font-bold mb-4 mt-4">Step 5</h2>
                          <div class="mb-4">
                            <button class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                              @click="openConfirmModal">
                              Create form
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
      <section>
        <TransitionRoot appear :show="isOpen" as="template">
          <Dialog as="div" @close="closeModal" class="relative z-10">
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
                      Configuring field {{ configId }} - {{ configType }}
                    </DialogTitle>
                    <div class="mt-2">
                      <form>
                        <label>Input label (max 40 chars.)</label>
                        <input type="text" class="w-full p-2 border rounded mt-2 mb-2" v-model="inputName" maxlength="40"
                          placeholder="This appears on top of an input" />
                        <div v-if="(configType == 'text' || configType == 'textarea')">
                          <label>Input placeholder (max 40 chars.)</label>
                          <input type="text" class="w-full p-2 border rounded mt-2" v-model="inputPlaceholder"
                            maxlength="40" placeholder="Example of an input placeholder" />
                        </div>
                        <div v-else-if="configType == 'select'" class="mb-5">
                          <h1 class="mt-2">Modify dropdown options</h1>
                          <div v-for="option in formElements[configId].options" :key="option.id"
                            class="flex items-center mt-2 mb-2">
                            <input type="text" class="w-full p-2 border rounded mt-2 mr-2" v-model="option.label"
                              maxlength="40" placeholder="Option label" />
                            <button type="button" class="bg-red-500 text-white text-sm"
                              @click="removeOption(configId, option.id)">Remove</button>
                          </div>
                          <button type="button" class="bg-green-500 text-white text-sm mt-2"
                            @click="addOption(configId)">Add Option</button>
                        </div>
                        <div class="mt-4">
                          <button type="button"
                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            @click="submitConfig(configId)">
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </section>
      <section>
        <TransitionRoot appear :show="isConfirmOpen" as="template">
          <Dialog as="div" @close="closeConfirmModal" class="relative z-10">
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
                      Confirm details - {{ formData.name }}
                    </DialogTitle>
                    <div class="mt-2" v-if="isTokenGated || isEncrypted">
                      <div v-if="isEncrypted">
                        <h1 class="mb-2 text-sm">• Form response encryption is enabled for this form. Ensure that you have downloaded
                        the private key for this form.</h1>
                      </div>
                      <div v-if="isTokenGated">
                        <h1 class="mb-2"><span class="text-sm">• {{ targetEl }} holders are
                            granted access to your form if a match for any of the following are found in their
                            wallet:</span></h1>
                        <ul>
                          <li class="mb-2 text-sm"><span class="bg-yellow-300">First verified creator:</span> {{
                            resolvedTarget.firstVerifiedCreator }}</li>
                          <li class="mb-2 text-sm"><span class="bg-yellow-300">On-chain collection:</span> {{
                            resolvedTarget.verifiedCollectionAddress }}</li>
                        </ul>
                        <div class="text-sm mt-4">
                          <h1>Verify this by:</h1>
                          <ul>
                            <li class="mt-2 mb-2">1. Navigating to your floor NFT on Magic Eden: <a
                                :href='`https://magiceden.io/item-details/${resolvedTarget.mint}`'
                                class="text-blue-500 underline">{{ resolvedTarget.name }}</a></li>
                            <li>2. Ensuring that the metadata match. Example:</li>
                            <img class="mt-3 mb-4" src="https://i.imgur.com/HD3shDj.png">
                            <li>3. Ensuring that the floor NFT is a part of a verified Magic Eden collection (small
                              checkmark on the top-right of your collection name). Example:</li>
                            <img class="mt-3 mb-4" src="https://i.imgur.com/W8bP1In.png">
                          </ul>
                        </div>
                      </div>
                      <button class="mt-2 bg-blue-500 p-2 text-sm text-white rounded-md"
                        @click="createForm">Confirm</button>
                    </div>
                    <div class="mt-2" v-else>
                      <h1 class="mb-2">This form is neither token-gated nor has its form responses encrypted.</h1>
                      <button class="mt-2 bg-blue-500 p-2 text-sm text-white rounded-md"
                        @click="createForm">Confirm</button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </section>
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
                    <div class="mt-2">
                      <label class="inline-flex items-center">
                        <input type="checkbox" class="form-checkbox" v-model="agreeToTerms">
                        <span class="ml-2 text-sm">I understand</span>
                      </label>
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
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'

import fs from 'fs'
import path from 'path'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const route = useRoute()
const formData = ref({})
const isLoaded = ref(false)

const runtimeConfig = useRuntimeConfig()

onBeforeMount(async () => {
  console.log(route.params.id)
  const response = await axios.get('https://api.usemaven.app/api/forms/get/' + route.params.id)
  formData.value = response.data // fields here
  if (formData.value.fields != null) {
    formElements.value = JSON.parse(formData.value.fields)
    if (formData.value.encryption != null) {
      isEncrypted.value = true
    }
  }
  isLoaded.value = true
  console.log(formData.value)
})

const isOpen = ref(false)
var configId = ref('')
var configType = ref('')

const isConfirmOpen = ref(false)
var resolvedTarget = ref('')

const isEncryptOpen = ref(false)
async function openEncryptModal() {
  isEncryptOpen.value = true
}

var public_key = ref('')
var agreeToTerms = ref(false)

async function createEncryption() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );
  const privateKey = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );
  const publicKeyBuffer = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );
  public_key.value = btoa(String.fromCharCode(...new Uint8Array(publicKeyBuffer)));
  const privateKeyPEM = convertPrivate(privateKey);
  const privateKeyFilename = formData.value.name + "_private_key.pem";
  downloadFile(privateKeyPEM, privateKeyFilename);
  $toast.success("Encryption keys downloaded successfully!");
  isEncryptOpen.value = false
  function convertPrivate(arrayBuffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return `-----BEGIN PRIVATE KEY-----\n${base64}\n-----END PRIVATE KEY-----`;
  }
  function convertPublic(arrayBuffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return `-----BEGIN PUBLIC KEY-----\n${base64}\n-----END PUBLIC KEY-----`;
  }
  function downloadFile(data, filename) {
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

function closeEncryptModal() {
  isEncryptOpen.value = false
}

var isTokenGated = ref(false)
var isEncrypted = ref(false)

async function openConfirmModal() {
  if (targetEl.value != '') {
    isTokenGated.value = true
  }
  if (agreeToTerms.value == true) {
    isEncrypted.value = true
  }
  await configureTarget()
  isConfirmOpen.value = true
}

async function configureTarget() {
  if (targetEl.value != '') {
    targetEl.value = targetEl.value.split('/');
    targetEl.value = targetEl.value[targetEl.value.length - 1];
    const response = await axios.get(`https://cors.mini-schnauzer.workers.dev/?url=https://api-mainnet.magiceden.dev/v2/collections/${targetEl.value}/listings?offset=0&limit=1`)
    const mint = response.data[0].tokenMint
    const url = `https://api.helius.xyz/v1/nfts?api-key=cc7ac7ca-a835-469a-9697-d46192c3710e`
    const describeNfts = async () => {
      const { data } = await axios.post(url, {
        mints: [mint]
      });
      return data[0]
    };
    resolvedTarget = await describeNfts();
  }
}

function closeConfirmModal() {
  isConfirmOpen.value = false
}

function closeModal() {
  isOpen.value = false
  inputName = ''
  inputRequired.value = false
  inputPlaceholder = ''

}

function openModal(id, type) {
  configId.value = id
  inputName = formElements.value[id].label
  inputPlaceholder = formElements.value[id].placeholder
  configType.value = type
  isOpen.value = true
}

var inputName = ''
var inputRequired = ref(false)
var inputPlaceholder = ''

var targetEl = ref('')

onUpdated(() => {
  console.log(formElements.value)
})

function addOption(id) {
  const selectField = JSON.parse(JSON.stringify(formElements.value[id]));
  selectField.options.push({
    id: selectField.options.length,
    label: '',
    value: 'new-option',
  });
  formElements.value[id] = selectField;
}

function removeOption(id, optionId) {
  const selectField = JSON.parse(JSON.stringify(formElements.value[id]));
  selectField.options.splice(optionId, 1);
  formElements.value[id] = selectField;
}

function deleteField(id) {
  const index = formElements.value.findIndex(elem => elem.id === id);
  if (index !== -1) {
    formElements.value.splice(index, 1);
    for (let i = index; i < formElements.value.length; i++) {
      formElements.value[i].id--;
    }
    el = formElements.value.length - 1
  }
}

async function submitConfig(id) {
  inputName = inputName.trim()
  if (inputName.length < 1) {
    inputName = 'Untitled'
  }
  if (formElements.value[id].type == 'text' || formElements.value[id].type == 'textarea') {
    try {
      inputPlaceholder = inputPlaceholder.trim()
    } catch (error) {
      inputPlaceholder = null
    }
  }
  formElements.value[id].label = inputName
  formElements.value[id].required = inputRequired.value
  formElements.value[id].placeholder = inputPlaceholder
  if (formElements.value[id].type == 'select') {
    for (var i = 0; i < formElements.value[id].options.length; i++) {
      formElements.value[id].options[i].label = formElements.value[id].options[i].label.trim()
      if (formElements.value[id].options[i].label.length < 1) {
        formElements.value[id].options[i].label = 'Untitled'
      }
    }
  }
  console.log(isOpen.value)
  isOpen.value = false
  inputName = ''
  inputRequired.value = false
  inputPlaceholder = ''
}

const { $toast } = useNuxtApp()

async function createForm() {
  console.log(public_key.value)
  const response = await axios.post('https://api.usemaven.app/api/forms/publish', {
    formId: route.params.id,
    fields: formElements.value,
    target_identifier: targetEl.value,
    target_primary: resolvedTarget.verifiedCollectionAddress || null,
    target_secondary: resolvedTarget.firstVerifiedCreator || null,
    encryption: public_key.value,
  })
  $toast.success('Form published!')
  setTimeout(() => {
    navigateTo('/app')
  }, 2000)
}

const elements = [
  {
    id: null,
    name: 'text',
    label: 'Short answer',
    placeholder: null,
    type: 'text',
    required: null,
  },
  {
    id: null,
    name: 'textarea',
    label: 'Paragraph',
    placeholder: null,
    type: 'textarea',
    required: null,
  },
  {
    id: null,
    name: 'select',
    label: 'Dropdown',
    type: 'select',
    required: null,
    options: [],
  },
  {
    id: null,
    name: 'checkbox',
    label: 'Checkbox',
    type: 'checkbox',
    required: null,
  },
  {
    name: 'file',
    label: 'Photo upload',
    type: 'file',
    required: null,
  },
  {
    name: 'header',
    label: 'Header Photo',
    type: 'header',
  },
];

const formElements = ref([]);

let el = -1;
function increment(element) {
  const newElement = { ...element, id: el = el + 1 };
  return newElement;
}

async function addElement(element) {
  let field = await increment(element)
  formElements.value.push(field)
}

async function openFilePicker() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const res = ref(null)
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = async () => {
        if (img.width > img.height) {
          const base64String = reader.result.split(',')[1];
          console.log(base64String);
          const apiEndpoint = 'https://api.imgbb.com/1/upload';
          const clientApiKey = runtimeConfig.public.IMGBB_API;

          const formData = new FormData();
          formData.append('image', base64String);
          const config = {
            headers: {
              'content-type': 'multipart/form-data'
            },
            params: {
              key: clientApiKey
            }
          };
          axios.post(apiEndpoint, formData, config)
            .then(response => {
              res.value = response.data.data.url;
              addElement({
                name: 'header',
                label: 'Header Photo',
                type: 'header',
                src: res.value,
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          alert('The uploaded image must be in landscape orientation.');
        }
      };
    };
  });
  input.click();
}

</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}

.sticky {
  position: sticky;
  top: 0;
}
</style>