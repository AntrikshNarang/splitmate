async function getmessages() {
    let parent = document.getElementById('activityDiv')
    let result = await fetch("https://splitmate.onrender.com/api/auth/messages", {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let data = await result.json();
    console.log(data)
    for (let i = 0; i < data.messages.length; i++) {
      let msgDiv = document.createElement('div');
      msgDiv.classList.add('mb-1')
      msgDiv.textContent = `${i + 1}) ${data.messages[0]}`;
      parent.appendChild(msgDiv);
    }
    if (data.messages.length == 0) {
      parent.innerHTML = `<h6 class="text-secondary">No Messages :(<br> Check Back Later!</h6>`;
    }
  }
  getmessages();