<template>
  <div>
    <Breadcrumbs :isCreate="getPostState.isCreate" />
    <div class="input">
      <div class="input__wrapper l-container" v-if="getLogin == 'true'">
        <div class="input__edit">
          <button class="input__edit-link input__edit-link--save" @click="doPost">Save Post</button>
          <a @click="doAlert('create')" v-if="getPostState.isCreate" class="input__edit-link">Cancel</a>          
          <a @click="doAlert('edit')" v-if="getPostState.isUpdate" class="input__edit-link">Cancel</a>
        </div>
        <p class="input__date" v-if="getPostState.isCreate">{{ this.doGetDate() }}</p>
        <p class="input__date" v-if="getPostState.isUpdate">{{ getPostData.createdAt ? (getPostData.createdAt).match(/^([\S]+)/g).toString().replace(/[[\]]/g,'') : ""  }}</p>
        <textarea class="input__title" ref="ctitle" placeholder="Title" v-model="postTitle" />
        <div class="input__image" :style="{ backgroundImage: 'url(' + postImage + ')' }">
          <label class="input__button">
            <input type="file" class="input__button--hide" @change="previewFiles"/>
            UPLOAD IMAGE
          </label>
        </div>
        <textarea class="input__content" placeholder="Content" ref="cinput" v-model="postContent"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  components: {
    Breadcrumbs,
  },

  computed: {
    ...mapGetters("user", ["getAuth", "getLogin"]),
    ...mapGetters("input", ["getIsPosted"]),
    ...mapGetters("notification", ["getAlertOpen", "getAlertType", "getAlertResult"]),
    ...mapGetters("post", ["getPostData", "getPostState"]),
  },

  data() {
    return {
      postTitle: "",
      postContent: "",
      postImage: "",
      postDate: ""
    };
  },

  watch: {
    getIsPosted: function () {
      if (this.getIsPosted != null) {
        if (this.getIsPosted) {
          if (this.getPostState.isCreate) {
            this.$router.push("/");
            this.setNotification("Post created successfully.");
          } else {
            this.$router.push("/news/" + this.getPostData.id);
            this.setNotification("Post updated successfully.");
          }
        } else {
          this.setNotification("Unable to post. Unauthorized login.");
        }
        this.setIsPosted(null);
      }
    },

    getAlertResult: function () {
      if(this.getAlertResult == true && this.getAlertType == "edit") {
        this.$router.push('/news/'+ this.getPostData.id);
        this.setAlertType("");
        this.setAlertResult(null);
      }

      else if(this.getAlertResult == false && this.getAlertType == "edit") {
        this.setAlertType("");
        this.setAlertResult(null);
      }

      if(this.getAlertResult == true && this.getAlertType == "create") {
        this.$router.push('/');
        this.setAlertType("");
        this.setAlertResult(null);
      }

      else if(this.getAlertResult == false && this.getAlertType == "create") {
        this.setAlertType("");
        this.setAlertResult(null);
      }
    }
  },
  fetch() {
    this.postTitle = this.getPostData.title == undefined ? "" : this.getPostData.title;
    this.postContent = this.getPostData.content == undefined ? "" : this.getPostData.content;
    this.postImage = this.getPostData.image == undefined ? "" : this.getPostData.image;
    this.postDate = this.getPostData.createdAt == undefined ? "" : this.getPostData.createdAt;

    if (this.postTitle) {
      this.setPostState({ isCreate: false, isUpdate: true });
    } else {
      this.setPostState({ isCreate: true, isUpdate: false });
    }
  },

  beforeRouteLeave: function (to, from, next) {
    this.setPostData([]);
    next();
  },
  methods: {
    ...mapActions("input", ["createPost", "updatePost"]),
    ...mapMutations("input", ["setIsPosted"]),
    ...mapMutations("post", ["setPostData", "setPostState"]),
    ...mapMutations("notification", ["setNotification", "setAlertOpen", "setAlertType", "setAlertMsg", "setAlertResult"]),

    doGetDate() {
      let date = new Date();

      return date.getFullYear()+'.'+("0" + (date.getMonth() + 1)).slice(-2)+'.'+("0" + (date.getDate())).slice(-2);
    },

    previewFiles(event) {
      let that = this
      let file = event.target.files[0];
      let reader = new FileReader();
      if(file) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = function () {
        that.postImage =  reader.result;
      }
    },

    doPost() {
      if (this.postTitle != "" && this.postContent != "") {
        if (this.getPostState.isUpdate) {
          this.updatePost({
            id: this.getPostData.id,
            image: this.postImage,
            title: this.postTitle,
            content: this.postContent,
            authHeader: this.getAuth,
          });
        } else {
          this.createPost({
            title: this.postTitle,
            content: this.postContent,
            image: this.postImage,
            authHeader: this.getAuth,
          });
        }

        this.resetFields();
      }
    },

    resetFields() {
      this.postTitle = "";
      this.postContent = "";
    },

    doAlert(data) {
      if (data == "edit") {
        this.setAlertMsg("Discard post edit?");
        this.setAlertOpen(true);
        this.setAlertType('edit');
      }
      else if (data == "create") {
        this.setAlertMsg("Discard post create?");
        this.setAlertOpen(true);
        this.setAlertType('create');
      }
    }
  },
};
</script>