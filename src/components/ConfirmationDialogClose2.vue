<template>
  <Dialog :visible="show" :style="{'min-width': '20vw'}">
    <template #container="{ closeCallback }">
      <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
          <i class="pi 
pi-exclamation-circle  text-5xl"></i>
        </div>
        <span class="text-2xl block mb-2 mt-4" v-html="title"></span>
       
        <div class="flex align-items-center gap-2 mt-4">
          <Button :label="buttonLabel" @click="handleClose(); closeCallback"></Button>
        </div>
      </div>
    </template>
  </Dialog>
  <Toast />
</template>

<script setup>
  import { defineProps, defineEmits, watch } from 'vue';
  // import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";

  const props = defineProps({
    title: {
      type: String,
      default: 'Are you sure?'
    },
    show : {
      type:Boolean,
      default: false
    },
    buttonLabel : {
      type: String,
      default: "Close"
    },
    toasts : {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['close']);

  // const confirm = useConfirm();
  const toast = useToast();

  const closeDialog = () => {
    emit('close');
  };

  // watch(() => props.show, (newValue) => {
  //   if (newValue) {
  //     requireConfirmation();
  //   } else {
  //     closeDialog();
  //   }
  // });

  const handleClose = () => {
    if (props.toasts) {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }
    closeDialog();
  };


  // const requireConfirmation = () => {
  //   confirm.require({
  //     group: 'headless',
  //     header: props.title,
  //     message: props.body,
  //     accept: () => handleClose(() => {}),
  //     reject: () => handleReject(() => {})
  //   });
  // };
</script>
