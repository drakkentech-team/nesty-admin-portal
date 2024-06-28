<script setup>
import {  ref, onMounted ,inject} from 'vue';
import { useToast } from "primevue/usetoast";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";


const toast = useToast();

const editable  = ref(false);

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
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],
  group: [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],email : [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ],

})

const confirmationDialog = ref(false);
const confirmationDialogClose = ref(false);
const confirmationDialogTitle = ref('Are you sure?');
const confirmationDialogBody = ref('Please confirm to proceed.');
const callback = ref()
const deleteDialog = ref(false);

const confirmDeleteGroup = ()=>{
  confirmationDialogTitle.value = "Delete Group";
  confirmationDialogBody.value = "Are you sure you want to delete?";
  callback.value = getReasonForDeleting;
  confirmationDialog.value= true;
}

const getReasonForDeleting=()=>{
  deleteDialog.value = true;
}


const deleteGroup=async()=>{
  try {

    deleteDialog.value = false;
    toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted Group', life: 3000 });
    closeDialog();
  }
  catch (error) {
    toast.add({ severity: 'error', summary: 'Danger', detail: 'Error  Searching, Please try again!!!', life: 3000 });
  } finally {

  }
}






const dialogRef = inject('dialogRef');

const closeDialog = () => {
  dialogRef.value.close();
}

const group = ref(
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


const users = ref();
const groupID = ref();


const submitNewGroupDetails = async () => {

  editable.value = false;

  try {

    const payload = {
      name: groupData.value.group_name,
      province_fk: groupData.value.province,
      region_fk: groupData.value.region,
      group_type_fk: groupData.value.group_type
    }
    await editGroup(groupID, payload)
    toast.add({severity: 'success', summary: 'Success', detail: 'Updated !!!', life: 3000});

  } catch (error) {

    toast.add({severity: 'error', summary: 'Danger', detail: 'Error Saving, Please try again!!!', life: 3000});
  } finally {

  }
}




onMounted(() => {
  const params = dialogRef.value.data;
  groupID.value = params.group.group_sid;


  getGroupInfo(params.group.group_sid).then((data) => {

    groupData.value = data.group_info[0];
    groupData.value.province = 1;
    groupData.value.region = 1;
    users.value = data.user_info;
  });

  groupData.value.province = 1;
  groupData.value.region = 1;


  console.log(groupData);


});

</script>


<template>
  <div class="card">
    <Divider/>
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span class="font-bold white-space-nowrap"></span>
      <Button icon="pi pi-pencil" rounded @click="editable=true" :disabled="editable" />
    </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="col">
          <span><b>Group Name : </b> </span>
          <InputText :disabled="!editable" id="group_name" :placeholder="groupData.group_name" :value="groupData.group_name" v-model="groupData.group_name" aria-describedby="group-help" />
        </div>
        <div class="col" >
          <span><b>Number of Members : </b>  </span>
          <InputText disabled id="group_name" placeholder="Enter Number of Member" v-model="groupData.user_count" aria-describedby="group-help" />
        </div>

        <div class="col" >
          <span><b>Created : </b> </span>
          <InputText disabled id="date_created" placeholder="Enter Date Created" v-model="groupData.date_created" aria-describedby="group-help" />
        </div>

      </div>

    <Divider/>

    <div>
      <span><b>Province : </b></span>
      <Dropdown :disabled="!editable" option-value="sid" id="province" v-model="groupData.province" :options="options.province" optionLabel="name" placeholder="Select a Province" />
    </div>
    <div class="my-5">
      <span><b>Region : </b></span>
      <Dropdown :disabled="!editable" option-value="sid" id="region" v-model="groupData.region" :options="options.region" optionLabel="name" placeholder="Select a Religion"  />
    </div>

    <div class="flex justify-content-center m-5">
      <Button v-if="!editable" severity="danger"   label="Delete Group" icon="pi pi-trash" iconPos="right" @click="confirmDeleteGroup" />
      <Button class="m-2" v-if="editable" severity="danger" label="Cancel" icon="pi pi-times" iconPos="right" @click="editable=false" />
      <Button class="m-2" v-if="editable" label="Save" icon="pi pi-check" iconPos="right" @click="submitNewGroupDetails" />

    </div>
    <Divider/>

    <DataTable :value="users" paginator :rows="5" showGridlines sortMode="multiple" tableStyle="min-width: 50rem">
      <Column field="username"  sortable header="Username"></Column>
      <Column field="email"  sortable header="Email"></Column>
      <Column field="contact"  sortable header="Contact Number"></Column>
      <Column field="region"  sortable header="Region"></Column>
      <Column field="child_age_group"  sortable header="Child Age Group"></Column>
    </DataTable>
  </div>

  <Dialog v-model:visible="deleteDialog" :style="{}" header="Delete Group" :modal="true" class="p-fluid">


    <div class="field col-12">
      <Textarea id="description" placeholder="Reasons For Deleting" v-model="group.reasons" autoResize rows="5" cols="30" />
    </div>

    <template #footer>
      <Button label="Save" icon="pi pi-check" text @click="deleteGroup" />
    </template>
  </Dialog>

  <ConfirmationDialog :twoButton="!confirmationDialogClose" :confirmLabel="confirmLabel" :rejectLabel="rejectLabel" :icon ="'pi pi-question'" :title="confirmationDialogTitle" :body="confirmationDialogBody"  :show="confirmationDialog" @cancel ="confirmationDialog=false" @confirm="callback"/>

</template>



