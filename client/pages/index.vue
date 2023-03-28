<template>
  <main>
    <header class="bg-white">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <img class="h-8 w-auto" src="/logo/cover.png" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-800">Get onboarded <span
              aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
    </header>
    <section class="bg-gray-900 pt-16">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a href="https://twitter.com/mapldx/status/1634737381059309568" target="_blank"
          class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm rounded-full bg-gray-800 text-white hover:bg-gray-700"
          role="alert"><span
            class="pl-4 py-1.5 text-sm font-medium">Prefer reading a tweet thread?</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </a>
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
          There's a better way to do forms in Web 3</h1>
        <p class="mb-8 text-lg font-normal tracking-wide lg:text-xl sm:px-16 xl:px-48 text-gray-200">
          Say hello to Web 3's easiest plug-and-play solution for token-gated one-page sites. Create endless value-add
          interactions for communities and events in 5 minutes or less.</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href="https://twitter.com/usemaven_" target="_blank"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 focus:ring-primary-900">
            Follow on Twitter
            <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="#"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border hover:bg-gray-100 focus:ring-4 text-black border-gray-700 focus:ring-gray-800 bg-white">
            Get onboarded
          </a>
        </div>
        <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span class="font-semibold text-gray-400 uppercase">Built with best experience in mind for</span>
          <div class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            <a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-400">
              <svg class="h-8" viewBox="0 0 128 106" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M120.471 52.0091H106.139C106.139 23.2846 82.3791 0 53.0684 0C24.1204 0 0.585366 22.7145 0.0093645 50.9471C-0.586549 80.1302 27.3517 105.472 57.1345 105.472H60.8807C87.1378 105.472 122.331 85.329 127.829 60.7858C128.845 56.2616 125.198 52.0091 120.471 52.0091ZM31.7705 53.2886C31.7705 57.1299 28.5648 60.2715 24.6452 60.2715C20.7255 60.2715 17.5198 57.1285 17.5198 53.2886V41.992C17.5198 38.1507 20.7255 35.0091 24.6452 35.0091C28.5648 35.0091 31.7705 38.1507 31.7705 41.992V53.2886ZM56.513 53.2886C56.513 57.1299 53.3073 60.2715 49.3877 60.2715C45.468 60.2715 42.2623 57.1285 42.2623 53.2886V41.992C42.2623 38.1507 45.4694 35.0091 49.3877 35.0091C53.3073 35.0091 56.513 38.1507 56.513 41.992V53.2886Z" fill="white"/>
              </svg>
            </a>
            <a href="#" class="mr-5 mb-5 lg:mb-0 hover:text-gray-400">
              <img class="h-8" src="https://www.backpack.app/backpack.svg">
            </a>
            <a href="#" class="mr-5 mb-5 lg:mb-0 text-gray-800 hover:text-gray-400">
              <img class="h-12 rounded-md" src="https://soladex.io/wp-content/uploads/2022/04/Glow-logo.png">
            </a>
            <img class="mr-5 mb-5 lg:mb-0 h-8 opacity-20" src="https://solanamobile.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsolana_mobile_logotype.92ffc3bb.svg&w=256&q=75">
          </div>
        </div>
      </div>
    </section>
    <div class="bg-gray-900 py-8 sm:py-16 sm:pb-32">
      <div class="relative overflow-hidden lg:pt-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <img src="/preview.png" alt="App screenshot" class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
            width="2432" height="1442" />
          <div class="relative" aria-hidden="true">
            <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]" />
          </div>
        </div>
      </div>
      <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          <div v-for="feature in features" :key="feature.name" class="relative pl-9">
            <dt class="inline font-semibold text-white">
              <component :is="feature.icon" class="absolute top-1 left-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
              {{ feature.name }}
            </dt>
            {{ ' ' }}
            <dd class="inline">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="overflow-hidden bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-indigo-600">Make magic happen effortlessly</h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Popular use cases</p>
              <p class="mt-6 text-lg leading-8 text-gray-600">After surveying the current state of information collection in many NFT Discords, CT threads, and IRL events, here's what we dreamed up to start with:</p>
              <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                <div v-for="feature in uses" :key="feature.name" class="relative pl-9">
                  <dt class="inline font-semibold text-gray-900">
                    <component :is="feature.icon" class="absolute top-1 left-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                    {{ feature.name }}
                  </dt>
                  {{ ' ' }}
                  <dd class="inline">{{ feature.description }}</dd>
                </div>
              </dl>
            </div>
            <div class="mt-8">and many more endless possibilities...</div>
          </div>
          <img src="/landing.png" alt="Product screenshot" class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
        </div>
      </div>
    </div>
    <div class="bg-indigo-100">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to make magic happen? 🫡<br />All features are free to use in beta.</h2>
        <div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get onboarded</a>
          <a href="https://twitter.com/usemaven_" target="_blank" class="text-sm font-semibold leading-6 text-gray-900">Follow on Twitter <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  <footer class="bg-white">
    <div class="mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-center text-xs leading-5 text-gray-500">&copy; Copyright 2023 twitter.com/mapldx. All rights reserved. Built with 🍕 in Indiana, US.</p>
      </div>
    </div>
  </footer>
</main>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  WalletIcon,
  AcademicCapIcon
} from '@heroicons/vue/20/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
import { defineComponent, h } from 'vue'

const navigation = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/usemaven_',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
          }),
        ]),
    }),
  },
]

const features = [
  {
    name: 'Create forms in less than 5 minutes.',
    description: 'Web 3 isn\'t easy, and we\'re not here to make it harder. Click, set, paste, and you\'re set.',
    icon: ClockIcon,
  },
  {
    name: 'Token-gate your forms without breaking a sweat.',
    description: 'Just paste in your Magic Eden collection URL and only your holders can find their way to your form.',
    icon: LockClosedIcon,
  },
  {
    name: 'Encrypt your form\'s responses to industry-standard.',
    description: 'Say goodbye to your data being subject to Web 2 practices. Only form creators can view and decrypt your responses.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Reach your community wherever they are.',
    description: 'Some experience Web 3 best on the go. We\'ve got you covered with a mobile-friendly experience for your target audience.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Customize your form\'s look and feel.',
    description: 'Whether you\'re an individual, creator, project, or DAO, fit the form to your needs and your brand.',
    icon: PaintBrushIcon,
  },
]

const uses = [
  {
    name: 'Request wallet addresses',
    description: 'to airdrop a POAP after a Twitter Spaces or Discord Stages event.',
    icon: WalletIcon,
  },
  {
    name: 'Open applications',
    description: 'for your DAO or project\'s community positions.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Collect genuine feedback',
    description: 'after a conference, hackathon, or other event from attendees.',
    icon: ArrowPathIcon,
  },
]

</script>