<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__wrapper l-container">
      <li class="breadcrumbs__item">
        <nuxt-link class="breadcrumbs__link" to="/">
          HOME
        </nuxt-link>
      </li>
      <li class="breadcrumbs__item">
        >
      </li>
      <li class="breadcrumbs__item" v-if="custom">
        {{ custom }}
      </li>
      <li class="breadcrumbs__item" v-if="!isCreate">
        {{ getPostData.title }}
      </li>
      <li class="breadcrumbs__item" v-if="isCreate">
        Create New Post
      </li>
      
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('post', ['getPostData'])
  },
  props: {
    isCreate: Boolean,
    custom: String
  }
}
</script>
