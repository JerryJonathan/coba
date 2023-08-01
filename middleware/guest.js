export default function ({ store, redirect }) {
   
      if (store.state.auth.loggedIn) {
        redirect('/dashboard')
      }
    }

// export default (to, from, next) => {
//     if (window.App.user) {
//       next({ name: "dashboard" });
//     } else {
//       next();
//     }
//   };

// export default function guest({next,store}){

//     let isLoggedIn = false // Can be calculated through store
 
//     if(isLoggedIn){
 
//      return next({
 
//          name: 'dashboard'
 
//      })
 
//     }
 
//     return next();
 
//  }