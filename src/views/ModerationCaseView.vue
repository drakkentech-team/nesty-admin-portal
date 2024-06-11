<script setup>
   import { defineProps, ref } from "vue";
   import ConfirmationDialog2 from "../components/ConfirmationDialog2.vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose.vue"
   import { checkProgressStatus } from "../utilities/moderation";
   import SuspensionView from "./SuspensionView.vue";


   const props = defineProps(["report"]);

   const statuses = ["Open", "In Progress", "Resolved"];
   const progressStatus = ref(checkProgressStatus(props.report.status));
   const overruleConfirmationmessage = "Are you sure you want to OVERRULE and IGNORE the reported post?";
   const showOverruleConfirmation = ref(false);
   const showSuspendDialog = ref(false);

   // const checkProgressStatus = () => {
   //    const reportStatus = props.report.status;
   //    if (reportStatus === "Open") {
   //       progressStatus.value = "Open";
   //    } else if (reportStatus === "Pending") {
   //       progressStatus.value = "In Progress";
   //    } else {
   //       progressStatus.value = "Resolved";
   //    }
   // }

   const confirmOverrule = () => {
      showOverruleConfirmation.value = true;
   }

   const handleCancel = () => {
      showOverruleConfirmation.value = false;
   }

   const handleConfirm = () => {

   }

   const confirmSuspension = () => {
      showSuspendDialog.value = true;
   }

   const closeSuspension = () => {
      showSuspendDialog.value = false;
   }


   // checkProgressStatus();
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <div class="grid">
            <Panel header="Reported Date" class="col">
               {{ report.reason }}
            </Panel>
            <Panel header="Reported By" class="col">
               {{ report.reported_by }}
            </Panel>
            <Panel header="Posted By" class="col">
               {{ report.posted_by }}
            </Panel>
            <Panel header="Group" class="col">
               {{ report.group }}
            </Panel>
         </div>

         <div class="grid nested-grid + mt-4">
            <div class="col-8">
               <ScrollPanel class="content p-4">
                  <h4 class="font-bold">{{ report.type }}</h4>
                  <p>Reported content here</p>
               </ScrollPanel>
            </div>
            <div class="col-4">
               <button @click="confirmOverrule" class="col-12 mb-3">Overrule and Ignore</button>
               <button @click="confirmSuspension" class="col-12 mb-3">Suspend Reported User</button>
               <button class="col-12 mb-3">Send Message</button>
               <button class="col-12 mb-3">Delete</button>
               <Dropdown v-model="progressStatus" :options="statuses"
                  placeholder="Status" class="col-12" />
            </div>
         </div>
      </div>
   </div>

   <ConfirmationDialog2 :title="''" :body="overruleConfirmationmessage"
      :show="showOverruleConfirmation" @cancel="handleCancel" @confirm="handleConfirm" />
   <!-- <ConfirmationDialogClose :show="showConfirmedDialog" /> -->
    <SuspensionView :show="showSuspendDialog" :user="report.posted_by" @close="closeSuspension" />
</template>

<style scoped>
   .content {
      border: 2px solid black;
      width: auto;
      height: 100%;
   }
   
</style>