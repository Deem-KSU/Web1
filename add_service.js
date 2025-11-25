function handleAddService(event) {
  // نمنع الفورم يترسل فعلياً
  event.preventDefault();

  // 1) نجيب القيم من الحقول باستخدام DOM
  var nameInput  = document.getElementById("serviceName");
  var priceInput = document.getElementById("servicePrice");
  var descInput  = document.getElementById("serviceDescription");
  var photoInput = document.getElementById("servicePhoto");

  var name  = nameInput.value.trim();
  var priceStr = priceInput.value.trim();
  var desc  = descInput.value.trim();
  var photoFiles = photoInput.files;

  var errors = [];

  // 2) فحص الحقول الفارغة
  if (name === "") {
    errors.push("Service name is required.");
  }

  if (priceStr === "") {
    errors.push("Price is required.");
  }

  if (desc === "") {
    errors.push("Description is required.");
  }

  if (photoFiles.length === 0) {
    errors.push("Photo is required.");
  }

  // 3) الاسم ما يبدأ برقم
  if (name !== "" && /^[0-9]/.test(name)) {
    errors.push("Service name cannot start with a number.");
  }

  // 4) السعر رقم وموجب
  var price = Number(priceStr);
  if (priceStr !== "" && (isNaN(price) || price < 0)) {
    errors.push("Price must be a positive number.");
  }

  // 5) لو فيه أخطاء  نطلعها ونوقف
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  // 6) نخزن الخدمة في localStorage (array of objects)
  var servicesJSON = localStorage.getItem("services");
  var services;

  if (servicesJSON) {
    // فيه بيانات قديمة → نحولها لمصفوفة
    services = JSON.parse(servicesJSON);
  } else {
    // أول مرة → مصفوفة فاضية
    services = [];
  }

  // نكوّن object للخدمة الجديدة
  var newService = {
    name: name,
    price: price,
    description: desc,
    photoName: (photoFiles.length > 0) ? photoFiles[0].name : ""
  };

  // نضيفه للArray
  services.push(newService);

  // نرجع نخزنها كنص
  localStorage.setItem("services", JSON.stringify(services));

  // 7) رسالة نجاح + تفريغ الفورم
  alert("Service '" + name + "' added and saved successfully.");
  document.getElementById("addServiceForm").reset();
}
