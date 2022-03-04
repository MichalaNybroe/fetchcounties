console.log("Vi er i create table");

function createTableFromMap() {
  countyMap.forEach(county => addRow(county));
}

function addRow(county) {
  let rowCount = countyTable.rows.length
  let row = countyTable.insertRow(rowCount);
  let cell1= row.insertCell(0);
  let cell2= row.insertCell(1);

  cell1.innerText = county.countyCode;
  cell2.innerText = county.name;
}

const createTable = document.getElementById('pbCreateTable');
const countyTable =document.getElementById('countyTable');

createTable.addEventListener('click',createTableFromMap);
