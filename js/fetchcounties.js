const out = function (str) {
  console.log(str);
}

out('vi er igang med fetch kommuner');

const countiesUrl = 'http://localhost:8080/counties';

function fetchAllCounties() {
  out("get all kommuner kaldt");
  return fetch(countiesUrl).then(response => response.json());
}

const countyMap = new Map();
async function createCountyMap() {
  out("show allkommuner");
  const countyList = await fetchAllCounties();
  countyList.forEach((county, index) => {
    //out(kommune.navn + "ix=" + index);
    countyMap.set(county.name, county);
  })
}

function showCountyMap() {
  for (const countyKey of countyMap.keys()) {
    ;//out(countyMap.get(countyKey));
  }
}

//callGetAllKommuner();
const pbFetchCounties = document.getElementById('pbGetCounties');
const pbShowCountyMap = document.getElementById('pbShowCountyMap');
const tblCounties = document.getElementById('countyTable');

//add event listeners
pbFetchCounties.addEventListener('click', createCountyMap);
pbShowCountyMap.addEventListener('click', showCountyMap);

out("vi er færdige her");

