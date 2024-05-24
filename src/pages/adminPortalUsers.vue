<script setup>
   
   import { ref, onMounted, vModelCheckbox } from 'vue';
   import { fetchAdminPortalUsers, createAdminPortalUser, updateAdminPortalUser } from '../api/adminPortalUsers';
   import { useToast } from "primevue/usetoast";
   import ConfirmationDialogClose from '../components/ConfirmationDialogClose.vue';
   import ConfirmationDialog from '../components/ConfirmationDialog.vue'


   const users = ref([]);
   const user = ref(null);
   const addUsersDialog = ref(false);
   const editDialog = ref(false);
   const saved = ref(false);
   const spinner = ref(false);
   const toast = useToast();
   const confirmationDialog = ref(false);
   const confirmationDialogClose = ref(false);
   const confirmationDialogTitle = ref('');
   const confirmationDialogBody = ref('');

   components:['ConfirmationDialogClose', 'ConfirmationDialog']

   onMounted(() => {
      fetchAdminPortalUsers().then((data) => {
         users.value = data;
      });
   });

   const usersForm = ref({
      email: "",
      password: "",
      is_admin: false
   })


   const editUser = (data) => {
      user.value = {...data};
      editDialog.value = true;
   };

   const saveEditUser = (data) => {
      user.value = {...data};
      editDialog.value = false;
      confirmationDialogClose.value= true;
      confirmationDialogTitle.value = "Updated successfully!";
   };

   const confirmDeleteUser=(data)=>{
      console.log(data);
      confirmationDialogTitle.value = "Delete User";
      confirmationDialogBody.value = "Are you Sure you want to delete";
      confirmationDialog.value= true;

   }

   const deleteUser=(data)=>{
      console.log(data);
      confirmationDialogTitle.value = "Deleted successfully!";
      confirmationDialog.value = false;
      confirmationDialogClose.value= true;

   }

   const saveUser = async() => {
        try {
         await createAdminPortalUser({
            email: usersForm.value.email,
            password: usersForm.value.password,
            is_admin: usersForm.value.is_admin,
         });
         const data = await fetchAdminPortalUsers();
         users.value = data;
      } 
      catch (error) {
        console.error("Error in saveUser:", error);
      } 
      finally {
        spinner.value = false;
        addUsersDialog.value = false;
        toast.add({ severity: 'success', summary: 'Success', detail: 'User Created', life: 3000 });
        //newsForm.value = intialNewsForm();
        confirmationDialogClose.value= true;
        confirmationDialogTitle.value = "User Created successfully!";
      }

      
   };

   const closeDialog = () => {
      editDialog.value = false;
      saved.value = false;
   };

</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title> 
            
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>User Management</span>
                  <Button 
                     label="Create User" 
                     icon="pi pi-plus" 
                     severity="info" 
                     @click="addUsersDialog=true"
                  />
               </div>
            
            </template>
               <template #content>
                  <DataTable 
                     :value="users"
                     paginator :rows="5" 
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                  >
                     
                     <Column field="email" header="Email"></Column>
                     <Column field="userRole" header="User Role"></Column>
                     <Column field="lastLogin" header="Last Login"></Column>
                    
                     <Column header="Actions" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                           <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editUser(slotProps.data)" />
                           <Button :icon="'pi pi-trash'" outlined rounded  @click="confirmDeleteUser(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>

                  <ProgressSpinner v-model:visible="spinner"/>

                  <Dialog :dismissableMask="true" v-model:visible="addUsersDialog" :style="{width: '450px'}" header="Create User" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="email" class="bold-label">Email</label>
                           <InputText id="name" v-model.trim="usersForm.email" required="true" autofocus :class="{'p-invalid': saved && !usersForm.email}" />
                           <small class="p-error" v-if="saved && !usersForm.email">email is required.</small>
                        </div>
            
                        <div class="field col-12">
                           <label for="password" class="bold-label">Password</label>
                           <Password id="password" type v-model.trim="usersForm.password" toggleMask required="true" autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="saved && !usersForm.password">Password is required.</small>
                        </div>
                        
                           <div class="flex align-items-center justify-center">
                              <label for="admin" class="bold-label">Admin</label>
                              <Checkbox id="admin" type v-model="usersForm.is_admin" :binary="true"  autofocus  />
                           </div>
                     </div>
                     
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="addUsersDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
                     </template>
                  </Dialog>


                  <Dialog :dismissableMask="true" v-model:visible="editDialog" :style="{width: '450px'}" header="Edit User" :modal="true" class="p-fluid">
                     <div class="formgrid grid">
                        <div class="field col">
                           <label for="title" class="bold-label">Email</label>
                           <InputText id="name" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': saved && !usersForm.email}" />
                           <small class="p-error" v-if="saved && !user.email">email is required.</small>
                        </div>
                        <div class="field col-12">
                           <label for="password" class="bold-label">Password</label>
                           <Password id="password" type v-model.trim="user.password" required="true" toggleMask autofocus :class="{'p-invalid': saved && !usersForm.password}" />
                           <small class="p-error" v-if="saved && !user.password">Password is required.</small>
                        </div>
                        
                           <div class="flex align-items-center">
                              <label for="title" class="bold-label">Admin</label>
                              <Checkbox id="name" type v-model="user.is_admin" :binary="true"  autofocus  />
                           </div>

                     </div>
                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
                        <Button label="Save" icon="pi pi-check" text @click="saveEditUser" />
                     </template>
                  </Dialog>

               </template>
         </Card>
		</div>
	</div>

   <ConfirmationDialogClose :title="confirmationDialogTitle" :show="confirmationDialogClose" @cancel ="confirmationDialogClose=false"/>
   <ConfirmationDialog :title="confirmationDialogTitle" :body="confirmationDialogBody"  :show="confirmationDialog" @cancel ="confirmationDialog=false" @confirm="deleteUser"/>
</template>

