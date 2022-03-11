document.addEventListener('DOMContentLoaded', createFormEventListener);

let countyForm;

function createFormEventListener() {
  countyForm = document.getElementById('newCountyForm');
  countyForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
  //Stop du skal ikke gøre noget er det som nedenstående betyder.
  // Den stopper formen i at sende til backend, så vi tager over.
  event.preventDefault();
  const form = event.currentTarget;
  const url = form.action;
  console.log(form);
  console.log(url);

  try {
    const formData = new FormData(form);
    console.log(formData);
    const responseData = await postFormDataJson(url, formData);
    console.log(responseData);

  } catch (err) {
    alert("Whoops something went wrong in submitting county!");
  }
}

async function postFormDataJson(url, formData) {
  console.log(formData.entries());
  const plainFormData = Object.fromEntries(formData.entries());
  //Hernede ses data'en som brugeren har givet.
  console.log(plainFormData);

  plainFormData.region = {};
  plainFormData.region.regionCode = "1081";

  const formDataJson = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: formDataJson
  };

  const response = await fetch(url, fetchOptions);
  console.log(response);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
