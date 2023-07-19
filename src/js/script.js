const category = document.querySelectorAll(".category"),
  score = document.querySelectorAll(".score"),
  percent = document.querySelector(".percent"),
  icon = document.querySelectorAll(".icon"),
  averageScore = document.querySelector(".average-score"),
  continueBtn = document.querySelector("button"),
  scoreArray = [];

let average = 0,
  upto = 0,
  roundAverage = 0;

const timeOutJson = setTimeout(fetchData, 1500);

function btnClick() {
  continueBtn.addEventListener("click", () => {
    roundAverage = Math.floor(average);
    averageScore.textContent = roundAverage;

    counterAnimated(roundAverage, averageScore);
    percent.textContent = percentileCalculation(scoreArray);
    // counterAnimated(percentileCalculation(scoreArray), percent);
  });
}

function fetchData() {
  fetchingData();
  btnClick();
}
const timeOutAlert = setTimeout(() => {
  alert("Please click on continue button to get your percentile score");
}, 4000);

async function fetchingData() {
  const response = await fetch("data.json"),
    data = await response.json();
  // Use the data from the JSON file here
  for (var i = 0; i < category.length; i++) {
    category[i].textContent = data[i].category;
    score[i].textContent = data[i].score;
    icon[i].src = data[i].icon;

    average += data[i].score / data.length;
    scoreArray[i] = data[i].score;
  }
}

function counterAnimated(limit, id) {
  let counts = setInterval(updated);
  function updated() {
    let count = id;
    count.innerHTML = ++upto;

    if (upto === limit) {
      clearInterval(counts);
      upto = 0;
    }
  }
}

function percentileCalculation(scoreArray) {
  let countScore = 0,
    percentile = 0,
    numberOfStudent = 10;
  scoreArray.sort();
  scoreArray.forEach((item) => {
    if (item < roundAverage) {
      ++countScore;
    }
  });
  percentile = (countScore / numberOfStudent) * 100;

  return percentile;
}
