const out = function (...str) {
  console.log(str)
}

const countiesURL = 'http://localhost:8080/counties';
const countyMap = new Map();

function fetchAllCounties() {
  out("her køres get all kommuner funtion");
  return fetch(countiesURL).then(response => response.json());
}

async function createCountyMap() {
  out("show all kommuner");
  const countyList = await fetchAllCounties();
  countyList.forEach((county, index) => {
    //Dette er udhentet fra vores backend - hvorfor county.name (det er hvad den hedder i model og i db)
    countyMap.set(county.name, county);
  });
}

function showCountyMap() {
  for (const countyKey of countyMap.keys()) {
    out(countyMap.get(countyKey));
  }
}

const pbFetchCounties = document.getElementById('pbGetCounties');
const pbShowCountyMap = document.getElementById('pbShowCountyMap');

pbFetchCounties.addEventListener('click', createCountyMap);
pbShowCountyMap.addEventListener('click', showCountyMap);
