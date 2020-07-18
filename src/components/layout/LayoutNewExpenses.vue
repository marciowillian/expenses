<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="showModal = true" class="btn btn-lg btn-outline-primary w-75">
      <i class="fa fa-plus"></i>
      Novo gasto
    </button>

    <form @submit.prevent="submit()">
      <div
      class="modal fade"
      :class="{show: showModal}"
      :style="{display: showModal ? 'block' : 'none'}"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLiveLabel">Adicionar novo gasto</h5>
            <button type="button" class="close" @click="closeModal()" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group col-8">
                <label for="">Descrição:</label>
                <input v-model="form.description" type="text" class="form-control" required>
              </div>
              <div class="form-group col-4">
                <label for="">Valor (R$):</label>
                <input v-model="form.value" type="text" class="form-control" required>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal()">Fechar</button>
            <button @click="submit()" class="btn btn-primary">
              Incluir novo gasto
              </button>
          </div>
        </div>
      </div>
    </div>

    </form>
    <div
      class="modal-backdrop fade"
      :style="{display: showModal ? 'block' : 'none'}"
      :class="{show: showModal}"
    ></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showModal: false,
    form: {
      value: '',
      description: ''
    }
    }),
  methods: {
    submit () {
      console.log('ok')
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
