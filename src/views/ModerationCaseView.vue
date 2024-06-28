<script setup>
   import { computed, defineProps, ref } from "vue";
   import ConfirmationDialog from "../components/ConfirmationDialog2.vue";
   import ConfirmationDialogClose from "../components/ConfirmationDialogClose2.vue"
   import { checkProgressStatus } from "../utilities/moderation";
   import SuspensionView from "./SuspensionView.vue";
   import MessageReportedUser from "./MessageReportedUser.vue";
   import DeleteReportedContent from "./DeleteReportedContent.vue";
   import { suspendBanUser, updateStatus } from "../api/moderation";
   import { useModerationStore } from "../stores/moderationStore";


   const props = defineProps(["report"]);
   const { fetchReports } = useModerationStore();

   const statuses = ["Open", "In Progress", "Resolved"];
   const ignoreConfirmationMessage = "Are you sure you want to OVERRULE and IGNORE the reported post?";
   const showIgnoreConfirmation = ref(false);
   const showSuspendDialog = ref(false);
   const showMessageDialog = ref(false);
   const showDeleteDialog = ref(false);
   const ignoreConfirmedMessage = "Reported post Ignored";
   const buttonStyle = "col-12 mb-3 justify-content-center";
   const showBanConfirmation = ref(false);
   const confirmDialogTitle = ref('');
   const confirmDialogMessage = ref('');
   const showIgnoreConfirmed = ref(false);
   const showBanConfirmed = ref(false);
   const confirmedDialogMessage = ref('');

   const progressStatus = computed({
      get() {
         return checkProgressStatus(props.report.moderation_status);
      },
      set(newStatus) {
         changeModerationStatus(newStatus);
      }
   });

   const showConfirmDialog = computed({
      get() {
         return showIgnoreConfirmation.value || showBanConfirmation.value;
      },
      set(newValue) {
         if (newValue === false) {
            showIgnoreConfirmation.value = false;
            showBanConfirmation.value = false;
         }
      }
   })

   const showConfirmedDialog = computed({
      get() {
         return showIgnoreConfirmed.value || showBanConfirmed.value;
      },
      set(newValue) {
         if (newValue === false) {
            showIgnoreConfirmed.value = false;
            showBanConfirmed.value = false;
         }
      }
   })

   const confirmIgnore = () => {
      confirmDialogTitle.value = '';
      confirmDialogMessage.value = ignoreConfirmationMessage;
      showIgnoreConfirmation.value = true;
   }

   const closeConfirmDialog = () => {
      showConfirmDialog.value = false;
      confirmDialogTitle.value = '';
      confirmDialogMessage.value = '';
   }

   const handleConfirm = () => {
      if (showIgnoreConfirmation.value) {
         ignorePost();
      } else if (showBanConfirmation.value) {
         banUser();
      }
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

   const changeModerationStatus = async (status) => {
      switch (status) {
         case "Open":
            await updateStatus(props.report.moderation_sid, 1);
            break;
         case "In Progress":
            await updateStatus(props.report.moderation_sid, 2);
            break;
         case "Resolved":
            await updateStatus(props.report.moderation_sid, 4);
            break;
      
         default:
            await updateStatus(props.report.moderation_sid, 1);
      }
      fetchReports();
   }

   const confirmBan = () => {
      confirmDialogTitle.value = `Selected to BAN \n<b>${props.report.reported_user}</b>`;
      confirmDialogMessage.value = "This action is <b>permanent</b>, are you sure you want to continue?";
      showBanConfirmation.value = true;
   }

   const ignorePost = async () => {
      await updateStatus(props.report.moderation_sid, 3);
      fetchReports();
      confirmedDialogMessage.value = ignoreConfirmedMessage;
      showIgnoreConfirmed.value = true;
   }

   const banUser = async () => {
      await suspendBanUser(props.report.reported_user_sid, {
         "ban": true,
         "moderation_sid": props.report.moderation_sid
      });
      confirmedDialogMessage.value = `<b>${props.report.reported_user}</b> has been BANNED`;
      showBanConfirmed.value = true;
   }
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <div class="grid my-3">
            <Panel header="Reported Date" class="col">
               {{ report.date_reported }}
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
               <Button @click="confirmIgnore" :class="buttonStyle">Ignore</Button>
               <Button @click="confirmSuspension" :class="buttonStyle">Suspend Reported User</Button>
               <Button @click="confirmBan" :class="buttonStyle">Ban Reported User</Button>
               <Button @click="openMessageDialog" :class="buttonStyle">Send Message</Button>
               <Button @click="openDeleteDialog" :class="buttonStyle">Delete</Button>
               <Dropdown v-model="progressStatus" :options="statuses"
                  placeholder="Status" class="col-12" />
            </div>
         </div>
      </div>
   </div>

   <ConfirmationDialog :title="confirmDialogTitle" :body="confirmDialogMessage"
      :show="showConfirmDialog" @close="closeConfirmDialog" @confirm="handleConfirm" />
   <ConfirmationDialogClose :title="confirmedDialogMessage" buttonLabel="Return to query"
      :show="showConfirmedDialog" @close="showConfirmedDialog=false" />
   <SuspensionView :show="showSuspendDialog" @close="closeSuspension"
      :report="report" />
   <MessageReportedUser :visible="showMessageDialog"
      @close="closeMessageDialog" />
   <DeleteReportedContent :visible="showDeleteDialog" :report="report" @close="closeDeleteDialog" />
</template>

<style scoped>
   .content {
      border: 2px solid black;
      width: auto;
      height: 100%;
   }
</style>