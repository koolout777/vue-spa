<template>
  <div class="news">
    <div class="news__wrapper l-container">
      <div class="news-header">
        <h3 class="news-header__text">NEWS</h3>
        <div class="news-header__post">
          <nuxt-link :to="'/post'" class="news-header__post-link" v-if="getLogin == 'true'">Create New Post</nuxt-link>
        </div>
      </div>
      <ul class="news-list" >
        <li v-for="(news, i) in this.getAllPosts" :key="i">
          <nuxt-link class="news-item" :to="'/news/'+ news.id">
            <div class="news-item__image" :style="{ backgroundImage: `url('${news.image ? news.image : 'no-image.png'}')`}"></div>          
            <span class="news-item__date" v-if="news.createdAt != null">{{ (news.createdAt).match(/^([\S]+)/g).toString().replace(/[[\]]/g,'') }}</span>
            <p class="news-item__text">{{ news.title }}</p>
          </nuxt-link>
        </li>
      </ul>
      <div class="news__load-more" v-if="this.getLoadMoreState == false">
        <button @click="loadMore()" class="news__load-button">LOAD MORE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('news',['getAllPosts', 'getPostOffset', 'getLoadMoreState']),
    ...mapGetters('user', ['getAuth', 'getLogin'])
  },

  data() {
    return {
      loadCount: 0      
    }
  },
  methods: {
    ...mapMutations('news', ['setPosts', 'setPostOffset']),
    ...mapActions('news',['loadNews']),

    loadMore(){
      this.loadNews({
        count: this.loadCount, 
        offset: this.getPostOffset,
        limit: 6
      });
    }
  }
}
</script>

<style scoped>

</style>
