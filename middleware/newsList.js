import axios from 'axios'
  
export default function ({store}) {
  let result;
  let data = JSON.stringify({
    query: 'query{\n  posts(\n    pagination: {\n      limit: '+store.getters['news/getPostLimit']+',\n      offset: 0\n    }\n  ){\n    id, title, image, createdAt\n  }\n}',
    variables: {}
  });

  let config = {
    method: 'post',
    url: 'http://localhost:4000/graphql',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then((response)=>{
    result = response.data.data.posts;
    store.commit("news/setPosts", result);
    store.commit('news/setLoadMoreState', false);
  })
}
