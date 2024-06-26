<script setup>
   import { computed, inject, onMounted, ref } from "vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose2.vue";
   import ConfirmationDialog from "../components/ConfirmationDialog2.vue";
   import { suspendBanUser, updateStatus } from "../api/moderation";
   import { useModerationStore } from "../stores/moderationStore";


   const props = defineProps({
      show: {
         type: Boolean,
         default: false
      },
      report: {
         type: Object,
         required: true
      }
   });
   const emit = defineEmits(["close"]);
   const { fetchReports } = useModerationStore();
   const visible = computed(() => { return props.show });
   const suspendPeriod = ref();
   const timeframes = [
      { label: "1 Day", days: 1 },
      { label: "3 Days", days: 3 },
      { label: "1 Week", days: 7},
      { label: "1 Month", days: 30},
   ];
   const showConfirmedDialog = ref(false);
   const confirmedDialogMessage = ref();
   const showConfirmBanDialog = ref(false);
   const confirmBanTitle = ref();
   const confirmBanBody = "This action is <b>permanent</b>, are you sure you want to continue?";

   const onConfirm = async () => {
      await suspendBanUser(props.report.reported_user_sid, {
         "suspend": suspendPeriod.value.days,
         "moderation_sid": props.report.moderation_sid,
         "ban": false
      });
      await updateStatus(props.report.moderation_sid, 4);
      fetchReports();
      confirmedDialogMessage.value = `<b>${props.report.reported_user}</b> has been Suspended for ${suspendPeriod.value.label}`;
      showConfirmedDialog.value = true;
      closeDialog();
   }

   const onBanConfirm = async () => {
      await suspendBanUser(props.report.reported_user_sid, {
         "ban": true,
         "moderation_sid": props.report.moderation_sid
      });
      await updateStatus(props.report.moderation_sid, 4);
      fetchReports();
      confirmedDialogMessage.value = `<b>${props.report.reported_user}</b> has been BANNED`;
      showConfirmedDialog.value = true;
      closeDialog();
   }

   const closeDialog = () => {
      emit('close');
   }

   const closeConfirmBanDialog = () => {
      showConfirmBanDialog.value = false;
   }

   const openConfirmBanDialog = () => {
      confirmBanTitle.value = `Selected to BAN \n<b>${props.report.reported_user}</b>`;
      showConfirmBanDialog.value = true;
   }
</script>

<template>
   <Dialog v-model:visible="visible" modal :pt:closeButton:onClick="closeDialog"
      :header="`How long would you like to suspend ${report.reported_user}?`" class="w-5">
      <Dropdown v-model="suspendPeriod" :options="timeframes" optionLabel="label"
         placeholder="Choose timeframe" class="col-6 col-offset-3 mb-6 mt-1" />
      <div class="grid">
         <div class="col-offset-3 col-6">
            <div class="mx-3 flex justify-content-center gap-4">
               <Button label="Confirm" @click="onConfirm" :disabled="!suspendPeriod" ></Button>
               <Button label="Cancel" severity="secondary" @click="closeDialog"></Button>
            </div>
         </div>
         <div class="col-3">
            <div class="flex justify-content-end">
               <Button label="Ban" severity="danger" @click="openConfirmBanDialog"></Button>
            </div>
         </div>
      </div>
   </Dialog>

   <ConfirmationDialogClose :title="confirmedDialogMessage" :buttonLabel="'Return to query'"
      :show="showConfirmedDialog" @close="showConfirmedDialog=false" />
   <ConfirmationDialog :title="confirmBanTitle" :body="confirmBanBody"
      :show="showConfirmBanDialog" @confirm="onBanConfirm" @close="closeConfirmBanDialog" />
</template>


<style scoped>

</style>
