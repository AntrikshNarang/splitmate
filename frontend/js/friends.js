function makeError(str) {
    let errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = null;
    errorDiv.innerHTML = str;
  }
  async function getFriends() {
    let result = await fetch("https://splitmate.onrender.com/api/friends/getfriends", {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let data = await result.json();
    let parent = document.getElementById('friendsList');
    for (let friend of data.friendList) {
      let frnd = document.createElement('div');
      frnd.classList.add('mb-1')
      frnd.textContent = friend.name;
      parent.appendChild(frnd);
    }
    if (data.friendList.length == 0) {
      parent.innerHTML = `<h6 class="text-secondary">You don't have any Friends :(</h6>`;
    }
  }
  async function acceptRequest(id) {
    let result = await fetch(`https://splitmate.onrender.com/api/friends/acceptfriend/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let data = await result.json();
    if (data.success == true) {
      window.location.href = "";
    }
    else {
      console.log(data.error);
    }
  }
  async function getRequests() {
    let result = await fetch("https://splitmate.onrender.com/api/friends/getfriendrequests", {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let data = await result.json();
    let parent = document.getElementById('pendingRequests');
    for (let friend of data.friendList) {
      let child = document.createElement('div');
      child.style.display = 'flex';
      child.classList.add('mb-1')
      child.style.justifyContent = 'space-between';
      child.style.alignItems = 'center';
      let frnd = document.createElement('span');
      frnd.textContent = friend.name;
      let btn = document.createElement('button');
      btn.classList.add('btn');
      btn.classList.add('btn-sm');
      btn.classList.add('btn-primary');
      btn.textContent = 'Accept Request';
      btn.onclick = () => acceptRequest(friend.id)
      child.appendChild(frnd);
      child.appendChild(btn);
      parent.appendChild(child);
    }
    if (data.friendList.length == 0) {
      parent.innerHTML = '<h6 class="text-secondary">No Friend Requests Received</h6>';
    }
  }
  async function searchFriend(e) {
    e.preventDefault();
    let searchValue = document.getElementById('searchBox').value;
    if (searchValue.length == 0) {
      makeError('Enter a Search Value');
      return;
    }
    let result = await fetch(`https://splitmate.onrender.com/api/friends/search/${searchValue}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let data = await result.json();
    if (data.results.length == 0) {
      makeError("No Users found with the email/username")
      return;
    }
    let parent = document.getElementById('modal-body');
    for (let friend of data.results) {
      let child = document.createElement('div');
      child.classList.add('mb-2');
      child.classList.add('d-flex');
      child.classList.add('flex-column');
      child.innerHTML = `Name: <p class="text-secondary mb-0">${friend.name}</p>Email: <p class="text-secondary mb-0">${friend.email}</p>`
      let btn = document.createElement('button');
      btn.classList.add('btn');
      btn.classList.add('btn-sm');
      btn.classList.add('btn-primary');
      btn.textContent = 'Send Request';
      btn.onclick = () => sendRequest(friend.id)
      child.appendChild(btn);
      parent.appendChild(child);
    }
  }
  async function sendRequest(id) {
    console.log(id)
    let result = await fetch(`https://splitmate.onrender.com/api/friends/addFriend/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let data = await result.json();
    if (data.success == true) {
      window.location.href = "";
    }
    else {
      makeError(data.error);
      console.log(data.error);
    }
  }
  getFriends();
  getRequests();