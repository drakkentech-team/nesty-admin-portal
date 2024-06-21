<script setup>
   import { computed, inject, onMounted, ref } from "vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose.vue";
   import ConfirmationDialog2 from "../components/ConfirmationDialog2.vue";
   
   // const dialogRef = inject('dialogRef');
   // const mounted = ref(false);
   // const report = ref({});


   const props = defineProps({
      show: {
         type: Boolean,
         default: false
      },
      user: {
         type: String
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
      if (suspendPeriod !== "Banned") {
         confirmedDialogMessage.value = `${props.user} has been Suspended for ${suspendPeriod.value}`
         showConfirmedDialog.value = true;
      } else {
         confirmBanTitle.value = `Selected to BAN \n<b>${props.user}</b>`;
         showConfirmBanDialog.value = true;
      }
   }

   const onBanConfirm = () => {
      confirmedDialogMessage.value = `<b>${props.user} has been BANNED`;
      showConfirmedDialog.value = true;
   }

   const closeDialog = () => {
      emit('close');
   }
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <Dialog v-model:visible="visible" modal :pt:closeButton:onClick="closeDialog"
            :header="`How long would you like to suspend ${user}?`">
            <Dropdown v-model="suspendPeriod" :options="timeframes"
               placeholder="Choose timeframe" class="col-6 col-offset-3 mb-6" />
            <div class="mx-3 flex align-items-center justify-content-center gap-3">
               <Button label="Confirm" @click="onConfirm"></Button>
               <Button label="Cancel" severity="secondary" @click="closeDialog"></Button>
            </div>
         </Dialog>
      </div>
   </div>

   <ConfirmationDialogClose :title="confirmedDialogMessage"
      :buttonLabel="'Return to query'" :show="showConfirmedDialog" />
   <ConfirmationDialog2 :title="confirmBanTitle" :body="confirmBanBody"
      :show="showConfirmBanDialog" @confirm="onBanConfirm" />
</template>


<style scoped>

</style>
