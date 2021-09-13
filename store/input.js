import axios from 'axios'

export const state = () => ({
  isPosted: null
})

export const getters = {
  getIsPosted: (state) => state.isPosted
}

export const mutations = {
  setIsPosted: (state, getIsPosted) => (state.isPosted = getIsPosted)
}

export const actions = {
  async createPost({commit}, data) {
    let jsonData = JSON.stringify({
      query: 'mutation {\n  addPost(\n		post: {\n      title: "'+data.title+'",\n      content: "'+data.content+'",\n      image: "'+data.image+'"\n    }\n  ) {\n    id, title, content\n  }\n}',
      variables: {}
    });
  
    let config = {
      method: 'post',
      url: 'http://localhost:4000/graphql',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': data.authHeader
      },
      data : jsonData
    };
  
    axios(config).then((response)=> {
      if (response.data.errors == undefined) {
        commit('setIsPosted', true);
      }
      else {
        commit('setIsPosted', false);
      }
    });
  }, 
  async updatePost({commit}, data) {
    let jsonData = JSON.stringify({
      query: 'mutation {\n  updatePost(\n		post: {\n      title: "'+data.title+'",\n      id: '+data.id+',\n      image: "'+data.image+'",\n      content: "'+data.content+'"\n    }\n  ) {\n    id\n  }\n}',
      variables: {}
    });
  
    let config = {
      method: 'post',
      url: 'http://localhost:4000/graphql',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': data.authHeader
      },
      data : jsonData
    };
  
    axios(config).then((response)=> {
      if (response.data.errors == undefined) {
        commit('setIsPosted', true);
      }
      else {
        commit('setIsPosted', false);
      }
    });
  }
}