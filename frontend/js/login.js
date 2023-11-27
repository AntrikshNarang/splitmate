function makeError(str){
    let errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = null;
    errorDiv.innerHTML = str;
}
async function submitForm(e){
    e.preventDefault();
    let useremail = document.getElementById('useremail').value;
    let password = document.getElementById('password').value;

    let response = await fetch("https://splitmate.onrender.com/api/auth/login",{
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({email: useremail, password})
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