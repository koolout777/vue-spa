<template>
  <div>
    <Slider />
    <News />
  </div>
</template>

<script>
import Slider from '~/components/Slider.vue'
import News from '~/components/News.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  middleware: ['newsList'],
  components: {
    Slider,
    News
  },
  
  beforeRouteEnter (to, from, next) { 
    next(vm => { 
      vm.$store.commit("news/setPostOffset", 6);
      next();
    }) 
  },

  method: {
    ...mapMutations('news', ['setPostOffset'])
  }
}
</script>

