<script setup>
   import { inject, onMounted, ref } from "vue";
   
   const dialogRef = inject('dialogRef');
   const mounted = ref(false);
   const report = ref({});
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <Card>
            <template #title>How long </template>
         </Card>
      </div>
   </div>
</template>


<style scoped>

</style>
