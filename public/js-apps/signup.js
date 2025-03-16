let username = document.getElementById("username");
let password1 = document.getElementById("password");
let password2 = document.getElementById("repeat-password");
let btn = document.getElementsByClassName("login-btn")[0];

function SignUp() {
  if (password1 !== password2) {
    //if the passwords were the same 
    let buff = {
      username: username.value,
      password: password1.value
    };

    fetch("http://127.0.0.1:3000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buff)
    }).then(data => {
      console.log("something went wrong in the server during adding the user to the database : ", data);
      //need to show a message in web tho ... i hate to just console.log the fucking statement .
    });


  } else {
    //if password were not the same
    window.alert("passwords are not match");
  }
}
