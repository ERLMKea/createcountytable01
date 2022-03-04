out("vi er i create table");

createCountyMap();

function addRow(county) {
  let rowCount = countyTable.rows.length;
  let row = countyTable.insertRow(rowCount);
  let cell1 = row.insertCell(0);
  cell1.innerText = county.countyCode;

  let cell2 = row.insertCell(1);
  cell2.innerText = county.name;

}

function createTableFromMap() {
  out("create table");
  countyMap.forEach(county => addRow(county)
  )
}

const pbCreateTable = document.getElementById("pbCreateTable");
const countyTable = document.getElementById("countyTable");

pbCreateTable.addEventListener('click', createTableFromMap);
