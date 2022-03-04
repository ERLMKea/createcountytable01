out("vi er i create table");

createCountyMap();

function addRow(county) {
  let rowCount = countyTable.rows.length;
  let row = countyTable.insertRow(rowCount);
  let cell1 = row.insertCell(0);
  cell1.innerText = county.countyCode;


  let cell2 = row.insertCell(1);
  const inp = document.createElement('input');
  inp.type = "text";
  inp.setAttribute("value", county.name);
  cell2.appendChild(inp);

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
    deleteRow(county, rowCount, row);
  }
  cell4.appendChild(pbDelete);

  //update button
  let cell5 = row.insertCell(4);
  const pbUpdate = document.createElement("input");
  pbUpdate.type = "button";
  pbUpdate.setAttribute('value', 'Update Kommune');
  pbUpdate.onclick = function () {
    updateRow(county, rowCount, row, inp);
  }
  cell5.appendChild(pbUpdate);


} //addRow

async function updateRow(county, rowNo, row, inputfield) {
  out(county);
  county.name = inputfield.value;
  const response = await restUpdateCounty(county);
  out("nu har vi opdateret");
  out(response);
  //crazy rule, only change name once
  inputfield.setAttribute('readonly', 'readonly');
}

async function restUpdateCounty(county) {
  const url = "http://localhost:8080/county/" + county.countyCode;

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: ""
  }

  const jsonString = JSON.stringify(county);
  fetchOptions.body = jsonString;

  //calls backend and wait for return
  const response = await fetch(url, fetchOptions);

  out(response);
  if (!response.ok) {
    out("Det gik ikke godt med update");
  };

  return response;
} //restDeleteConty



async function deleteRow(county, rowNo, row) {
  out(county);
  const response = await restDeleteCounty(county);
  out("nu har vi slettet");
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

  //calls backend and wait for return
  const response = await fetch(url, fetchOptions);

  out(response);
  if (!response.ok) {
    out("Det gik ikke godt");
  };

  return response;
} //restDeleteConty


function createTableFromMap() {
  out("create table");
  countyMap.forEach(county => addRow(county)
  )
}

const pbCreateTable = document.getElementById("pbCreateTable");
const countyTable = document.getElementById("countyTable");

pbCreateTable.addEventListener('click', createTableFromMap);
