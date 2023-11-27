/* globals Chart:false */

// Line Chart function
(() => {
  'use strict';

  // Sample data for 'This Week' and 'Prev Week'
  const thisWeekData = [1245, 1500, 1350, 2040, 2348, 1305, 2212];
  const prevWeekData = [1850, 2250, 1203, 850, 1550, 2590, 3500];

  // Graphs
  const ctx = document.getElementById('myChart1');
  // eslint-disable-next-line no-unused-vars
  const myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: thisWeekData,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      },
      aspectRatio: 2.5
    }
  });

  // Function to update chart data based on the selected week
  function updateChartData(selectedData) {
    myChart1.data.datasets[0].data = selectedData;
    myChart1.update();
  }

  // Function to toggle dropdown options based on the button label
  function toggleDropdownOptions(buttonLabel) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.innerHTML = ''; // Clear existing options

    if (buttonLabel === 'This week') {
      // If the button label is 'This Week', add the 'Prev Week' option
      const prevWeekOption = document.createElement('a');
      prevWeekOption.classList.add('dropdown-item');
      prevWeekOption.href = '#';
      prevWeekOption.textContent = 'Prev week';
      prevWeekOption.addEventListener('click', function () {
        // Update this with the actual data for the previous week
        updateChartData(prevWeekData);
        document.getElementById('week').textContent = 'Prev week';
      });

      dropdownMenu.appendChild(prevWeekOption);
    } else if (buttonLabel === 'Prev week') {
      // If the button label is 'Prev Week', add the 'This Week' option
      const thisWeekOption = document.createElement('a');
      thisWeekOption.classList.add('dropdown-item');
      thisWeekOption.href = '#';
      thisWeekOption.textContent = 'This week';
      thisWeekOption.addEventListener('click', function () {
        updateChartData(thisWeekData);
        document.getElementById('week').textContent = 'This week';
      });

      dropdownMenu.appendChild(thisWeekOption);
    }
  }

  // Event listener for the 'This Week' button
  document.getElementById('week').addEventListener('click', function () {
    const currentLabel = this.textContent.trim();
    toggleDropdownOptions(currentLabel);
  });


})();

// Pie Chart function
(() => {
  'use strict';

  // Sample data for 'This Week' and 'Prev Week'
  const thisWeekData = [1245, 1500, 1350, 2040, 2348, 1305, 2212];
  const prevWeekData = [3850, 2250, 1203, 850, 1550, 2590, 1500];

  // const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
  // const yValues = [55, 49, 44, 24, 15];
  // const barColors = ["red", "green", "blue", "orange", "brown"];
  const barColors = [
    `rgb(0, 135, 108)`,
    `rgb(72, 143, 49)`,
    `rgb(198, 201, 106)`,
    `rgb(255, 231, 146)`,
    `rgb(248, 178, 103)`,
    `rgb(235, 122, 82)`,
    `rgb(222, 66, 91)`
  ];
  // Graphs
  const ctx = document.getElementById('myChart2');
  // eslint-disable-next-line no-unused-vars
  const myChart2 = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: thisWeekData,
        backgroundColor: barColors,
      }]
    },
    options: {
      plugins:{
        legend: {
         display: false
        }
       },
      title: {
        text: "World Wide Wine Production"
      },
      aspectRatio: 2.5,
    }
  });

  // Function to update chart data based on the selected week
  function updateChartData(selectedData) {
    myChart2.data.datasets[0].data = selectedData;
    myChart2.update();
  }

  // Function to toggle dropdown options based on the button label
  function toggleDropdownOptions(buttonLabel) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.innerHTML = ''; // Clear existing options

    if (buttonLabel === 'This week') {
      // If the button label is 'This Week', add the 'Prev Week' option
      const prevWeekOption = document.createElement('a');
      prevWeekOption.classList.add('dropdown-item');
      prevWeekOption.href = '#';
      prevWeekOption.textContent = 'Prev week';
      prevWeekOption.addEventListener('click', function () {
        // Update this with the actual data for the previous week
        updateChartData(prevWeekData);
        document.getElementById('week').textContent = 'Prev week';
      });

      dropdownMenu.appendChild(prevWeekOption);
    } else if (buttonLabel === 'Prev week') {
      // If the button label is 'Prev Week', add the 'This Week' option
      const thisWeekOption = document.createElement('a');
      thisWeekOption.classList.add('dropdown-item');
      thisWeekOption.href = '#';
      thisWeekOption.textContent = 'This week';
      thisWeekOption.addEventListener('click', function () {
        updateChartData(thisWeekData);
        document.getElementById('week').textContent = 'This week';
      });

      dropdownMenu.appendChild(thisWeekOption);
    }
  }

  // Event listener for the 'This Week' button
  document.getElementById('week').addEventListener('click', function () {
    const currentLabel = this.textContent.trim();
    toggleDropdownOptions(currentLabel);
  });

})();

// Export Chart Images
document.getElementById('export').addEventListener('click', function () {
  // Export myChart1
  myChart1.toBlob(function (blob) {
    saveAs(blob, "myChart1-image.jpg");
  });

  // Export myChart2
  myChart2.toBlob(function (blob) {
    saveAs(blob, "myChart2-image.jpg");
  });
})

// Share Chart Images with the help of Web Share API
document.getElementById('share').addEventListener('click', function () {
  if (navigator.share) {
    // Use Web Share API if available
    // Share myChart1
    myChart1.toBlob(function (blob1) {  // here, myChart1 and myChart2 are classes added in dashboard.html
      // Share myChart2
      myChart2.toBlob(function (blob2) {
        const shareData = {
          title: 'Chart Images',
          files: [
            new File([blob1], 'myChart1-image.jpg', { type: blob1.type }),
            new File([blob2], 'myChart2-image.jpg', { type: blob2.type }),
          ],
        };

        navigator.share(shareData)
          .then(() => console.log('Share successful'))
          .catch((error) => console.error('Error sharing:', error));
      });
    });
  } else {
    // Fallback for browsers that do not support Web Share API
    console.log('Web Share API is not supported in this browser.');
    // Implement your custom sharing logic or UI here as a fallback
  }
});

// Another way to Share Chart Image
// document.getElementById('share').addEventListener('click', async function shareCanvas() {
//   const canvasElement = document.getElementById('myChart1');
//   const dataUrl = canvasElement.toDataURL();
//   const blob = await (await fetch(dataUrl)).blob();
//   const filesArray = [
//     new File(
//       [blob],
//       'image.jpg',
//       {
//         type: blob.type,
//         lastModified: new Date().getTime()
//       }
//     )
//   ];
//   const shareData = {
//     files: filesArray,
//   };
//   navigator.share(shareData);
// });



// Backend Code: Antriksh
let trData = null;
  function makeError(str) {
    let errorDiv = document.getElementById('errorDiv');
    errorDiv.innerHTML = null;
    errorDiv.innerHTML = str;
  }
  function setData(data) {
    // Total Expenses
    let income = document.getElementById('income');
    let expense = document.getElementById('expense');
    let total = document.getElementById('total');
    let incomeAmount = 0;
    let expenseAmount = 0;
    let totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].amount >= 0) {
        incomeAmount += data[i].amount;
      }
      else {
        expenseAmount += data[i].amount;
      }
    }
    totalAmount = incomeAmount + expenseAmount;
    income.textContent = "₹ " + incomeAmount;
    expense.textContent = "₹ " + expenseAmount * -1;
    total.textContent = "₹ " + totalAmount;

    // Table Data
    let parent = document.getElementById('table-body');
    data.map((tr, index) => {
      let child = document.createElement('tr');
      child.style.cursor = 'pointer';
      child.onclick = () => openExpenseDetails(tr);
      let num = document.createElement('td');
      num.textContent = index + 1;
      child.appendChild(num);
      let name = document.createElement('td');
      name.textContent = tr.name;
      child.appendChild(name);
      let amount = document.createElement('td');
      amount.textContent = tr.amount;
      child.appendChild(amount);
      let type = document.createElement('td');
      type.textContent = tr.amount >= 0 ? 'Credit' : 'Expense';
      child.appendChild(type);
      let category = document.createElement('td');
      category.textContent = tr.category;
      child.appendChild(category);
      let date = document.createElement('td');
      date.textContent = new Date(tr.date).toLocaleString();
      child.appendChild(date);
      let split = document.createElement('td');
      split.textContent = tr.payers.length > 0 ? 'Group' : 'Individual';
      child.appendChild(split);
      parent.appendChild(child)
    })
  }
  async function getData() {
    let response = await fetch("https://splitmate.onrender.com/api/money/gettransactions", {
      method: "GET",
      headers: {
        "content-type": "application-json",
        "auth-token": localStorage.getItem('token')
      }
    })
    let result = await response.json();
    setData(result.transactions)
    trData = result.transactions;
  }
  getData();
  async function addExpense(e) {
    e.preventDefault();
    let name = document.getElementById('exampleName').value;
    let description = document.getElementById('exampleDescription').value;
    let amount = document.getElementById('exampleAmount').value;
    let category = document.getElementById('exampleCategory').value;
    let expenseType = document.getElementById('expenseRadio').checked ? -1 : 1;

    if (name.length == 0 || description.length == 0 || amount.length == 0 || category == 'Select Category') {
      makeError("Select All Fields");
      return;
    }
    let result = await fetch("https://splitmate.onrender.com/api/money/createtransaction", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-Token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name, description, category, amount: amount * expenseType })
    })
    let data = await result.json();
    if (data.success == true) {
      document.getElementById('closeBtn').click();
      window.location.href = "";
    }
    else {
      makeError(data.error);
    }
  }
  let splitFriendArray = [];
  let trAmount = 0;
  let trans;
  async function openExpenseDetails(tr) {
    let btn = document.getElementById('buttonModal2');
    trAmount = tr.amount;
    console.log(tr)
    trans = tr;
    btn.click();
    let parent = document.getElementById('modal-body2')
    parent.innerHTML = "";
    if (tr.amount > 0) {
      parent.innerHTML = '<p class="text-danger">Cannot Add split for an income</p>'
      return;
    }
    let name = document.createElement('div')
    name.textContent = `Name: ${tr.name}`
    parent.appendChild(name);
    let amount = document.createElement('div')
    amount.textContent = `Amount: ${tr.amount}`
    parent.appendChild(amount);
    let noOfFriends = await getFriends();
    if (noOfFriends == 0) return;
    let splitfrndsHead = document.createElement('h5');
    splitfrndsHead.textContent = "Split with following people"
    parent.appendChild(splitfrndsHead);
    let splitfriendDiv = document.createElement('div');
    splitfriendDiv.classList.add('splitFriendDiv')
    parent.appendChild(splitfriendDiv)
    updateSplitArray();

  }
  function updateSplitArray() {
    let parent = document.getElementsByClassName('splitFriendDiv')[0];
    // console.log(parent)
    parent.innerHTML = ""
    for (friend of splitFriendArray) {
      let friendName = document.createElement('div')
      friendName.onclick = () => removeFriendforSplit(friend);
      friendName.textContent = `${friend.name} (Click to remove)`
      parent.appendChild(friendName);
      let splitInput = document.createElement('input');
      splitInput.type = "number";
      splitInput.disabled = true;
      splitInput.classList.add('splitInput')
      splitInput.placeholder = `Enter amount for ${friend.name}`;
      splitInput.min = 0;
      parent.appendChild(splitInput)
    }
    // console.log(splitFriendArray)
    if (splitFriendArray.length > 0) {
      let btn1 = document.createElement('button')
      btn1.classList.add('btn');
      btn1.classList.add('btn-sm');
      btn1.classList.add('btn-primary');
      btn1.classList.add('btn-split');
      btn1.textContent = "Split Equally";
      btn1.type = "button";
      btn1.onclick = function splitEqually() {
        let equalAmt = -1 * Math.floor(trAmount / (splitFriendArray.length + 1));
        let inputs = document.getElementsByClassName('splitInput');
        Array.from(inputs).forEach((input) => {
          input.value = equalAmt;
        })
      }
      parent.appendChild(btn1)
    }
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
    let parent = document.getElementById('modal-body2');
    let frndsHead = document.createElement('h5');
    frndsHead.textContent = "Friends List"
    parent.appendChild(frndsHead);
    noOfFriends = data.friendList.length;
    for (let friend of data.friendList) {
      let frnd = document.createElement('div');
      frnd.classList.add('mb-1')
      frnd.classList.add('friends');
      frnd.onclick = () => addFriendforSplit(friend);
      frnd.textContent = friend.name + '(Click to add)';
      parent.appendChild(frnd);
    }
    if (data.friendList.length == 0) {
      parent.innerHTML = `<h6 class="text-danger">Add friends to be able to split expenses. </h6>`;
    }
    return data.friendList.length;
  }
  function addFriendforSplit(friend) {
    if (splitFriendArray.findIndex((frd) => frd == friend) != -1) {
      console.log('friend already for split');
      return;
    }
    splitFriendArray.push(friend);
    updateSplitArray();
  }
  function removeFriendforSplit(friend) {
    splitFriendArray = splitFriendArray.filter((frd) => frd != friend);
    updateSplitArray();
  }
  async function splitExpense(e) {
    e.preventDefault();
    let equalAmt = -1 * Math.floor(trAmount / (splitFriendArray.length + 1));
    let inputs = document.getElementsByClassName('splitInput');
    Array.from(inputs).forEach((input) => {
      input.value = equalAmt;
    })
    let result = await fetch('https://splitmate.onrender.com/api/money/splittransaction/' + trans._id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ friends: splitFriendArray.map((fr) => fr.id), amounts: splitFriendArray.map(() => equalAmt) })
    })
    let data = await result.json();
    console.log(data);
    if (data.success) {
      let closeBtn = document.getElementById('close2');
      closeBtn.click();
    }
  }
  async function getPendingRequests() {
    let result = await fetch('https://splitmate.onrender.com/api/money/getpendingtransactions/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    let data = await result.json();
    console.log(data);
    let parent = document.getElementById('pendingSplit');
    for (pending of data.results) {
      let child = document.createElement('div');
      child.innerHTML = `Name: <p class="text-secondary mb-0">${pending.name}</p>Amount: <p class="text-secondary mb-0">${pending.amount}</p>`
      let btn = document.createElement('button')
      btn.classList.add('btn')
      btn.classList.add('btn-sm')
      btn.classList.add('btn-primary')
      btn.onclick = () => paysplit(pending.id);
      btn.textContent = "Pay";
      child.appendChild(btn)
      parent.appendChild(child)
    }
    if (data.results.length == 0) {
      parent.innerHTML = '<p class="text-secondary">No Splits pending</p>'
    }
  }
  async function paysplit(id) {
    let result = await fetch('https://splitmate.onrender.com/api/money/paymoney/' + id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    let data = await result.json();
    console.log(data);
    if (data.success == true) {
      window.location.href = "";
    }
  }
  getPendingRequests();