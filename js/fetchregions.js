
out('vi er igang med fetch regions');

const regionsUrl = 'http://localhost:8080/regions';

function fetchAllRegions() {
  out("get all regions kaldt");
  return fetch(regionsUrl).then(response => response.json());
}

function actionFetchAllRegions(btn) {
  out("fetch regions kaldt");
  const prom = fetchAllRegions();
  prom.then(createRegionMap);
  out("Vi er færdige med fetch regions");
}

const regionMap = new Map();
function createRegionMap(data) {
  data.forEach((region) => {
    //out(kommune.navn + "ix=" + index);
    regionMap.set(region.name, region);
  })
  out(regionMap);
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

