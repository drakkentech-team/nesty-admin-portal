<script setup>
   import {  ref, onMounted ,inject} from 'vue';
   import { useToast } from "primevue/usetoast";
   import {fetchUserHistory, fetchUserGroups} from '@/api/mobileAppUsers';
   import SuspensionView from "@/views/SuspensionView.vue";

   const toast = useToast();
   const reports = ref([]);
   const groups = ref([]);




   const dialogRef = inject('dialogRef');

   const user = ref(
    {
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        date_of_birth: '',
        gender: '',
        username: '',
        province: ''
      }
   );

   const showSuspendDialog = ref(false);



   const suspendUser = () => {
     showSuspendDialog.value = true;
   }

   onMounted(() => {
     const params = dialogRef.value.data;
     user.value = params.user;
     console.log(params.user);
     const userID = 0;//todo get user id clicked

     fetchUserGroups(userID).then((data) => {
       groups.value = data;
     });

     fetchUserHistory(userID).then((data) => {
       reports.value = data;
     });
    });







</script>


<template>
    <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div/>
          <Button icon="pi pi-minus-circle" @click="suspendUser" label="Suspend User" severity="danger"  />
        </div>

        <TabView class="tabview-custom">
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-id-card" style="font-size: 1.5rem"></i>
                        <span class="font-bold white-space-nowrap">User Details</span>
                    </div>

                </template>
                <div class="grid grid-cols-3 gap-4">
                    <div class="col">
                      <h5><b>First Name</b> : {{user.first_name}}</h5>
                      <h5><b>Gender</b> : {{user.gender}}</h5>
                      <h5><b>Date Of Birth</b> : {{user.email}}</h5>
                    </div>
                    <div class="col" >
                      <h5><b>Surname</b> : {{user.last_name}}</h5>
                      <h5><b>Cell</b> : {{user.contact}}</h5>
                      <h5><b>Province</b> : {{user.province}}</h5>
                    </div>
                    <div>
                      <h5><b>Username</b> : {{user.username}}</h5>
                      <h5><b>Email</b> : {{user.email}}</h5>
                      <h5><b>Status</b> : {{user.status}}</h5>
                    </div>

                </div>

                <DataTable :value="groups"  paginator :rows="5" showGridlines tableStyle="min-width: 50rem">
                    <Column field="group_name" header="Group Name"></Column>
                    <Column field="location" header="Location"></Column>
                    <Column field="suburb" header="Suburb"></Column>
                    <Column field="privacy" header="Private/Public"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>

            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-history" style="font-size: 1.5rem"></i>
                        <span class="font-bold white-space-nowrap">User History</span>
                    </div>
                </template>

                <DataTable :value="reports"  paginator sortable :rows="5"  showGridlines tableStyle="min-width: 50rem">
                    <Column field="date" sortable header="Date"></Column>
                    <Column field="reported_by"  sortable header="Reported By"></Column>
                    <Column field="posted_by" sortable header="Posted By"></Column>
                    <Column field="reason" sortable header="Reason"></Column>
                    <Column field="type" sortable header="Type"></Column>
                    <Column field="group" sortable header="Group"></Column>
                    <Column field="date_posted" sortable header="Date Posted"></Column>
                    <Column field="status" sortable header="Status"></Column>
                </DataTable>

            </TabPanel>
        </TabView>
      <SuspensionView :user="user" :show="showSuspendDialog" @close="showSuspendDialog = false" />
    </div>


</template>



