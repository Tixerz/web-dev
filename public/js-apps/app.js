let input1 = document.getElementById("username");
let input2 = document.getElementById("password");
let btn = document.getElementById("login-btn");

function send_data(){
    let buffer = {
        username : input1.value , 
        password : input2.value
    };
    fetch("http://127.0.0.1:3000/login" , {
        method:"POST" , 
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(buffer)
    }).then(res => {
        return res.json();
    }).then(data =>{
        if(data.status == "true"){
            try{
                sessionStorage.setItem("token" , data.token);
                window.location.replace("http://127.0.0.1:3000/dashbord");
            }catch{
                console.log("something went wrong with saving the token inside the browser")
            }
        }else{
            //show error
            window.alert("username/password is incorrect");
        }
    })
}
btn.addEventListener('click' , send_data);