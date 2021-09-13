<template>
  <div>
    <Header :class="getAlertOpen ? 'disabled': ''"/>
    <nuxt class="base-content" :class="getAlertOpen ? 'disabled': ''"/>
    <Notification />
    <Alert />
    <Footer :class="getAlertOpen ? 'disabled': ''"/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Notification from "~/components/Notification.vue"
import Alert from "~/components/Alert.vue"
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Footer,
    Notification,
    Alert
  },
  computed: {
    ...mapGetters('user', ['getModalOpen']),
    ...mapGetters('notification', ['getAlertOpen'])
  },
  data() {
    return {
      bodyClass: ""
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: this.bodyClass,
      }
    }
  },

  watch: {
    getModalOpen: function() {
      if(this.getModalOpen) {
        this.bodyClass = "scroll-lock";
      }
      else {
        this.bodyClass = "";
      }
    }, 

    getAlertOpen: function() {
      if(this.getAlertOpen) {
        this.bodyClass = "scroll-lock";
      }
      else {
        this.bodyClass = "";
      }
    }
  },
}
</script>