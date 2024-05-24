<template>
    <div class="confirm-dialog-overlay" v-if="show">
      <div class="confirm-dialog">
        <div class="confirm-dialog-header">
          <h3>{{title}}</h3>
        </div>
        <div class="confirm-dialog-body">
          <p>{{body}}</p>
        </div>
        <div class="confirm-dialog-footer">
          <button @click="onCancel">Cancel</button>
          <button @click="onConfirm">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title:{
        type: String,
        required: true,
        default: 'Confirm Logout'
      },
      body:{
        type: String,
        required: true,
        default: 'Are you sure you want to logout?'
      }
    },
    emits: ['confirm', 'cancel'],
    methods: {
      onConfirm() {
        this.$emit('confirm');
      },
      onCancel() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  .confirm-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
  }
  
  .confirm-dialog {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .confirm-dialog-header,
  .confirm-dialog-footer {
    margin-bottom: 20px;
    text-align: center;
  }
  
  button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

.confirm-dialog-footer button {
  margin: 0 10px;
  color: #fff; 
  background-color: #5c7cfa;
}

.confirm-dialog-footer button:hover {
  background-color: #4b6cb7;
}

.confirm-dialog-footer button:nth-child(1) {
  background-color: #f03e3e; 
}

.confirm-dialog-footer button:nth-child(1):hover {
  background-color: #c92a2a; 
}

.confirm-dialog-footer button:nth-child(2) {
  background-color: #22b8cf;
}

.confirm-dialog-footer button:nth-child(2):hover {
  background-color: #15aabf; 
}
  </style>
  