out("vi er i create table");

createCountyMap();

function addRow(county) {
  const rowCount = countyTable.rows.length;
  let row = countyTable.insertRow(rowCount);
  let colCount = 0;

  let cell = row.insertCell(colCount++);
  cell.innerText = county.countyCode;

  cell = row.insertCell(colCount++);
  const inp = document.createElement('input');
  inp.type = "text";
  inp.setAttribute("value", county.name);
  cell.appendChild(inp);

  //ATag with county href
  cell = row.insertCell(colCount++);
  const atag = document.createElement('a');
  atag.setAttribute("href", county.href);
  atag.innerText = county.name;
  cell.appendChild(atag);

  cell = row.insertCell(colCount++);
  cell.innerText = county.region.regionCode;

  //Create a dropdown
  cell = row.insertCell(colCount++);
  const ddRegion = document.createElement("select");
  regionMap.forEach(region => {
    const el = document.createElement("option");
    el.textContent = region.name;
    el.value = region.regionCode;
    ddRegion.appendChild(el);
  });
  cell.appendChild(ddRegion);

  //delete button
  cell = row.insertCell(colCount++);
  const pbDelete = document.createElement("input");
  pbDelete.type = "button";
  pbDelete.setAttribute('value', 'Slet Kommune');
  pbDelete.onclick = function () {
    deleteRow(county, rowCount, row);
  }
  cell.appendChild(pbDelete);

  //update button
  cell = row.insertCell(colCount++);
  const pbUpdate = document.createElement("input");
  pbUpdate.type = "button";
  pbUpdate.setAttribute('value', 'Update Kommune');
  pbUpdate.onclick = function () {
    updateRow(county, rowCount, row, inp);
  }
  cell.appendChild(pbUpdate);


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
