export default function ({store}) {
  if(localStorage.getItem("isLoggedIn") == null) {
    localStorage.setItem("isLoggedIn", false);
  }

  if(localStorage.getItem("auth") == null) {
    localStorage.setItem("auth", "");
  }

  let state = localStorage.getItem("isLoggedIn");
  let auth = localStorage.getItem('auth');
  store.commit("user/setLogin", state);
  store.commit("user/setAuth", auth);

}