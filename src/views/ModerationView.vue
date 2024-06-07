<script setup>
   import { inject, onMounted, ref } from "vue";
   import ConfirmationDialog2 from "../components/ConfirmationDialog2.vue";
   
   const dialogRef = inject('dialogRef');
   const mounted = ref(false);
   const report = ref({});
   const currentStatus = ref();
   const statuses = ref(["Open", "In Progress", "Resolved"]);
   const ignoreConfirmationmessage = "Are you sure you want to OVERRULE and IGNORE the reported post?";
   const showIgnoreConfirmation = ref(false);

   onMounted(() => {
      console.log("lkj");
      report.value = dialogRef.value.data.report;
      checkProgressStatus(report.value.status);
      mounted.value = true;
   })

   const closeDialog = () => {
      dialogRef.value.close();
   }

   const checkProgressStatus = (reportStatus) => {
      if (reportStatus !== "Open" && reportStatus !== "In Progress") {
         currentStatus.value = "Resolved";
      } else {
         currentStatus.value = reportStatus;
      }
   }

   const confirmIgnore = () => {
      showIgnoreConfirmation.value = true;
   }
</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <TabView v-if="mounted">
            <TabPanel header="Case">
               <div class="grid grid-cols-4 gap-3">
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
                     <ScrollPanel class="tst p-4">
                        <h4 class="font-bold">{{ report.type }}</h4>
                        <p>Reported content here</p>
                     </ScrollPanel>
                  </div>
                  <div class="col-4">
                     <button @click="confirmIgnore" class="col-12 mb-3">Overrule and Ignore</button>
                     <button class="col-12 mb-3">Suspend Reported User</button>
                     <button class="col-12 mb-3">Send Message</button>
                     <button class="col-12 mb-3">Delete</button>
                     <Dropdown v-model="currentStatus" :options="statuses"
                        placeholder="Status" class="col-12" />
                  </div>
               </div>
            </TabPanel>
            <TabPanel header="Reported History">
            </TabPanel>
            <TabPanel header="Reporter History">
            </TabPanel>
         </TabView>
      </div>
   </div>

   <ConfirmationDialog2 :title="''" :body="ignoreConfirmationmessage"  :show="showIgnoreConfirmation" />
</template>

<style scoped>
   .tst {
      border: 2px solid black;
      width: auto;
      height: 100%;
   }
   
</style>