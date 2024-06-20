<script setup>
   import {  ref, onMounted ,inject} from 'vue';
   import { useToast } from "primevue/usetoast";
   import {fetchUserHistory, fetchUserGroups} from '@/api/mobileAppUsers';

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



   const suspendUser = () => {
     //todo implement moderation
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
          <Button icon="pi pi-minus-circle" label="Suspend User" severity="danger"  />
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
                      <h4><b>First Name</b> : {{user.first_name}}</h4>
                      <h4><b>Gender</b> : {{user.gender}}</h4>
                      <h4><b>Date Of Birth</b> : {{user.email}}</h4>
                    </div>
                    <div class="col" >
                      <h4><b>Surname</b> : {{user.last_name}}</h4>
                      <h4><b>Cell</b> : {{user.contact}}</h4>
                      <h4><b>Province</b> : {{user.province}}</h4>
                    </div>
                    <div>
                      <h4><b>Username</b> : {{user.username}}</h4>
                        <h4><b>Email</b> : {{user.email}}</h4>
                        <h4><b>Status</b> : {{user.status}}</h4>
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

                <DataTable :value="reports" paginator :rows="5"  showGridlines tableStyle="min-width: 50rem">
                    <Column field="date" header="Date"></Column>
                    <Column field="reported_by" header="Reported By"></Column>
                    <Column field="posted_by" header="Posted By"></Column>
                    <Column field="reason" header="Reason"></Column>
                    <Column field="type" header="Type"></Column>
                    <Column field="group" header="Group"></Column>
                    <Column field="date_posted" header="Date Posted"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>

            </TabPanel>
        </TabView>
    </div>
</template>



