<script setup>
import { ref } from 'vue';
import ConfirmationDialogClose from '../components/ConfirmationDialogClose2.vue';


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
   const showConfirmedDialog = ref(false);

   const closeDialog = () => {
      emit('close');
   }

   const openConfirmedDialog = () => {
      showConfirmedDialog.value = true;
      closeDialog();
   }
</script>

<template>
   <Dialog :visible="visible" modal header="Message to Reported User"
      :pt:closeButton:onClick="closeDialog" >
      <div>
         <Textarea v-model.trim="subject" placeholder="Subject" rows="1" cols="60" />
      </div>
      <div>
         <Textarea v-model.trim="body" placeholder="Add text" rows="6" cols="60" />
      </div>
      <div>
         <Textarea v-model="refToReported" placeholder="Reported Post Reference" rows="5" cols="60" />
      </div>

      <template #footer>
         <Button label="Send" @click="openConfirmedDialog" :disabled="!body" />
      </template>
   </Dialog>

   <ConfirmationDialogClose :title="'<b>Message Sent</b>'" :buttonLabel="'Return to Post'"
      :show="showConfirmedDialog" @close="showConfirmedDialog=false" />
</template>