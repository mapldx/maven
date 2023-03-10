<template>
  <div class="max-h-[80%] w-auto">
    <h1>Dynamic Page</h1>
    <p>ID: {{ address }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
const route = useRoute()

var user = ref({})
var address = ref('')

async function fetchUser() {
  const { data } = await axios.get(`https://xnft-api-server.xnfts.dev/v1/users?user_id=${route.params.id}`)
  user.value = data.user
  address.value = data.user.publicKeys[0].publicKey
}

onMounted(async () => {
  console.log(route.params.id)
  await fetchUser()
  console.log(user.value)
})

</script>