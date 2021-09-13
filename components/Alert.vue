<template>
  <div class="alert-box" v-if="getAlertOpen">
    <p class="alert-text">{{ this.getAlertMsg }}</p>
    <div class="alert-wrapper">
      <button class="alert-button alert-button--yes" @click="doModal(true)">Confirm</button>
      <button class="alert-button alert-button--no" @click="doModal(false)">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters("notification", ["getAlertOpen", "getAlertMsg"])
  },

  methods: {
    ...mapMutations("notification", ["setAlertResult", "setAlertOpen", "setAlertMsg"]),

    doModal(data) {
      this.setAlertResult(data);
      this.setAlertMsg("");
      this.setAlertOpen(false);
    }
  }
}
</script>