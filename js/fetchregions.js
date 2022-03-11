
out('vi er igang med fetch regions');

const regionsUrl = 'http://localhost:8080/regionsx';

const outerr = function (err, str) {
  out(err);
  alert("Der var fejl:" + err + " " + str);
  inp1.innerText = err;
}

const inp1 = document.getElementById("inperror");

function fetchAllRegions() {
  out("get all regions kaldt");
  return fetch(regionsUrl).then(response => response.json()).catch(err => outerr(err, "fetch region err"));
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
    regionMap.set(region.regionCode, region);
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

