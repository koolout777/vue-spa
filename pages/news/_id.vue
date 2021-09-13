<template>
  <div>
    <Breadcrumbs :isCreate="isCreate"/>
    <div class="post">
      <div class="post__wrapper l-container">
        <div class="post__edit">
          <nuxt-link :to="'/post'" class="post__edit-link" v-if="getLogin == 'true'">Edit Post</nuxt-link>
        </div>
        <p class="post__date">{{ getPostData.createdAt ? (getPostData.createdAt).match(/^([\S]+)/g).toString().replace(/[[\]]/g,'') : "" }}</p>
        <h2 class="post__title">{{ getPostData.title }}</h2>
        <div class="post__image" :style="{ backgroundImage: `url('${getPostData.image ? getPostData.image : '/no-image.png'}')`}"></div>
        <p class="post__content">{{ getPostData.content}}</p>
        <div class="post-comment">
          <h3 class="post-comment__header">COMMENT</h3>
          <ul class="post-comment__list">
            <li class="post-comment__list-item" v-for="(comment, i) in getPostData.comments" :key="i">
              <p class="post-comment__content">{{ comment.content }}</p>
              <span class="post-comment__date">{{ doGetTime(comment.createdAt) }}</span>
            </li>
          </ul>
          <form action="" class="post-comment__box">
            <textarea class="post-comment__input" placeholder="Write comment" ref="cbox" v-model="comment"></textarea>
            <div class="post-comment__button-wrapper">
              <input type="button" class="post-comment__button" @click="doAddComment()" value="SUBMIT">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['getAuth', 'getLogin']),
    ...mapGetters('post', ['getPostData'])
  },
  
  middleware: 'newsPost',

  data() {
    return {
      postData: [],
      comment: "",
      isCreate: false
    }
  },
  components: {
    Breadcrumbs
  },
  
  beforeRouteLeave: function(to, from, next) {
    if (to.name != "post") {
      this.setPostData([]);
    }
    next();
  },

  methods: {
    ...mapActions('post', ['postComment', 'fetchPostContent']),
    ...mapMutations('post', ['setPostData']),

    doGetTime(data) {
      let date = new Date();
      let postDate = new Date(data);

      let diffTime = Math.abs(date - postDate);
      
      let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));       
      let diffHour = Math.floor((diffTime / (1000 * 60 * 60)).toFixed(1));
      let diffMin = Math.floor((diffTime / (1000 * 60)).toFixed(1));
      let diffSec = Math.floor((diffTime / 1000).toFixed(1));

      let diffMonth = (date.getFullYear()*12 + date.getMonth()) - (postDate.getFullYear()*12 + postDate.getMonth());
      let result;

      if (diffMonth != 0) {
        result = diffMonth > 1 ? diffMonth + " months ago" : diffMonth + " month ago";
      }

      if (diffMonth == 0) {
        result = diffDays > 1 ? diffDays + " days ago" : diffDays + " day ago";
      }

      if (diffMonth == 0 && diffDays == 0) {
        result =  diffHour > 1 ? diffHour + " hours ago" : diffHour + " hour ago" ;
      }

      if (diffMonth == 0 && diffDays == 0 && diffHour == 0) {
        result =  diffMin > 1 ? diffMin + " minutes ago" : diffMin + " minute ago" ;
      }

      if (diffMonth == 0 && diffDays == 0 && diffHour == 0 && diffMin == 0) {
        result =  diffSec > 1 ? " Few seconds ago" : "Just now" ;
      }

      return result;
    },

    doAddComment() {
      if (this.comment != "") {
        this.postComment(this.comment);
        this.fetchPostContent();
        this.postData = this.getPostData;
        this.comment = "";
      }
      else {
        this.$nextTick(() => {
          this.$refs.cbox.focus()
        })
      }
    }
  }
}
</script>

