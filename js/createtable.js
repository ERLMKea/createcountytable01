out("vi er i create table");

createCountyMap();

function addRow(county) {
  let rowCount = countyTable.rows.length;
  let row = countyTable.insertRow(rowCount);
  let cell1 = row.insertCell(0);
  cell1.innerText = county.countyCode;

  let cell2 = row.insertCell(1);
  cell2.innerText = county.name;

  //ATag with county href
  let cell3 = row.insertCell(2);
  const atag = document.createElement('a');
  atag.setAttribute("href", county.href);
  atag.innerText = county.name;
  cell3.appendChild(atag);

  //delete button
  let cell4 = row.insertCell(3);
  const pbDelete = document.createElement("input");
  pbDelete.type = "button";
  pbDelete.setAttribute('value', 'Slet Kommune');
  pbDelete.onclick = function () {
    deleteRow(county, rowCount);
  }
  cell4.appendChild(pbDelete);

} //addRow

function deleteRow(county, rowNo) {
  out(county);
  out(rowNo);
  countyTable.deleteRow(rowNo);

}

function createTableFromMap() {
  out("create table");
  countyMap.forEach(county => addRow(county)
  )
}

const pbCreateTable = document.getElementById("pbCreateTable");
const countyTable = document.getElementById("countyTable");

pbCreateTable.addEventListener('click', createTableFromMap);
