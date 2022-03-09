
out('vi er igang med fetch regions');

const regionsUrl = 'http://localhost:8080/regions';

function fetchAllRegions() {
  out("get all regions kaldt");
  return fetch(regionsUrl).then(response => response.json());
}

function actionFetchAllRegions(btn) {
  const prom = fetchAllRegions();
  prom.then(data => out(data));
}


const regionMap = new Map();
function createRegionMap(data) {
  out("show allkommuner");
  data.forEach((county, index) => {
    //out(kommune.navn + "ix=" + index);
    regionMap.set(county.name, county);
  })
}

function showRegionMap() {
  for (const countyKey of regionMap.keys()) {
    out(countyMap.get(countyKey));
  }
}

const pbFetchRegions = document.getElementById('pbGetRegions');

//add event listeners
pbFetchRegions.addEventListener('click', actionFetchAllRegions);

out("vi er færdige her");

