<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Expenses</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input required type="email" v-model="email" class="form-control" placeholder="E-mail" />
        </div>
        <div class="form-group">
          <input
            required
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Senha"
          />
        </div>
        <button class="btn btn-primary btn-block" :disabled="loading">
          <template v-if="loading">
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar
            <i class="fa fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      loading: false,
      email: "",
      password: ""
    };
  },
  methods: {
    async doLogin() {
      this.loading = true;
      const { email, password } = this;

      try {
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        window.uid = res.user.uid;

        this.$router.push({ name: "home" });
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    beforeRouteEnter(to, from, next) {
      console.log('Entrei no beforeRouterEnter')
      next(vm => {
        if (window.uid) {
          console.log('UID do usuário logado: ' + window.uid)
          vm.$router.push({ name: "home" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 18pt;
  }
  .card {
    width: 30%;
    color: var(--dark);
  }
}
</style>
