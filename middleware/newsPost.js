import axios from 'axios'
  
export default function ({store, route}) {
  let result;
  let data = JSON.stringify({
    query: 'query{\n  post(\n   id: '+route.params.id+'\n  ){\n    id, title, content, image, createdAt, comments {\n      id, content, createdAt\n    }\n  }\n}',
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
    result = response.data.data.post;
    store.commit("post/setPostData", result);
    store.commit("post/setPostId", route.params.id);
  })
}
