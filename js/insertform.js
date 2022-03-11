const out = function (str) {
  console.log(str);
}

out("er i insert form");

//execute function createFormEventListener when html is loaded
document.addEventListener('DOMContentLoaded', createFormEventListener);

let countyForm;
//add eventlistener to html form
function createFormEventListener() {
  countyForm = document.getElementById("newCountyForm");
  countyForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
  //preventDefault forhindrer form i at udføre default submit. altås sende sig selv til backend.
  event.preventDefault();
  const form = event.currentTarget;
  const url = form.action;
  out(form);
  out(url);
  try {
    const formData = new FormData(form);
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


