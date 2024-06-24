<script setup>
   import { defineProps, ref } from "vue";
   import ConfirmationDialog2 from "../components/ConfirmationDialog2.vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose2.vue"
   import { checkProgressStatus } from "../utilities/moderation";
   import SuspensionView from "./SuspensionView.vue";
   import MessageReportedUser from "./MessageReportedUser.vue";
   import DeleteReportedContent from "./DeleteReportedContent.vue";
   import { updateStatus } from "../api/moderation";
   import { useModerationStore } from "../stores/moderationStore";
   import { storeToRefs } from "pinia";


   const props = defineProps(["report"]);
   const { reloadRequired } = storeToRefs(useModerationStore());

   const statuses = ["Open", "In Progress", "Resolved"];
   const progressStatus = ref(checkProgressStatus(props.report.moderation_status));
   const overruleConfirmationMessage = "Are you sure you want to OVERRULE and IGNORE the reported post?";
   const showOverruleConfirmation = ref(false);
   const showSuspendDialog = ref(false);
   const showMessageDialog = ref(false);
   const showDeleteDialog = ref(false);
   const showConfirmedDialog = ref(false);
   const overruleConfirmedMessage = "Reported post OVERRULED";

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

   const closeConfirmDialog = () => {
      showOverruleConfirmation.value = false;
   }

   const handleConfirm = () => {
      showConfirmedDialog.value = true;
      closeConfirmDialog();
   }

   const confirmSuspension = () => {
      showSuspendDialog.value = true;
   }

   const closeSuspension = () => {
      showSuspendDialog.value = false;
   }

   const openMessageDialog = () => {
      showMessageDialog.value = true;
   }

   const closeMessageDialog = () => {
      showMessageDialog.value = false;
   }

   const openDeleteDialog = () => {
      showDeleteDialog.value = true;
   }

   const closeDeleteDialog = () => {
      showDeleteDialog.value = false;
   }

   const reportedContent = () => {
      if (props.report.report_type === "Post") {
         return props.report.post_body;
      } else if (props.report.report_type === "Comment") {
         return props.report.comment_body;
      }
   }

   const changeModerationStatus = async () => {
      switch (progressStatus.value) {
         case "Open":
            await updateStatus(props.report.sid, 1);
            break;
         case "In Progress":
            await updateStatus(props.report.sid, 2);
            break;
         case "Resolved":
            await updateStatus(props.report.sid, 3);
            break;
      
         default:
            await updateStatus(props.report.sid, 1);
      }
      reloadRequired.value = true;
   }

   // checkProgressStatus();
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <div class="grid">
            <Panel header="Reported Date" class="col">
               {{ report.reason_for_report }}
            </Panel>
            <Panel header="Reported By" class="col">
               {{ report.reporting_user }}
            </Panel>
            <Panel header="Posted By" class="col">
               {{ report.reported_user }}
            </Panel>
            <Panel header="Group" class="col">
               {{ report.group }}
            </Panel>
         </div>

         <div class="grid nested-grid + mt-4">
            <div class="col-8">
               <ScrollPanel class="content p-4">
                  <h4 class="font-bold">{{ report.report_type }}</h4>
                  <p>{{ reportedContent() }}</p>
               </ScrollPanel>
            </div>
            <div class="col-4">
               <button @click="confirmOverrule" class="col-12 mb-3">Overrule and Ignore</button>
               <button @click="confirmSuspension" class="col-12 mb-3">Suspend Reported User</button>
               <button @click="openMessageDialog" class="col-12 mb-3">Send Message</button>
               <button @click="openDeleteDialog" class="col-12 mb-3">Delete</button>
               <Dropdown v-model="progressStatus" :options="statuses"
                  placeholder="Status" class="col-12" @change="changeModerationStatus" />
            </div>
         </div>
      </div>
   </div>

   <ConfirmationDialog2 :title="''" :body="overruleConfirmationMessage"
      :show="showOverruleConfirmation" @close="closeConfirmDialog" @confirm="handleConfirm" />
   <ConfirmationDialogClose :title="overruleConfirmedMessage" buttonLabel="Return to query"
      :show="showConfirmedDialog" @close="showConfirmedDialog=false" />
   <SuspensionView :show="showSuspendDialog" @close="closeSuspension"
      :userName="report.reported_user" :userId="report.reported_userid" />
   <MessageReportedUser :visible="showMessageDialog"
      @close="closeMessageDialog" @closeCallback="closeMessageDialog" />
   <DeleteReportedContent :visible="showDeleteDialog" :report="report" @close="closeDeleteDialog" />
</template>

<style scoped>
   .content {
      border: 2px solid black;
      width: auto;
      height: 100%;
   }
   
</style>