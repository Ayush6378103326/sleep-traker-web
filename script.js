// パート1：初期化処理
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("sleepForm");
  const dateInput = document.getElementById("sleepDate");
  const hoursInput = document.getElementById("sleepHours");

  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const date = dateInput.value;
    const hours = parseFloat(hoursInput.value);
    saveSleepData(date, hours);
    updateChart();
  });

  updateChart();
});

// パート2：保存処理
function saveSleepData(date, hours) {
  let sleepData = JSON.parse(localStorage.getItem("sleepData") || "{}");
  sleepData[date] = hours;
  localStorage.setItem("sleepData", JSON.stringify(sleepData));
}

// パート3：グラフ更新処理
function updateChart() {
  const ctx = document.getElementById("sleepChart").getContext("2d");
  const rawData = JSON.parse(localStorage.getItem("sleepData") || "{}");

  const sortedDates = Object.keys(rawData).sort().slice(-7);
  const hoursData = sortedDates.map(date => rawData[date]);

  if (window.sleepChart) {
    window.sleepChart.destroy();
  }

  window.sleepChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sortedDates,
      datasets: [{
        label: "Hours Slept",
        data: hoursData,
        backgroundColor: "#4caf50"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 12
        }
      }
    }
  });
}
