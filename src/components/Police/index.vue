<template>
  <div class="policeList">
     1
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  runDate: {
    type: Number,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
})

const router = useRouter()

const jumpTo = () => {
  router.push("/")
}
</script>

<style lang="scss" scoped>
.policeList {
  width: 100%;
  height: 100%;
}
</style>