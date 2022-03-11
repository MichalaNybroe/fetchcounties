const regionsURL = 'http://localhost:8080/regions';

const error = function (err) {
  out(err);
  alert("Der var fejl " + err);
  inputError.innerText = err;
}
const inputError = document.getElementById('error');


function fetchAllRegions() {
  //.json() laver json fra api om til javascript objekter
  return fetch(regionsURL).then(response => response.json()).catch(err => error(err));
}

// Funktion lavet til at fejle.
function actionFetchAllRegions() {
  const promise = fetchAllRegions();
  promise.then(createRegionMap);
  out("fetch regions");
}

const regionMap = new Map();
function createRegionMap(regionList) {
  regionList.forEach((region) => {
    regionMap.set(region.regionCode, region);
  })
}

function showRegionMap() {
  for (const regionKey of regionMap.keys) {
    out(regionMap.get(regionKey));
  }
}

const pbFetchRegions = document.getElementById('pbGetRegions');

pbFetchRegions.addEventListener('click', actionFetchAllRegions);
