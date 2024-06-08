<template>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
          <i :class="`${icon} text-5xl`"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-4">{{ title }}</span>
        <p v-show="twoButton" class="mb-0">{{ body }}</p>
        <div class="flex align-items-center gap-2 mt-4">
          <Button :label="confirmLabel" @click="handleAccept(acceptCallback)"></Button>
          <Button v-show="twoButton"  :label="cancelLabel" outlined @click="handleReject(rejectCallback)"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <Toast />
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue';
import { useConfirm } from "primevue/useconfirm";
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
  icon:{
    type:String,
    default:'pi pi-question'
  },
  twoButton:{
    type: Boolean,
    default: false
  },
  confirmLabel:{
    type: String,
    default: 'Save'
  },
  cancelLabel:{
    type:String,
    default: 'Cancel'
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirm = useConfirm();
const toast = useToast();

const closeDialog = () => {
  confirm.close();
};

watch(() => props.show, (newValue) => {
  if (newValue) {
    requireConfirmation();
  } else {
    closeDialog();
  }
});

const handleAccept = () => {
  toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  emit('confirm');
  closeDialog();
};

const handleReject = () => {
  toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  emit('cancel');
  closeDialog();
};

const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: props.title,
    message: props.body,
    accept: () => handleAccept(() => {}),
    reject: () => handleReject(() => {})
  });
};
</script>
