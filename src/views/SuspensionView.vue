<script setup>
   import { computed, inject, onMounted, ref } from "vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose2.vue";
   import ConfirmationDialog from "../components/ConfirmationDialog2.vue";


   const props = defineProps({
      show: {
         type: Boolean,
         default: false
      },
      userId: {
         type: Number,
         required: true
      },
      userName: {
         type: String,
         required: true
      }
   });
   const emit = defineEmits(["close"]);
   const visible = computed(() => { return props.show });
   const suspendPeriod = ref();
   const timeframes = [
      "1 Day",
      "3 Days",
      "1 Week",
      "1 Month",
      "Banned"
   ];
   const showConfirmedDialog = ref(false);
   const confirmedDialogMessage = ref();
   const showConfirmBanDialog = ref(false);
   const confirmBanTitle = ref();
   const confirmBanBody = "This action is <b>permanent</b>, are you sure you want to continue?";

   const onConfirm = () => {
      if (suspendPeriod.value !== "Banned") {
         confirmedDialogMessage.value = `<b>${props.userName}</b> has been Suspended for ${suspendPeriod.value}`;
         showConfirmedDialog.value = true;
         closeDialog();
      } else {
         confirmBanTitle.value = `Selected to BAN \n<b>${props.userName}</b>`;
         showConfirmBanDialog.value = true;
      }
   }

   const onBanConfirm = () => {
      confirmedDialogMessage.value = `<b>${props.userName}</b> has been BANNED`;
      showConfirmedDialog.value = true;
      closeDialog();
   }

   const closeDialog = () => {
      emit('close');
   }

   const closeConfirmBanDialog = () => {
      showConfirmBanDialog.value = false;
   }
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <Dialog v-model:visible="visible" modal :pt:closeButton:onClick="closeDialog"
            :header="`How long would you like to suspend ${userName}?`">
            <Dropdown v-model="suspendPeriod" :options="timeframes"
               placeholder="Choose timeframe" class="col-6 col-offset-3 mb-6" />
            <div class="mx-3 flex align-items-center justify-content-center gap-3">
               <Button label="Confirm" @click="onConfirm" :disabled="!suspendPeriod" ></Button>
               <Button label="Cancel" severity="secondary" @click="closeDialog"></Button>
            </div>
         </Dialog>
      </div>
   </div>

   <ConfirmationDialogClose :title="confirmedDialogMessage" :buttonLabel="'Return to query'"
      :show="showConfirmedDialog" @close="showConfirmedDialog=false" />
   <ConfirmationDialog :title="confirmBanTitle" :body="confirmBanBody"
      :show="showConfirmBanDialog" @confirm="onBanConfirm" @close="closeConfirmBanDialog" />
</template>


<style scoped>

</style>
