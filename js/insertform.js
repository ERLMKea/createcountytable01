const out = function (str) {
  console.log(str);
}

out("er i insert form");

document.addEventListener('DOMContentLoaded', createFormEventListener);

let countyForm;
function createFormEventListener() {
  countyForm = document.getElementById("newCountyForm");
  countyForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const url = form.action;
  out(form);
  out(url);
  try {
    const formData = new FormData(form);
    out(formData);
    const responseData = await postFormDataAsJson(url, formData);
    out(responseData);
    alert(formData.get('name') + ' er oprettet');

  } catch (err) {
    alert(err.message);
    out(err);
  }
}

async function postFormDataAsJson(url, formData) {
  out(formData.entries());
  const plainFormData = Object.fromEntries(formData.entries());
  out(plainFormData);

  plainFormData.region = {};
  plainFormData.region.regionCode = "1081";

  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: formDataJsonString
  };

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}


