<template>
    <Dialog :visible="show" >
      <template #container="{ closeCallback }">
        <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
          <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
            <i class="pi pi-question text-5xl"></i>
          </div>
          <span class="text-2xl block mb-2 mt-4" v-html="title"></span>
          <p class="mb-0" v-html="body"></p>
          <div class="flex align-items-center gap-2 mt-4">
            <Button :label="acceptLabel" @click="handleAccept(); closeCallback"></Button>
            <Button :label="rejectLabel" outlined @click="handleReject(); closeCallback"></Button>
          </div>
        </div>
      </template>
    </Dialog>
  
    <Toast />
  </template>
  
<script setup>
  import { defineProps, defineEmits, watch } from 'vue';
  import { useToast } from "primevue/usetoast";

  const props = defineProps({
    title: {
      type: String,
      default: 'Are you sure?'
    },
    body: {
      type: String,
      default: 'Please confirm to proceed.'
    },
    show : {
      type:Boolean,
      default: false
    },
    toasts : {
      type: Boolean,
      default: false
    },
    acceptDetail : {
      type: String,
      default: 'You have accepted'
    },
    rejectDetail : {
      type: String,
      default: 'You have rejected'
    },
    acceptLabel : {
      type: String,
      default: 'Yes'
    },
    rejectLabel : {
      type: String,
      default: 'No'
    }
  });

  const emit = defineEmits(['confirm', 'cancel', 'close']);

  const toast = useToast();

  const closeDialog = () => {
    emit('close');
  };

  const handleAccept = () => {
    if (props.toasts) {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: props.acceptDetail, life: 3000 });
    }
    emit('confirm');
    closeDialog();
  };

  const handleReject = () => {
    if (props.toasts) {
      toast.add({ severity: 'error', summary: 'Rejected', detail: props.rejectDetail, life: 3000 });
    }
    emit('cancel');
    closeDialog();
  };
</script>
  