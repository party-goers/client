function onSignIn(googleUser) {
    // // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "post",
        url: "http://localhost:3000/users/googleSignIn",
        data: {
            id_token
        }
    })
    .done(respone=>{
        console.log(respone)
    })
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }