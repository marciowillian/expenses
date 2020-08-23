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
                  <input v-model="form.description" type="text" class="form-control" required />
                </div>
                <div class="form-group col-4">
                  <label for="">Valor (R$):</label>
                  <input v-model="form.value" type="text" class="form-control" required />
                </div>
              </div>
            </div>

            <div class="form-group flex-column col-12 d-flex align-items-center">
              <input 
                ref="input"
                type="file"
                class="d-none"
                accept="image/*"
                @change="handleFile($event)"
              >

              <button
                type="button" class="btn w-50 btn-outline-secondary"
                @click="openFileDialog()"
                >
                Adicionar Comprovante
              </button>

              <div class="mt-2" v-if="form.receipt">
                {{ form.receipt.name }}
                <button
                  type="button"
                  @click="form.receipt = ''"
                  class="btn badge badge-light"
                  >
                    <i class="fa fa-trash text-danger"></i>
                  </button>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal()">Fechar</button>
              <button class="btn btn-primary">Incluir novo gasto</button>
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
      receipt: "",
      value: "",
      description: "",
    },
  }),
  computed: {
    fileName () {
      const { receipt } = this.form
      if (receipt) {
        const  split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },
    async submit() {
      let url = ''

      try {
        
      this.$root.$emit('Spinner::show')
      const ref = this.$firebase.database().ref(window.uid)
      const id = ref.push().key

      if(this.form.payload) {
        const snapshot = await this.$firebase.storage()
        .ref(window.uid)
        .child(this.fileName)
        .put(this.form.receipt)

        const url = await snapshot.ref.getDownloadURL()
      }

      const payload = {
        id,
        ...this.form,
        receipt: url,
        createdAt: new Date().getTime()
      }

      ref.child(id).set(payload, err => {
        this.$root.$emit('Spinner::hide')
        if(err) {
          console.error(err)
        } else {
          this.closeModal()
        }
      })
      } catch (err) {
        console.error(err)
      } finally {
        this.$root.$emit('Spinner::hide')
      }
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
