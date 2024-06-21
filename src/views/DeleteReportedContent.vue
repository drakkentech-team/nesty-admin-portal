<script setup>
   import { onMounted, ref } from 'vue';
   import { deleteViolation, updateStatus } from '../api/moderation';
   import { useModerationStore } from "../stores/moderationStore";
   import { storeToRefs } from 'pinia';


   const emit = defineEmits(['close']);
   const props = defineProps({
      visible : {
         type : Boolean,
         default : false
      },
      report : Object
   })
   const { reloadRequired } = storeToRefs(useModerationStore());
   
   const itemToDelete = ref();
   const reason = ref();
   const isPost = ref(false);

   onMounted(() => {
      itemToDelete.value = props.report.report_type;
      reason.value = props.report.reason_for_report;
      isPost.value = props.report.report_type === "Post" ? true : false;
   })

   const closeDialog = () => {
      emit('close');
   }

   const deleteContent = async () => {
      if (itemToDelete.value.includes("Post")) {
         await deleteViolation({
            "post_sid": props.report.post_sid
         });
      }
      if (itemToDelete.value.includes("Comment", 9)) {
         await deleteViolation({
            "comment_sid": props.report.comment_sid
         });
      }

      await updateStatus(props.report.sid, 3);
      reloadRequired.value = true;
      closeDialog();   // tmp
   }
</script>

<template>
   <Dialog :visible="visible" modal header="What would you like to delete?"
      :pt:closeButton:onClick="closeDialog" >
      <div class="flex flex-wrap gap-3">
         <div class="flex align-items-center">
            <RadioButton v-model="itemToDelete" value="Comment" :disabled="isPost" />
            <label class="ml-2">Comment only</label>
         </div>
         <div class="flex align-items-center">
            <RadioButton v-model="itemToDelete" value="Post" />
            <label class="ml-2">Post only</label>
         </div>
         <div class="flex align-items-center">
            <RadioButton v-model="itemToDelete" value="Post and Comment" :disabled="isPost" />
            <label class="ml-2">Post and Comment</label>
         </div>
      </div>
    
      <div>
         <Textarea v-model="reason" placeholder="Reason For Deleting" rows="10" cols="60" />
      </div>

      <template #footer>
         <Button label="Delete" @click="deleteContent" :disabled="!(reason && itemToDelete)" />
      </template>
   </Dialog>
</template>