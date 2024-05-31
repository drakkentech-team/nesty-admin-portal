<script setup>
   import { computed, ref, onMounted } from 'vue';
   import { createNews, getNews, updateNews } from '../api/news';
   import { useToast } from "primevue/usetoast";
   import { getMobileUsers } from '../api/mobileAppUsers';
   import { todayDate } from "../utilities/common"
   
   const toast = useToast();


</script>
	
<template>
    <div class="card">
        
        <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>User Management> App Users</span>
        
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
                        <h4>First Name :</h4>
                        <h4>Gender :</h4>
                        <h4>Date Of Birth :</h4>
                    </div>
                    <div class="col" >
                        <h4>Surname :</h4>
                        <h4>Cell :</h4>
                        <h4>Province :</h4>
                    </div>
                    <div>
                        <h4>Username :</h4>
                        <h4>Email :</h4>
                        <h4>Status :</h4>
                    </div>
                    
                </div>

                <DataTable :value="products" showGridlines tableStyle="min-width: 50rem">
                    <Column field="code" header="Group Name"></Column>
                    <Column field="name" header="Loacation"></Column>
                    <Column field="category" header="Suburb"></Column>
                    <Column field="quantity" header="Private/Public"></Column>
                    <Column field="quantity" header="Status"></Column>
                </DataTable>

            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-history" style="font-size: 1.5rem"></i>
                        <span class="font-bold white-space-nowrap">User History</span>
                    </div>
                </template>

                <DataTable :value="products" showGridlines tableStyle="min-width: 50rem">
                    <Column field="code" header="Date"></Column>
                    <Column field="name" header="Reported By"></Column>
                    <Column field="category" header="Posted By"></Column>
                    <Column field="quantity" header="Reason"></Column>
                    <Column field="quantity" header="Type"></Column>
                    <Column field="quantity" header="Group"></Column>
                    <Column field="quantity" header="Date Posted"></Column>
                    <Column field="quantity" header="Status"></Column>
                </DataTable>
                
            </TabPanel>
        </TabView>
    </div>
</template>



