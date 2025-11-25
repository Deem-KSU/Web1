function handleAddService(event) {
  event.preventDefault();

  let nameInput  = document.getElementById("serviceName");
  let priceInput = document.getElementById("servicePrice");
  let descInput  = document.getElementById("serviceDescription");
  let photoInput = document.getElementById("photo");

  let name  = nameInput.value.trim();
  let priceStr = priceInput.value.trim();
  let desc  = descInput.value.trim();
  let photoFiles = photoInput.files;

  let errors = [];

  if (name === "") {
    errors.push("Service name is required.");
  }
  if (priceStr === "") {
    errors.push("Service fee is required.");
  }
  if (desc === "") {
    errors.push("Service description is required.");
  }
  if (!photoFiles || photoFiles.length === 0) {
    errors.push("Service photo is required.");
  }

  if (name !== "" && /^[0-9]/.test(name)) {
    errors.push("Service name cannot start with a number.");
  }

  let price = Number(priceStr);
  if (priceStr !== "" && (isNaN(price) || price <= 0)) {
    errors.push("Service fee must be a positive number.");
  }

  if (desc !== "" && desc.length < 10) {
    errors.push("Service description must be at least 10 characters.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  let servicesJSON = localStorage.getItem("services");
  let services;

  if (servicesJSON) {
    services = JSON.parse(servicesJSON);
  } else {
    services = [];
  }

  let newService = {
    name: name,
    price: price,
    description: desc,
    photoName: (photoFiles.length > 0 ? photoFiles[0].name : "")
  };

  services.push(newService);

  localStorage.setItem("services", JSON.stringify(services));

  alert("Service '" + name + "' added and saved successfully.");
  document.getElementById("addServiceForm").reset();
}
