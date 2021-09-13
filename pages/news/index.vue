<template>
  <div>
    <Breadcrumbs :custom="'News'"/>
    <News />
  </div>
</template>

<script>
import News from '~/components/News.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  middleware: ['newsList'],
  components: {
    News,
    Breadcrumbs
  }
}
</script>

