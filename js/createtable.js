console.log("Vi er i create table");

function createTableFromMap() {
  countyMap.forEach(county => addRow(county));
}

function addRow(county) {
  const rowCount = countyTable.rows.length;
  let colCount = 0;

  let row = countyTable.insertRow(rowCount);
  let cell = row.insertCell(colCount++);

  cell.innerText = county.countyCode;

  //Tilføj update på navn
  cell = row.insertCell(colCount++);
  const input = document.createElement('input');
  input.type = "text";
  input.setAttribute("value", county.name);
  cell.appendChild(input);

  //A tag with href - lav om til på navn
  cell = row.insertCell(colCount++);
  const atag = document.createElement('a');
  atag.setAttribute("href", county.href);
  atag.innerText = county.name;
  cell.appendChild(atag);

// regionskode
  cell = row.insertCell(colCount++);
  cell.innerText = county.region.regionCode;

//create dropdown
cell = row.insertCell(colCount++);
const dropDownRegion = document.createElement("select");
let ix = 0;
regionMap.forEach(region => {
  const element = document.createElement("option");
  element.textContent = region.name;
  element.value = region.regionCode;
  dropDownRegion.appendChild(element);
  if (region.regionCode == county.region.regionCode) {
    dropDownRegion.selectedIndex = ix;
  }
  ix++;

  //key og value er essentielt her --> vi finder input på value og ændrer region herefter
  dropDownRegion.addEventListener("change", event =>{
    const selectedInput = dropDownRegion.selectedIndex;
    const option = dropDownRegion.options[selectedInput];
    county.region = regionMap.get(option.value);
  })
})
  cell.appendChild(dropDownRegion);

  //Slet knap
  cell = row.insertCell(colCount++);
  const pbDelete = document.createElement('input');
  pbDelete.type = "button";
  pbDelete.setAttribute('value', 'Delete County');
  pbDelete.onclick = function () {

    // Godt til eksamen at vise dynamisk ændring af html fremfor reload
    deleteRow(county, row);
  }
  cell.appendChild(pbDelete);

  //Update knap
  cell = row.insertCell(colCount++);
  const pbUpdate = document.createElement('input');
  pbUpdate.type = "button";
  pbUpdate.setAttribute('value', 'Update County');
  pbUpdate.onclick = function () {
    updateRow(county, row, input);
  }
  cell.appendChild(pbUpdate);



}

async function updateRow(county, row, inputfield) {
  out(county);
  county.name = inputfield.value;

  const response = await restUpdateCounty(county);
  out("Updatet in db");
  out(response);
  inputfield.setAttribute('readonly', 'readonly');
}

async function restUpdateCounty(county) {
  const url = "http://localhost:8080/county/" + county.countyCode;

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type" : "application/json"
    },
    body: ""
  }

  const jsonString = JSON.stringify(county);
  fetchOptions.body = jsonString;

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    out("Det gik ikke så godt")
  }
  return response;
}

async function deleteRow(county, row) {
  out(county);
  const response = await restDeleteCounty(county);
  out("slettet i db")
  countyTable.deleteRow(row.rowIndex);
}

async function restDeleteCounty(county) {
  const url = "http://localhost:8080/county/" + county.countyCode;

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: ""
  }

  // Kalder backend og venter for return
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    out("Det gik ikke så godt")
  }
  return response;
}

const pbCreateTable = document.getElementById('pbCreateTable');
const countyTable = document.getElementById('countyTable');

pbCreateTable.addEventListener('click', createTableFromMap);
