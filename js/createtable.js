console.log("Vi er i create table");

function createTableFromMap() {
  countyMap.forEach(county => addRow(county));
}

function addRow(county) {
  let rowCount = countyTable.rows.length
  let row = countyTable.insertRow(rowCount);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);

  cell1.innerText = county.countyCode;
  cell2.innerText = county.name;

  //A tag with href - lav om til på navn
  const atag = document.createElement('a');
  atag.setAttribute("href", county.href);
  atag.innerText = county.name;
  cell3.appendChild(atag);

  //Slet knap
  const pbDelete = document.createElement('input');
  pbDelete.type = "button";
  pbDelete.setAttribute('value', 'Delete County');
  pbDelete.onclick = function () {

    // Godt til eksamen at vise dynamisk ændring af html fremfor reload
    deleteRow(county, row);
  }
  cell4.appendChild(pbDelete);
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
