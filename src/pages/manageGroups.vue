<script setup>
  import {onMounted, ref, defineAsyncComponent, computed, watch} from 'vue';
  import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";
  import {createGroup, fetchGroups, fetchMetaData} from "@/api/manageGroups";
  import { useStore } from '@/stores/store';
  import { useDialog } from 'primevue/usedialog';
  import ConfirmationDialogClose from "@/components/ConfirmationDialogClose2.vue";

   const advancedSearchView = defineAsyncComponent(() => import('../views/AdvancedSearch.vue'));
   const userView = defineAsyncComponent(() => import('../views/GroupDetailsView.vue'));

   const handleSearchViewClick = () => {
      dialog.open(advancedSearchView, {
        data:{

        },
        props: {
          header: 'Advanced Search',
          style: {
            width: '50vw',
          },
          breakpoints:{
            '960px': '75vw',
            '640px': '90vw'
          },
          modal: true,
        },
        onClose: (options) => {

          if(options.data === undefined || options.data.buttonType==='Cancel'){
            toast.add({ severity: 'error', summary: 'Search Cancelled', detail: '', life: 3000 });
          }else {
            searchGroup(options.data)
          }
        }
      });
    }


const dialog = useDialog()
   const userID = ref();

   const isSearch =  ref(false);


  const toast = useToast();
  const confirm = useConfirm();


   const searchDialog = ref(false);
   const newDialog = ref(false);

   const confirmedDialogMessage = ref('');
   const showSaveConfirmed = ref(false);

const showConfirmedDialog = computed({
  get() {
    return showSaveConfirmed.value ;
  },
  set(newValue) {
    if (newValue === false) {
      showSaveConfirmed.value = false;
    }
  }
})

   const validationErrors = ref({
     group_name: null,
     province: null,
     region: null,
     min_age: null,
     max_age: null,
     description: null,
     reason_for_creation:null
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
       reason_for_creation: null
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


     return isValid;
   };

const createNewGroupDetails = async () => {

  if (validateCreateForm()){
    try {

      const payload = {
        name: createForm.value.group_name,
        province_fk: createForm.value.province,
        region_fk: createForm.value.region,
        description: createForm.value.description,
        group_type_fk: createForm.value.group_type,
        admin_user_fk: userID.value,
        reason_for_event:"New Group",
        reason_for_creation: createForm.value.reason_for_creation
      }

      await createGroup( payload);
      groupsData.value = await fetchGroups();
      newDialog.value = false;
      confirmedDialogMessage.value = `<b>${payload.name}</b> has been CREATED `;
      showSaveConfirmed.value  = true;
      toast.add({ severity: 'success', summary: 'Success', detail: 'group created!!!', life: 3000 });

       }
       catch (error) {
         console.error("Error Creating Group:", error);
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



const options = ref();



const createForm = ref({
  group_name:'',
  province:'',
  region:'',
  description:'',
  group_type:'',
  reason_for_creation:''
})

const filteredRegions = computed(() => {
  return options.value ? options.value.regions.filter(region => region.province_fk === createForm.value.province) : [];
});


watch(() => createForm.value.province, (newProvince, oldProvince) => {
  if (newProvince !== oldProvince) {
    createForm.value.region = '';
  }
});


const handleViewClick = (event) => {
  dialog.open(userView, {
    data:{
     group : {...event.data},
      options: {...options.value}
    },
    props: {
      header: 'Group Details',

      breakpoints:{
        '960px': '75vw',
        '640px': '90vw'
      },
      modal: true
    },
    onClose: () => {
      fetchGroups().then((data) => {
        groupsData.value = data;
      });


    }
  });
}


const searchGroup= async(searchForm)=>{

  //todo connect search endpoint
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




const clearSearchResults=async ()=>{
  fetchGroups().then((data)=>{
    groupsData.value = data;
  });
  isSearch.value = false;
  toast.add({ severity: 'success', summary: 'Success', detail: 'Retrieving Groups', life: 3000 });
}

onMounted(() => {
  const user = useStore()
  userID.value = user.user.user.sid;

  fetchGroups().then((data) => {
    groupsData.value = data;
  });

  fetchMetaData().then((data)=>{
    options.value= data;
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
                        @click="handleSearchViewClick"
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
                     data-key="sid"
                     sortField="group_name" :sortOrder="-1"
                     selection-mode="single"
                     @rowClick="handleViewClick"

                  >
                     <Column field="group_name" sortable header="Group Name"></Column>
                     <Column field="group_type"  sortable header="Private/Public"></Column>
                     <Column field="region" sortable header="Region"></Column>
                     <Column field="user_count" sortable header="User Count"></Column>
                  </DataTable>


               <Dialog :dismissableMask="true"  v-model:visible="newDialog" :style="{width: '450px'}" header="Create Group" :modal="true" class="p-fluid">
                 <div class="grid">
                <div class="field col-6">
                  <label for="group_name"><b>Group Name</b></label>
                        <InputText id="group_name" placeholder="Enter group name" v-model="createForm.group_name" aria-describedby="group-help" />
                        <template v-if="validationErrors.group_name">
                          <small style="color: red">{{ validationErrors.group_name }}</small>
                        </template>
                    </div>
                    <div class="field col-6">
                      <label for="province"><b>Province</b></label>
                        <Dropdown id="province" option-value="sid" v-model="createForm.province" :options="options.provinces" optionLabel="name" placeholder="Select a Province" />
                      <template v-if="validationErrors.province">
                        <small style="color: red">{{ validationErrors.province }}</small>
                      </template>
                    </div>

                    <div class="field col-6">
                      <label for="region"><b>Region</b></label>
                        <Dropdown empty-message="Please select a province first to view available regions." id="region" option-value="sid" v-model="createForm.region" :options="filteredRegions" optionLabel="name" placeholder="Select a Region"  />
                        <template v-if="validationErrors.region">
                          <small style="color: red">{{ validationErrors.region }}</small>
                        </template>
                    </div>

                 <div class="field col-6">
                   <label for="group_type"><b>Group Type</b></label>
                   <Dropdown id="group_type" option-value="sid" v-model="createForm.group_type" :options="options.group_type" optionLabel="name" placeholder="Select a Group Type"  />
                   <template v-if="validationErrors.region">
                     <small style="color: red">{{ validationErrors.region }}</small>
                   </template>
                 </div>

                  <div class="field col-12">
                    <label  for="region"><b>Description</b></label>
                    <Textarea id="description" placeholder="Group Description" v-model="createForm.description" autoResize rows="5" cols="30" />
                    <template v-if="validationErrors.description">
                      <small style="color: red">{{ validationErrors.description }}</small>
                    </template>
                  </div>
                 <div class="field col-12">
                   <label for="reason_for_creation"><b>Reason For Creation</b></label>
                   <Textarea id="reason_for_creation" placeholder="Reason For Creation" v-model="createForm.reason_for_creation" autoResize rows="5" cols="30" />
                   <template v-if="validationErrors.reason_for_creation">
                     <small style="color: red">{{ validationErrors.reason_for_creation }}</small>
                   </template>
                 </div>
                 </div>

                     <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text @click="newDialog=false"/>
                        <Button label="Save" icon="pi pi-check" text @click="createNewGroupDetails" />
                     </template>
               </Dialog>
               </template>
         </Card>
		</div>
    <div class="m-5 flex flex-row-reverse ">
      <Button @click="clearSearchResults" v-show="isSearch" label="Return To Search"/>
    </div>
	</div>

  <ConfirmationDialogClose :title="confirmedDialogMessage" buttonLabel="Close"
                           :show="showConfirmedDialog" @close="showConfirmedDialog=false" />

  <DynamicDialog />
</template>

