function makeError(str){
    let errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = null;
    errorDiv.innerHTML = str;
}
async function submitForm(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let useremail = document.getElementById('useremail').value;
    let password = document.getElementById('password').value;
    let cpassword = document.getElementById('cpassword').value;

    if(password != cpassword){
        makeError("Password do not Match");
        return;
    }

    let response = await fetch("https://splitmate.onrender.com/api/auth/createuser",{
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({name: username, email: useremail, password})
    })
    let json = await response.json();
    console.log(json);
    if(json.success == true){
        console.log('Logged in Successfully');
        localStorage.setItem('token', json.authToken);
        window.location.href = "dashboard.html";
    }
    else{
        makeError(json.error);
    }
}