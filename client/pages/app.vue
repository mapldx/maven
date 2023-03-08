<template>
  <div class="min-h-full" v-if="isLoaded">
    <NavBar />

    <div class="py-10" v-if="isLoaded">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Your Documents</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="px-4 py-8 sm:px-0">
            <div class="">
              <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <li v-for="doc in docs.forms" :key="doc.id" class="col-span-1 divide-y divide-gray-200 rounded-2xl bg-gray-200">
                  <div class="flex w-full items-center justify-between space-x-6 p-6">
                    <div class="flex-1 truncate">
                      <div class="flex items-center space-x-3">
                        <h3 class="truncate text-sm font-medium text-gray-900">{{ doc.name }}</h3>
                        <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Form</span>
                      </div>
                      <p class="mt-1 truncate text-sm text-gray-500">{{ doc.desc }}</p>
                    </div>
                  </div>
                  <div>
                    <div class="-mt-px flex divide-x divide-gray-200">
                      <div class="flex w-0 flex-1">
                        <a :href="`/forms/edit/${doc.id}`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                          <PencilSquareIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span class="ml-3">Edit</span>
                        </a>
                      </div>
                      <div class="-ml-px flex w-0 flex-1">
                        <a :href="`/forms/responses/${doc.id}`" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                          <ChatBubbleLeftEllipsisIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span class="ml-3">Responses</span>
                        </a>
                      </div>
                      <div class="-ml-px flex w-0 flex-1">
                        <a :href="`/forms/settings/${doc.id}`" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                          <Cog6ToothIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span class="ml-3">Settings</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="col-span-1 divide-y divide-gray-200 rounded-2xl bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 p-1 shadow-xl">
                  <div class="flex w-full items-center justify-between space-x-6 p-6">
                    <div class="flex-1 truncate items-center justify-center text-center">
                      <div class="flex items-center space-x-3 justify-center text-center">
                        <h3 class="truncate text-sm font-bold text-white">Create a new document</h3>
                      </div>
                      <p class="mt-1 truncate text-sm text-white">Select document type</p>
                    </div>
                  </div>
                  <div>
                    <div class="-mt-px flex divide-x divide-gray-200">
                      <div class="flex w-0 flex-1" @click="openModal">
                        <a class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-white hover:text-gray-500">
                          <DocumentMagnifyingGlassIcon class="h-5 w-5 text-white" aria-hidden="true" />
                          <span class="ml-3">Form</span>
                        </a>
                      </div>
                      <div class="-ml-px flex w-0 flex-1">
                        <a class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-white hover:text-gray-500">
                          <DevicePhoneMobileIcon class="h-5 w-5 text-white" aria-hidden="true" />
                          <span class="ml-3">One Page Site</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <div class="min-h-screen" v-else>
    <div class="grid">
      <h1 class="font-extrabold text-3xl text-center my-16">
        Loading...
      </h1>
      <div class="place-self-center animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-300"></div>
    </div>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-80" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Create a new form
              </DialogTitle>
              <div class="mt-4">
                <form class="flex flex-col space-y-2" @submit.prevent="submitForm">
                  <label for="username" class="text-sm font-medium text-gray-700">Give it a name</label>
                  <input id="username" v-model="formName" type="text" class="border border-gray-400 rounded-md py-2 px-3">
                  <label for="username" class="text-sm font-medium text-gray-700">Short description (limited to 40 chars.)</label>
                  <textarea id="username" v-model="formDesc" type="text" class="border border-gray-400 rounded-md py-2 px-3" 
                    maxlength="40" 
                    placeholder="This will be displayed under the form name"
                    />
                  <div class="pt-3">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="newForm"
                    >
                      Continue
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
</template>

<script setup>
import { ChatBubbleLeftEllipsisIcon, DocumentMagnifyingGlassIcon, DevicePhoneMobileIcon, PencilSquareIcon, Cog6ToothIcon } from '@heroicons/vue/20/solid'

import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
import { useToast } from "vue-toastification";

import axios from 'axios'

import { ref } from 'vue'
import {
  Disclosure,
  DisclosurePanel,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { nextTick } from 'process';

const { publicKey } = useWallet()
const { wallet, program } = useAnchor()

const toast = useToast();

const isOpen = ref(false)
var isLoaded = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

const formName = ref('')
const formDesc = ref('')

async function newForm() {
  const data = {
    address: wallet.value?.publicKey,
    name: formName.value,
    desc: formDesc.value,
  }
  axios.post('http://localhost/api/forms/create', data)
    .then(res => {
      toast('Successfully created form!');
      navigateTo(`/forms/edit/${res.data}`)
    })
    .catch(err => {
      toast.error('Error creating form!');
    })
}

let fetch;
onMounted(async () => {
  fetch = setInterval(async () => {
    const data = {
      address: await wallet.value?.publicKey.toString(),
    }
    axios.post('http://localhost/api/documents/get', data)
      .then(res => {
        docs.value = res.data
        isLoaded.value = true
      })
      .catch(err => {
        console.log(err)
      })
  }, 1000)
})

const docs = ref([])

onUpdated(async () => {
  clearInterval(fetch)
})

</script>