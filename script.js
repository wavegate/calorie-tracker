const entries = [];

class Entry {
  constructor(time, name, calories) {
    this.time = time;
    this.name = name;
    this.calories = calories;
  }
}

const submitButton = document.getElementsByClassName("submitButton")[0];
const objectName = document.getElementById("objectName");
const calories = document.getElementById("calories");
const entryList = document.getElementsByClassName("entryList")[0];
const entryListContents = entryList.innerHTML;
const entryForm = document.getElementsByClassName("entryForm")[0];
const caloriesLeft = document.getElementById("caloriesLeft");

function updateEntries() {
  entryList.innerHTML = entryListContents;
  let totalCalories = 0;
  for (entry of entries) {
    const listItem = document.createElement("li");
    listItem.classList.add("entry");
    const time = document.createElement("div");
    time.innerHTML = entry.time.toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
    const name = document.createElement("div");
    name.innerHTML = entry.name;
    const cal = document.createElement("div");
    cal.innerHTML = entry.calories + " kcal";
    time.classList.add("entryPart");
    name.classList.add("entryPart");
    cal.classList.add("entryPart");
    listItem.appendChild(time);
    listItem.appendChild(name);
    listItem.appendChild(cal);
    entryList.appendChild(listItem);
    totalCalories += parseInt(entry.calories);
  }
  caloriesLeft.innerHTML = 2000 - totalCalories;
}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newEntry = new Entry(new Date(), objectName.value, calories.value);
  entries.push(newEntry);
  updateEntries();
});
