// Inputs
let fileSize = document.getElementById("file-size");
let fileUnit = document.getElementById("file-unit");
let speed = document.getElementById("speed");
let speedUnit = document.getElementById("speed-unit");
let tempInput = document.getElementById("temp-input");
let tempUnit = document.getElementById("temp-unit");
let sciInput = document.getElementById("sci-input");
let metricInput = document.getElementById("metric-input");
let metricFrom = document.getElementById("metric-from");
let metricTo = document.getElementById("metric-to");

// section
let tabs = document.querySelectorAll(".tab");
let sections = document.querySelectorAll("section");

// buttons
let BtnCalcTime = document.getElementById("btn-calc-time");
let BtnConvTemp = document.getElementById("btn-convert-temp");
let BtnConvSci = document.getElementById("btn-convert-sci");
let BtnConvMetric = document.getElementById("btn-convert-metric");
// answer display
let fileAnswerDisplay = document.querySelector(".file-answer-display");
let tempAnswerDisplay = document.querySelector(".temp-answer-display");
let sciAnswerDisplay = document.querySelector(".sci-answer-display");
let metricAnswerDisplay = document.querySelector(".metric-answer-display");
// output
let estimatedTime = document.getElementById("estimated-time");
let convertedValue = document.getElementById("converted-value");
let sciValue = document.getElementById("sci-value");
let metricValue = document.getElementById("metric-value");

BtnCalcTime.addEventListener("click", () => {
  let _fileSize = fileSize.value.trim();
  let _fileUnit = fileUnit.value.trim();
  let _speed = speed.value.trim();
  let _speedUnit = speedUnit.value.trim();
  console.log(fileUnit, speedUnit);

  fileAnswerDisplay.style.display = "block";

  let time = calcEstimatedTime(_fileSize, _fileUnit, _speed, _speedUnit);
  estimatedTime.textContent = time;
});

BtnConvTemp.addEventListener("click", () => {
  let _temp = tempInput.value.trim();
  let _tempUnit = tempUnit.value.trim();
  let results;
  let units;

  if (_tempUnit === "F") {
    results = (5 * (_temp - 32)) / 9;
    units = "°C";
  } else {
    results = _temp * (9 / 5) + 32;
    units = "°F";
  }
  tempAnswerDisplay.style.display = "block";

  convertedValue.textContent = `${results.toFixed(2)} ${units}`;
});

BtnConvSci.addEventListener("click", () => {
  let _sciInput = sciInput.value.trim();

  let results = Number.parseFloat(_sciInput).toExponential(4);

  sciAnswerDisplay.style.display = "block";

  sciValue.textContent = results;
});

BtnConvMetric.addEventListener("click", () => {
  let _metricInput = metricInput.value.trim();
  let _metricFrom = metricFrom.value.trim();
  let _metricTo = metricTo.value.trim();

  let siFactors = {
    G: 1e9,
    M: 1e6,
    k: 1e3,
    B: 1,
    m: 1e-3,
    µ: 1e-6,
  };

  // Convert to base unit first
  let valueInBaseUnits = _metricInput * siFactors[_metricFrom];

  // Convert from base unit to target unit
  let convertedValue = valueInBaseUnits / siFactors[_metricTo];

  console.log(valueInBaseUnits, convertedValue);

  metricAnswerDisplay.style.display = "block";
  metricValue.textContent = convertedValue;
});

function convertToKB(size, unit) {
  if (unit == "MB") {
    return size * 1024;
  } else if (unit == "GB") {
    return size * 1024 * 1024;
  } else {
    return size;
  }
}

function convertToKB_ps(speed, unit) {
  if (unit == "Mbps") {
    return speed * 1024;
  } else if (unit == "Gbps") {
    return speed * 1024 * 1024;
  } else {
    return speed;
  }
}

function timeConverter(secs) {
  if (secs < 60) {
    return `${secs} Seconds`;
  } else if (secs >= 60 && secs < 3600) {
    let mins = Math.floor(secs / 60);
    secs -= mins * 60;
    return `${mins} Minutes ${secs} Seconds`;
  } else if (secs > 3600) {
    let hours = Math.floor(secs / 3600);
    secs -= hours * 3600;
    let mins = Math.floor(secs / 60);
    secs -= mins * 60;
    return `${hours} Hours ${mins} Minutes ${secs} Seconds`;
  }
}

function calcEstimatedTime(size, size_unit, speed, speed_unit) {
  // KB -> MB  (1 MB:1024 KB)
  // MB -> GB (1GB : 1024MB)
  sizeKB = convertToKB(size, size_unit);
  speedKB_ps = convertToKB_ps(speed, speed_unit);
  console.log(sizeKB, speed, speedKB_ps);

  time = Math.round(sizeKB / speedKB_ps);
  console.log(time);
  return timeConverter(time);

  // time (s) = size (Kb) / speed (Kb/s)
}

// navigate tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    // remove active class
    tabs.forEach((tab) => tab.classList.remove("active"));
    // adding active class
    e.target.classList.add("active");
    // navigating to tab
    sections.forEach((section) => (section.style.display = "none"));

    // display relavent tab
    sectionID = e.target.id.trim().split("tab-")[1];
    document.getElementById(sectionID).style.display = "block";
  });
});
