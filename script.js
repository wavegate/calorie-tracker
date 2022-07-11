let entries = [];

class Entry {
  constructor(time, name, calories) {
    this.time = time;
    this.name = name;
    this.calories = calories;
  }
}

entries.push(new Entry(new Date(), "Salami", 300));
entries.push(new Entry(new Date(), "Beef", 200));
entries.push(new Entry(new Date(), "Chicken", 100));
entries.push(new Entry(new Date(), "Egg", 800));

const submitButton = document.getElementsByClassName("submitButton")[0];
const objectName = document.getElementById("objectName");
const calories = document.getElementById("calories");
const entryList = document.getElementsByClassName("entryList")[0];
const entryListContents = entryList.innerHTML;
const entryForm = document.getElementsByClassName("entryForm")[0];
const entryFormContents = entryForm.innerHTML;
const caloriesLeft = document.getElementById("caloriesLeft");
const zero = document.getElementById("zero");

function updateEntries() {
  entryList.innerHTML = entryListContents;
  let totalCalories = 0;
  for (let i = 0; i < entries.length; i++) {
    entries[i].id = i;
  }
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
    const del = document.createElement("i");
    del.classList.add("fa-solid");
    del.classList.add("fa-circle-xmark");
    del.classList.add("entryPart");
    del.id = "delete" + entry.id;
    del.addEventListener("click", (event) => {
      const pattern = /delete(.*)/;
      const match = event.target.id.match(pattern)[1];
      for (let x = 0; x < entries.length; x++) {
        if (entries[x].id == match) {
          entries.splice(x, 1);
        }
      }
      updateEntries();
    });
    listItem.appendChild(time);
    listItem.appendChild(name);
    listItem.appendChild(cal);
    listItem.appendChild(del);
    entryList.appendChild(listItem);
    totalCalories += parseInt(entry.calories);
  }
  caloriesLeft.innerHTML = 2000 - totalCalories;
  saveToStorage();
}

function saveToStorage() {
  const entriesCopy = JSON.stringify(entries);
  localStorage.setItem("data", entriesCopy);
}

function retrieveFromStorage() {
  entries = [];
  if ("data" in localStorage) {
    retrievedData = JSON.parse(localStorage.getItem("data"));
    for (datapoint of retrievedData) {
      const newEntry = new Entry(
        new Date(datapoint.time),
        datapoint.name,
        datapoint.calories
      );
      entries.push(newEntry);
    }
  }
}

retrieveFromStorage();

updateEntries();

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newEntry = new Entry(new Date(), objectName.value, calories.value);
  entries.push(newEntry);
  updateEntries();
  entryForm.reset();
});
