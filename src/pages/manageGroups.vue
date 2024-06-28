<script setup>
   import {onMounted, ref,defineAsyncComponent} from 'vue';
   import { useConfirm } from "primevue/useconfirm";
   import ConfirmationDialog from '../components/ConfirmationDialog.vue'
   import { useToast } from "primevue/usetoast";
   import {fetchGroups} from "@/api/manageGroups";

   import { useDialog } from 'primevue/usedialog';
   const userView = defineAsyncComponent(() => import('../views/GroupDetailsView.vue'));

   const dialog = useDialog()

   const isSearch =  ref(false);

   const confirmLabel = ref('Yes');
   const rejectLabel = ref('No');




  const toast = useToast();
  const confirm = useConfirm();


   const confirmationDialog = ref(false);
   const confirmationDialogClose = ref(false);
   const confirmationDialogTitle = ref('Are you sure?');
   const confirmationDialogBody = ref('Please confirm to proceed.');
   const callback = ref()

   const searchDialog = ref(false);
   const newDialog = ref(false);
   const deleteDialog = ref(false);
   const validationErrors = ref({
     group_name: null,
     province: null,
     region: null,
     min_age: null,
     max_age: null,
     description: null,
   });

   const validateCreateForm = () => {
     let isValid = true;
     // Reset validation errors
     validationErrors.value = {
       group_name: null,
       province: null,
       region: null,
       min_age: null,
       max_age: null,
       description: null,
     };

     // Validate group_name
     if (!createForm.value.group_name || createForm.value.group_name.length < 3) {
       validationErrors.value.group_name = 'Group name is required and should be at least 3 characters long.';
       isValid = false;
     }

     // Validate province
     if (!createForm.value.province) {
       validationErrors.value.province = 'Province is required.';
       isValid = false;
     }

     if (!createForm.value.region) {
       validationErrors.value.region = 'Region is required.';
       isValid = false;
     }

     if (!createForm.value.description) {
       validationErrors.value.description = 'Description is required.';
       isValid = false;
     }

     if (!createForm.value.min_age) {
       validationErrors.value.min_age = 'Min Age is required.';
       isValid = false;
     }

     if (!createForm.value.max_age) {
       validationErrors.value.max_age = 'Max Age is required.';
       isValid = false;
     }

     return isValid;
   };

const createGroup = async () => {

  if (validateCreateForm()){
    try {

      const payload = {
        group_name: createForm.value.group_name,
        province: createForm.value.province,
        min_age: createForm.value.min_age,
        max_age: createForm.value.max_age,
        region: createForm.value.region,
        description: createForm.value.description
      }

      await createGroup( payload);
      groupsData.value = await fetchGroups();
      newDialog.value = false;
      toast.add({ severity: 'success', summary: 'Success', detail: 'group created!!!', life: 3000 });

       }
       catch (error) {
         console.error("Error in saveUser:", error);
         toast.add({ severity: 'error', summary: 'Danger', detail: 'Error Deleting User, Please try again!!!', life: 3000 });
       } finally {

       }
  } else {
    toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please check the form fields.', life: 3000 });
  }
};


   const confirm1 = () => {
    confirm.require({
        message: 'Group Created Successfully!',
        header: 'Message Sent!',

        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'No',
        acceptLabel: 'Close',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            addMessage.value = true;

        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
} ;




const groupsData = ref([]);

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);


const options = ref({
  province : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],

region : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],
username : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],
names: [
    {name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],
group: [
    {sid:1, name: 'New York', code: 'NY' },
    {sid:2,  name: 'Rome', code: 'RM' },
    {sid:3,  name: 'London', code: 'LDN' },
    {sid:4,  name: 'Istanbul', code: 'IST' },
    {sid:5, name: 'Paris', code: 'PRS' }
],email : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
],

})

const searchForm = ref({
  keyword_search:'',
  name_surname:'',
  email:'',
  username:'',
  group:'',
  date:''
})


const createForm = ref({
  group_name:'',
  province:'',
  min_age:0,
  max_age:100,
  region:'',
  description:'',
})

const handleViewClick = (event) => {
  dialog.open(userView, {
    data:{
     group : {...event.data}
    },
    props: {
      header: 'Group Details',
      style: {
        width: '90vw',
      },
      breakpoints:{
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true
    },
    onClose: (options) => {
    }
  });
}


const searchGroup= async()=>{

  try {
      searchDialog.value = false;
      toast.add({ severity: 'success', summary: 'Success', detail: 'Searching!!!', life: 3000 });
      isSearch.value = true;

  }
    catch (error) {
      console.error("Error in saveUser:", error);
      toast.add({ severity: 'error', summary: 'Danger', detail: 'Error  Searching, Please try again!!!', life: 3000 });
    } finally {


  }
}


const group= ref();

const confirmDeleteGroup = (currGroup)=>{
  confirmationDialogTitle.value = "Delete Group";
  confirmationDialogBody.value = "Are you sure you want to delete?";
  callback.value = getReasonForDeleting;
  confirmationDialog.value= true;

  group.value = currGroup;
  group.value['reasons'] = '';
}

const deleteGroup=async()=>{
  try {

    deleteDialog.value = false;
    toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted Group', life: 3000 });

  }
  catch (error) {
    toast.add({ severity: 'error', summary: 'Danger', detail: 'Error  Searching, Please try again!!!', life: 3000 });
  } finally {

  }
}

const getReasonForDeleting=()=>{
  deleteDialog.value = true;
}

const getSeverity = (status) => {
    switch (status) {
        case 'Active':
            return 'info';

        case 'Inactive':
            return 'danger';
    }
}


const clearSearchResults=async ()=>{

  fetchGroups().then((data)=>{
    groupsData.value = data;
  });
  isSearch.value = false;
  toast.add({ severity: 'success', summary: 'Success', detail: 'Retrieving Groups', life: 3000 });
}

onMounted(() => {
  fetchGroups().then((data) => {
    groupsData.value = data;
  });
});


</script>

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<Card>
            <template #title>
               <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span>Manage Groups</span>
                  <div >
                    <Button
                        class="mr-5"
                        label="Search"
                        icon="pi pi-search"
                        severity="info"
                        @click="searchDialog=true"
                    />
                    <Button
                        label="New Group"
                        icon="pi pi-plus"
                        severity="info"
                        @click="newDialog=true"
                    />
                  </div>
               </div>
            </template>
               <template #content>
                  <DataTable
                     :value="groupsData"
                     paginator :rows="5"
                     :rowsPerPageOptions="[5, 10, 20, 50]"
                     tableStyle="min-width: 50rem"
                     sortMode="multiple"
                     data-key="sid"
                     selection-mode="single"
                     @rowClick="handleViewClick"

                  >
                     <Column field="name" sortable header="Group Name"></Column>
                     <Column field="long_description"  sortable header="Private/Public"></Column>
                     <Column field="suburb" sortable header="Suburb"></Column>
                     <Column field="user_count" sortable header="user_count"></Column>
                     <Column field="status" sortable header="Group Status">
                      <template #body="{ data }">
                        <Tag :value="data.status" :severity="getSeverity(data.status)" />
                      </template>
                      <template #option="slotProps">
                        <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                      </template>

                    </Column>
                     <Column header="Actions" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                          <Button :icon="'pi pi-trash'" outlined rounded  @click="confirmDeleteGroup(slotProps.data)" />
                        </template>
                     </Column>
                  </DataTable>

                  <Dialog :dismissableMask="true" v-model:visible="searchDialog" :style="{width: '670px'}" header="Advanced Search" :modal="true" class="p-fluid">
                    <div class="field col-12">
                        <label for="username">Username</label>
                        <MultiSelect v-model="searchForm.username" display="chip" :options="options.username" optionLabel="name" placeholder="Select Username"  />

                    </div>
                    <div class="field col-12">
                      <label for="name">Name</label>
                       <MultiSelect id="name" v-model="searchForm.name_surname" display="chip"  :options="options.name" optionLabel="name" placeholder="Select Name" />

                    </div>
                    <div class="field col-12">
                      <label for="email">Email</label>
                      <MultiSelect id="email"  v-model="searchForm.email"  display="chip"  :options="options.email" optionLabel="name" placeholder="Select Email" :maxSelectedLabels="3"  />
                    </div>
                    <div class="field col-12">
                      <label for="name">Group</label>
                      <Dropdown id="group" v-model="searchForm.group"  display="chip"  :options="options.group" optionLabel="name" placeholder="Select Group"  />
                    </div>

                    <div class="field col-12">
                      <label for="group_name">Date Filter</label>
                      <Calendar v-model="searchForm.date" selectionMode="range" :manualInput="false" showIcon iconDisplay="input" />
                    </div>


                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="searchDialog=false"/>
                        <Button label="Search" icon="pi pi-search" text @click="searchGroup" />
                     </template>
               </Dialog>

               <Dialog v-model:visible="deleteDialog" :style="{}" header="Delete Group" :modal="true" class="p-fluid">


                  <div class="field col-12">
                    <Textarea id="description" placeholder="Reasons For Deleting" v-model="group.reasons" autoResize rows="5" cols="30" />
                  </div>

                     <template #footer>
                        <Button label="Save" icon="pi pi-check" text @click="deleteGroup" />
                     </template>
               </Dialog>


               <Dialog :dismissableMask="true" v-model:visible="newDialog" :style="{}" header="Create Group" :modal="true" class="p-fluid">
                <div class="field col-12">
                        <label for="group_name">Group Name</label>
                        <InputText id="group_name" placeholder="Enter group name" v-model="createForm.group_name" aria-describedby="group-help" />
                        <template v-if="validationErrors.group_name">
                          <small style="color: red">{{ validationErrors.group_name }}</small>
                        </template>
                    </div>
                    <div class="field col-12">
                      <label for="province">Province</label>
                        <Dropdown id="province" v-model="createForm.province" :options="options.province" optionLabel="name" placeholder="Select a Province" />
                      <template v-if="validationErrors.province">
                        <small style="color: red">{{ validationErrors.province }}</small>
                      </template>
                    </div>

                    <div class="field col-12">
                      <label for="region">Region</label>
                        <Dropdown id="region" v-model="createForm.region" :options="options.region" optionLabel="name" placeholder="Select a Religion"  />
                        <template v-if="validationErrors.region">
                          <small style="color: red">{{ validationErrors.region }}</small>
                        </template>
                    </div>

                    <div class="field col-12">
                      <label for="min_age">Min Age</label>
                      <InputNumber  id="min_age" v-model="createForm.min_age"  showButtons buttonLayout="vertical" class="m-5" style="width: 3rem" :min="0" :max="99">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                      </InputNumber>
                      <label for="max_age">Max Age</label>
                      <InputNumber v-model="createForm.max_age" showButtons buttonLayout="vertical" class="m-5" style="width: 3rem" :min="0" :max="99">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                      </InputNumber>
                      <template v-if="validationErrors.min_age">
                        <small style="color: red">{{ validationErrors.min_age }}</small>
                      </template>
                      <template v-if="validationErrors.max_age">
                        <small style="color: red">{{ validationErrors.max_age }}</small>
                      </template>
                  </div>

                  <div class="field col-12">
                    <label for="region">Description</label>
                    <Textarea id="description" placeholder="Group Description" v-model="createForm.description" autoResize rows="5" cols="30" />
                    <template v-if="validationErrors.description">
                      <small style="color: red">{{ validationErrors.description }}</small>
                    </template>
                  </div>

                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="newDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="createGroup" />
                     </template>
               </Dialog>
               </template>
         </Card>
		</div>
    <div class="m-5 flex flex-row-reverse ">
      <Button @click="clearSearchResults" v-show="isSearch" label="Return To Search"/>
    </div>
	</div>

  <DynamicDialog />
  <ConfirmationDialog :twoButton="!confirmationDialogClose" :confirmLabel="confirmLabel" :rejectLabel="rejectLabel" :icon ="'pi pi-question'" :title="confirmationDialogTitle" :body="confirmationDialogBody"  :show="confirmationDialog" @cancel ="confirmationDialog=false" @confirm="callback"/>
</template>

