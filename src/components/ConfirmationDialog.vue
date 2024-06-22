<template>
  <div>
    <ConfirmDialog group="headless">
      <template #container="{ message, accept, reject }">
        <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
          <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
            <i :class="`${icon} text-5xl`"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-4">{{ title }}</span>
          <span class="mb-0">{{ body }}</span>
          <div class="flex align-items-center gap-2 mt-4">
            <Button :label="confirmLabel" @click="handleAccept(accept)"></Button>
            <Button v-show="showTwoButtons" :label="rejectLabel" outlined @click="handleReject(reject)"></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </div>

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
  show: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'pi pi-question'
  },
  showTwoButtons: {
    type: Boolean,
    default: true
  },
  confirmLabel: {
    type: String,
    default: 'Save'
  },
  rejectLabel: {
    type: String,
    default: 'Cancel'
  }
});

const emit = defineEmits(['confirm', 'cancel']);

const confirmService = useConfirm();
const toast = useToast();

const closeDialog = () => {
  confirmService.close();
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

const handleReject = (rejectCallback) => {
  toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  emit('cancel');
  rejectCallback();
  closeDialog();
};

const requireConfirmation = () => {
  confirmService.require({
    group: 'headless',
    header: props.title,
    message: props.body,
    accept: handleAccept,
    reject: handleReject
  });
};
</script>
