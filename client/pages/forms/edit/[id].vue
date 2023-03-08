<template>
  <main>
    <div v-if="isLoaded">
      <h1>{{ formData.id }}</h1>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'

const route = useRoute()
const formData = ref({})
const isLoaded = ref(false)

onBeforeMount(async () => {
  console.log(route.params.id)
  const response = await axios.get('http://localhost/api/forms/' + route.params.id)
  formData.value = response.data
  isLoaded.value = true
  console.log(formData.value)
})

</script>
