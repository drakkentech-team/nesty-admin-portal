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
   const { fetchReports } = useModerationStore();

   const statuses = ["Open", "In Progress", "Resolved"];
   const progressStatus = ref(checkProgressStatus(props.report.moderation_status));
   const overruleConfirmationMessage = "Are you sure you want to OVERRULE and IGNORE the reported post?";
   const showOverruleConfirmation = ref(false);
   const showSuspendDialog = ref(false);
   const showMessageDialog = ref(false);
   const showDeleteDialog = ref(false);
   const showConfirmedDialog = ref(false);
   const overruleConfirmedMessage = "Reported post OVERRULED";
   const buttonStyle = "col-12 mb-3 justify-content-center";

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
            await updateStatus(props.report.sid, 4);
            break;
      
         default:
            await updateStatus(props.report.sid, 1);
      }
      fetchReports();
   }
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <div class="grid my-3">
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

         <div class="grid nested-grid my-3">
            <div class="col-9">
               <ScrollPanel class="content p-4">
                  <h4 class="font-bold">{{ report.report_type }}</h4>
                  <p>{{ reportedContent() }}</p>
               </ScrollPanel>
            </div>
            <div class="col-3">
               <Button @click="confirmOverrule" :class="buttonStyle">Overrule</Button>
               <Button @click="confirmSuspension" :class="buttonStyle">Suspend Reported User</Button>
               <Button @click="openMessageDialog" :class="buttonStyle">Send Message</Button>
               <Button @click="openDeleteDialog" :class="buttonStyle">Delete</Button>
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
      :report="report" />
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