<script setup>
   import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
   import { FilterMatchMode } from "primevue/api";
   import { useDialog } from "primevue/usedialog";
   import { fetchModerationReports } from "@/api/moderation";
   import { storeToRefs } from "pinia";
   import { useModerationStore } from "@/stores/moderationStore";


   const dynamicView = defineAsyncComponent(() => import("../views/ModerationView.vue"));
   const dialog = useDialog();
   const { reloadRequired } = storeToRefs(useModerationStore());

   const reports = ref([]);
   const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      moderation_status: { value: null, matchMode: FilterMatchMode.IN }
   });
   const filterPanel = ref();
   const statusFilterList = ref([]);
   const openStatusCount = ref(0);
   const pendingStatusCount = ref(0);
   const isFiltersEnabled = computed(() => {
      return filters.value['global'].value || filters.value['moderation_status'].value;
   })

   onMounted(() => {
      fetchReports();
   })

   watch(reloadRequired, (newValue) => {
      if (newValue === true) {
         reloadRequired.value = false;
         fetchReports();
      }
   })

   const sortStatuses = (a, b) => {
      const status0 = "Open";
      const status1 = "Pending";

      if (a === b) {
         return 0;
      } else if (a === status0) {
         return 1;
      } else if (b === status0 || b === status1) {
         return -1;
      } else if (a === status1) {
         return 1;
      } else {
         return 0;
      };
   }

   const defaultOrder = (a, b) => {
      var statusOrder = sortStatuses(a.moderation_status, b.moderation_status);
      var dateOrder = new Date(a.date_reported) - new Date(b.date_reported);
      return -statusOrder || -dateOrder;
   }

   const moderate = (event) => {
      dialog.open(dynamicView, {
         props: {
            modal: true,
            // showHeader: false,
            header: ' ',
            style: {
               width: '75vw',
            }
         },
         data: {
            report: event.data
         }
      });
   }

   const toggleFPanel = (e) => {
      statusFilterList.value = filters.value['moderation_status'].value;
      filterPanel.value.toggle(e);
   }

   const filterByStatus = () => {
      if (statusFilterList.value === null || statusFilterList.value.length === 0) {
         filters.value['moderation_status'].value = null;
      } else {
         filters.value['moderation_status'].value = statusFilterList.value;
      }
   }

   const clearFilters = () => {
      for (const field in filters.value) {
         filters.value[field].value = null;
      }
   }

   const countStatuses = () => {
      reports.value.forEach(report => {
         const status = report['moderation_status'];
         if (status === "Open") {
            openStatusCount.value++;
         } else if (status === "Pending") {
            pendingStatusCount.value++;
         } else {
            return;
         }
      });
   }

   const sortReports = () => {
      reports.value.sort((a, b) => defaultOrder(a, b));
      countStatuses();
   }

   const fetchReports = () => {
      fetchModerationReports().then((data) => {
         reports.value = data;
         sortReports();
      });
   }

</script>

<template>
   <div class="p-grid">
      <div class="p-col-12">
         <DynamicDialog />
         <Card>
            <template #title> Moderation </template>
            <template #content>
               <DataTable
                  :value="reports"
                  tableStyle="min-width: 50rem"
                  paginator
                  :rows="5"
                  :rowsPerPageOptions="[5, 10, 20, 50]"
                  removableSort
                  v-model:filters="filters"
                  :globalFilterFields="[
                  ]"
                  filterDisplay="menu"
                  @row-click="moderate"
               >
               <template #header>
                  <div class="flex justify-content-between">
                     <div class="flex justify-content-start">
                        <Button icon="pi pi-filter" outlined @click="toggleFPanel" />
                     </div>
                     <div class="flex justify-content-end gap-5">
                        <Button @click="clearFilters" label="Clear" v-show="isFiltersEnabled" />
                        <IconField iconPosition="left">
                           <InputIcon>
                              <i class="pi pi-search" />
                           </InputIcon>
                           <InputText v-model="filters['global'].value" placeholder="Search" />
                        </IconField>
                     </div>
                  </div>
               </template>
               <Column field="date_reported" header="Date Reported" sortable></Column>
               <Column field="reporting_user" header="Reported By" sortable></Column>
               <Column field="reported_user" header="Posted By" sortable></Column>
               <Column field="reason_for_report" header="Reason" sortable></Column>
               <Column field="report_type" header="Type" sortable></Column>
               <Column field="group" header="Group" sortable></Column>
               <Column field="date_posted" header="Date Posted" sortable></Column>
               <Column field="moderation_status" header="Status" sortable></Column>
            </DataTable>
            </template>
         </Card>
      </div>
   </div>

   <OverlayPanel ref="filterPanel">
      <div class="flex flex-wrap justify-content-center gap-5 mt-3 mb-5">
         <div>
            <Checkbox v-model="statusFilterList" value="Open" />
            <label class="ml-2">Open</label>
            <Badge :value="openStatusCount" />
         </div>

         <div>
            <Checkbox v-model="statusFilterList" value="Pending" />
            <label class="ml-2">Pending</label>
            <Badge :value="pendingStatusCount" />
         </div>

         <div>
            <Checkbox v-model="statusFilterList" value="Resolved" />
            <label class="ml-2">Resolved</label>
         </div>

         <div>
            <Checkbox v-model="statusFilterList" value="Overruled" />
            <label class="ml-2">Overruled</label>
         </div>
      </div>
      <div class="flex justify-content-center gap-5">
         <Button label="Filter" @click="filterByStatus" />
         <Button label="Cancel" @click="toggleFPanel" />
      </div>
   </OverlayPanel>
</template>
