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

  } catch (err) {
    alert(err.message);
    out(err);
  }
}


