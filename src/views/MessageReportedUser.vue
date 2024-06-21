<script setup>
import { ref } from 'vue';


   const emit = defineEmits(['close']);
   const props = defineProps({
      visible : {
         type : Boolean,
         default : false
      },
      // user
   })
   const subject = ref();
   const body = ref();
   const refToReported = ref();

   const closeDialog = () => {
      emit('close');
   }
</script>

<template>
   <Dialog :visible="visible" modal header="Message to Reported User"
      :pt:closeButton:onClick="closeDialog" >
      <div>
         <Textarea v-model="subject" placeholder="Subject" rows="1" cols="60" />
      </div>
      <div>
         <Textarea v-model="body" placeholder="Add text" rows="6" cols="60" />
      </div>
      <div>
         <Textarea v-model="refToReported" placeholder="Reported Post Reference" rows="5" cols="60" />
      </div>

      <template #footer>
         <Button label="Send" @click="$emit('close')" />
      </template>
   </Dialog>
</template>