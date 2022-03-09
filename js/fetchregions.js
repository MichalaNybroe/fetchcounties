const regionsURL = 'http://localhost:8080/regions';

function fetchAllRegions() {
  //.json() laver json fra api om til javascript objekter
  return fetch(regionsURL).then(response => response.json());
}

// Funktion lavet til at fejle.
function actionFetchAllRegions() {
  const promise = fetchAllRegions();
  promise.then(createRegionMap);
}

const regionMap = new Map();
function createRegionMap(regionList) {
  regionList.forEach((region, index) => {
    regionMap.set(region.regionCode, region);
  })
}

function showRegionMap() {
  for (const regionKey of regionMap.keys) {
    out(regionsMap.get(regionKey));
  }
}

const pbFetchRegions = document.getElementById('pbGetRegions');

pbFetchRegions.addEventListener('click', actionFetchAllRegions);
