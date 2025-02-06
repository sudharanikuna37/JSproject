var btn=document.getElementById("btn");
var full_name=document.getElementById("name");
var email=document.getElementById("email");
var msg=document.getElementById("message")
btn.addEventListener("click",()=>{
    if(full_name.value==""||email.value==""||msg.value==""){
        alert("Please provide the required information.")
    }
    else{
        alert(`Your Message was submitted. We will update you soon through Email.\n Thank you ${full_name.value} `)

    }
   
})