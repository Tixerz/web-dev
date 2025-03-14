let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let btn = document.getElementById("btn");

function send_data(){
    let buffer = {
        email : input1.value , 
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
    }).then(data => {
        window.alert(data.status);
    });
}
btn.addEventListener('click' , send_data);