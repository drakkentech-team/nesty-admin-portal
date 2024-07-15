<script setup>
import {ref, onMounted, inject, computed} from 'vue';
  import { useToast } from "primevue/usetoast";
  import ConfirmationDialog from "@/components/ConfirmationDialog2.vue";
  import {editGroup, getGroupInfo} from "@/api/manageGroups";
  import ConfirmationDialogClose from "@/components/ConfirmationDialogClose2.vue";


  const toast = useToast();

  const editable  = ref(false);

  const options = ref({province:[],region:[]})


  const showDeleteConfirmation = ref(false);

  const confirmDialogTitle = ref('');
  const confirmDialogMessage = ref('');
  const confirmedDialogMessage = ref('');
  const showDeleteConfirmed = ref(false);


  const handleConfirm = () => {
    if (showDeleteConfirmation.value) {
      getReasonForDeleting();
    }
    closeConfirmDialog();
  }


  const closeConfirmDialog = () => {
    showConfirmDialog.value = false;
    confirmDialogTitle.value = '';
    confirmDialogMessage.value = '';
  }

  const showConfirmDialog = computed({
    get() {
      return showDeleteConfirmation.value
    },
    set(newValue) {
      if (newValue === false) {
        showDeleteConfirmation.value = false;
      }
    }
  })


const showConfirmedDialog = computed({
  get() {
    return showDeleteConfirmed.value
  },
  set(newValue) {
    if (newValue === false) {
      showDeleteConfirmed.value = false;

    }
  }
})

  const deleteDialog = ref(false);

  const confirmDeleteGroup = ()=>{
    confirmDialogTitle.value = `Selected to DELETE \n<b>${groupData.value.name}</b>`;
    confirmDialogMessage.value = "This action is <b>permanent</b>, are you sure you want to continue?";
    showDeleteConfirmation.value = true;
  }

  const getReasonForDeleting=()=>{
    deleteDialog.value = true;
  }


  const deleteGroupInfo=async()=>{
    try {

      deleteDialog.value = false;
      //await  deleteGroup(groupID);// todo end point to be implemented
      toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted Group', life: 3000 });

      confirmedDialogMessage.value = `<b>${groupData.value.name}</b> has been DELETED`;
      showDeleteConfirmed.value  = true;

      //closeDialog();
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
      group_type_fk: 3,
      description: "Just a test",
    }

    await editGroup(groupID.value, payload)
    toast.add({severity: 'success', summary: 'Success', detail: 'Updated !!!', life: 3000});

  } catch (error) {

    toast.add({severity: 'error', summary: 'Danger', detail: 'Error Saving, Please try again!!!', life: 3000});
  } finally {

  }
}



const groupData = ref(
    {}
);

onMounted(() => {
  const params = dialogRef.value.data;
  groupID.value = params.group.group_sid;

  options.value = {...params.options}

  getGroupInfo(params.group.group_sid).then((data) => {
    groupData.value = data.group_info[0];
    users.value = data.user_info;

    for (const dataKey in options.value.provinces) {
      if( options.value.provinces[dataKey].name=== groupData.value.province){
        groupData.value.province = options.value.provinces[dataKey].sid;
        break;
      }
    }

    for (const dataKey in options.value.regions) {
      if( options.value.regions[dataKey].name=== groupData.value.region){
        groupData.value.region = options.value.regions[dataKey].sid;
        break;
      }
    }

  });






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
          <InputText :disabled="!editable" id="group_name" v-model="groupData.group_name" aria-describedby="group-help" />
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
      <Dropdown :disabled="!editable" option-value="sid" id="province" v-model="groupData.province" :options="options.provinces" optionLabel="name" placeholder="Select a Province" />
    </div>
    <div class="my-5">
      <span><b>Region : </b></span>
      <Dropdown :disabled="!editable" option-value="sid" id="region" v-model="groupData.region"  :options="options.regions" optionLabel="name" placeholder="Select a Religion"  />
    </div>

    <div class="flex justify-content-center m-5">
      <Button v-if="!editable" severity="danger"   label="Delete Group" icon="pi pi-trash" iconPos="right" @click="confirmDeleteGroup" />
      <Button class="m-2" v-if="editable" severity="danger" label="Cancel" icon="pi pi-times" iconPos="right" @click="editable=false" />
      <Button class="m-2" v-if="editable" label="Save" icon="pi pi-check" iconPos="right" @click="submitNewGroupDetails" />

    </div>
    <Divider/>

    <DataTable :value="users" paginator :rows="5" showGridlines sortMode="multiple" tableStyle="min-width: 50rem">
      <Column field="user_username"  sortable header="Username"></Column>
      <Column field="user_email"  sortable header="Email"></Column>
      <Column field="user_mobile_number"  sortable header="Contact Number"></Column>
      <Column field="user_region"  sortable header="Region"></Column>
      <Column field="child_age_group"  sortable header="Child Age Group"></Column>
    </DataTable>
  </div>

  <Dialog v-model:visible="deleteDialog" :style="{}" header="Delete Group" :modal="true" class="p-fluid">


    <div class="field col-12">
      <Textarea id="description" placeholder="Reasons For Deleting" v-model="group.reasons" autoResize rows="5" cols="30" />
    </div>

    <template #footer>
      <Button label="Save" icon="pi pi-check" text @click="deleteGroupInfo" />
    </template>
  </Dialog>

  <ConfirmationDialog :title="confirmDialogTitle" :body="confirmDialogMessage"
                      :show="showConfirmDialog" @close="closeConfirmDialog" @confirm="handleConfirm" />
  <ConfirmationDialogClose :title="confirmedDialogMessage" buttonLabel="Close"
                           :show="showConfirmedDialog" @close="showConfirmedDialog=false; closeDialog();" />

</template>



