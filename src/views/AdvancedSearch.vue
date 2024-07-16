<script setup>

  import {inject, onMounted, ref} from "vue";
  import {fetchGroups} from "@/api/manageGroups";
  import {fetchMobileUsers} from "@/api/mobileAppUsers";

  const dialogRef = inject('dialogRef');

  const searchForm = ref({
    keyword_search:'',
    last_name:'',
    first_name:'',
    email:'',
    username:'',
    group:'',
    date:''
  })



  const closeDialog = (e) => {
    dialogRef.value.close(e);
  };


  const users = ref([]);
  const groups = ref([]);

  onMounted(() => {

    fetchMobileUsers().then((data)=>{
      users.value = data;
    })

    fetchGroups().then((data) => {
      groups.value = data;
    });
  });


</script>


<template>
  <div class="form grid my-5">
    <div class="field col-6 my-3">
      <label for="keyword"><b>Keyword Search</b></label>
      <InputText class="w-full md:w-80" type="text" v-model="searchForm.keyword_search" placeholder="Keyword Search" />

    </div>
    <div class="field col-6 my-3">
      <label for="username"><b>Username</b></label>
      <MultiSelect class="w-full md:w-80" v-model="searchForm.username" filter display="chip" :options="users" optionLabel="username" placeholder="Select Username"  />
    </div>

    <div class="field col-6 my-3">
      <label for="name"><b>Name</b></label>
      <MultiSelect class="w-full md:w-80" id="name" v-model="searchForm.first_name" filter display="chip"  :options="users" optionLabel="first_name" placeholder="Select Name" />
    </div>

    <div class="field col-6 my-3">
      <label for="last_name"><b>Last Name</b></label>
      <MultiSelect class="w-full md:w-80" id="last_name" v-model="searchForm.last_name" filter display="chip"  :options="users" optionLabel="last_name " placeholder="Select Name" />

    </div>
    <div class="field col-6 my-3">
      <label for="email"><b>Email</b>></label>
      <MultiSelect class="w-full md:w-80" id="email"  v-model="searchForm.email" filter display="chip"  :options="users" optionLabel="email" placeholder="Select Email" :maxSelectedLabels="3"  />
    </div>
    <div class="field col-6 my-3">
      <label for="group"><b>Group</b></label>
      <MultiSelect class="w-full md:w-80" id="group" v-model="searchForm.group" filter display="chip"  :options="groups" optionLabel="group_name" placeholder="Select Group"  />
    </div>

    <FloatLabel class="field col-12 my-5">
      <label for="date"><b>Date Filter</b></label>
      <Calendar class="w-full md:w-80" id="date" v-model="searchForm.date" selectionMode="range"  :manualInput="false" showIcon iconDisplay="input" />
    </FloatLabel>

  </div>
  <div class="flex justify-content-end">
    <Button label="Cancel"  icon="pi pi-times" text @click="closeDialog({ buttonType: 'Cancel' } )"/>
    <Button label="Search" icon="pi pi-search" text @click="closeDialog({buttonType: 'Success' ,...searchForm})" />
  </div>
</template>



