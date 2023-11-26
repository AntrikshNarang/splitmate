/* globals Chart:false */

(() => {
  'use strict';

  // Sample data for 'This Week' and 'Prev Week'
  const thisWeekData = [1245, 1500, 1350, 2040, 2348, 1305, 2212];
  const prevWeekData = [1850, 2250, 1203, 850, 1550, 2590, 3500];

  const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [55, 49, 44, 24, 15];
const barColors = ["red", "green","blue","orange","brown"];
  // Graphs
  const ctx = document.getElementById('myChart');
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "World Wide Wine Production"
    }
  }
  });

  // Function to update chart data based on the selected week
  function updateChartData(selectedData) {
    myChart.data.datasets[0].data = selectedData;
    myChart.update();
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


// Export Chart Image to local computer
document.getElementById('export').addEventListener('click', function () {
  myChart.toBlob(function (blob) {
    // Assuming you have the `saveAs` function available (you might need to include a library like FileSaver.js)
    saveAs(blob, "image.jpg");
  });
});

// Share Chart Image with the help of Web Share API
document.getElementById('share').addEventListener('click', function () {
  if (navigator.share) {
    // Use Web Share API if available
    myChart.toBlob(function (blob) {
      const shareData = {
        title: 'Chart Image',
        files: [new File([blob], 'chart-image.jpg', { type: blob.type })],
      };

      navigator.share(shareData)
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Error sharing:', error));
    });
  } else {
    // Fallback for browsers that do not support Web Share API
    console.log('Web Share API is not supported in this browser.');
    // Implement your custom sharing logic or UI here as a fallback
  }
});

// Another way to Share Chart Image
// document.getElementById('share').addEventListener('click', async function shareCanvas() {
//   const canvasElement = document.getElementById('myChart');
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