// export default function ({ $axios, $auth }) {
//     $axios.onError((error) => {
//       console.log(error);
//       if (error.response.status === 401) {
//         $auth.logout();
//         location.reload(true);
//       }
//     })
//   }

  // export default function auth ({ next, store }){
  //   if(!store.getters.auth.loggedIn){
  //       return next({
  //          name: '/users/login'
  //       })
  //   }
   
  //   return next()
  //  }

  // export default function ({ $axios, redirect }) {
  //   $axios.onError((error) => {
  //     if (error.response.status === 500) {
  //      redirect('/error')
  //     }
  //   })
  // }

  // export default (to, from, next) => {
  //   if (!window.App.user) {
  //     window.location.href = "/login";
  //   } else {
  //     next();
  //   }
  // };

  // export default function ({ store, redirect }) {
   
  //   if (store.state.auth.loggedIn) {
  //     redirect('/users/login')
  //   }
  // }