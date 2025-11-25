window.onload = function () {

  // 1) نجيب الخدمات من LocalStorage
  let servicesJSON = localStorage.getItem("services");
  let services = [];

  if (servicesJSON) {
    services = JSON.parse(servicesJSON);
  }

  // 2) نجيب مكان عرض الخدمات
  let container = document.getElementById("servicesContainer");

  // 3) لو ما في خدمات → نعرض رسالة
  if (services.length === 0) {
    container.innerHTML = "<p>No services added yet.</p>";
    return;
  }

  // 4) لو فيه خدمات → نخلي الصفحة تكتبهم داخل الـ container
  services.forEach(function(srv) {

    // نسوي div جديد لكل خدمة
    let card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <div class="thumb">
        <img src="${srv.photoName}" alt="${srv.name}">
      </div>
      <div class="info">
        <h3>${srv.name}</h3>
        <p>${srv.description}</p>
        <div class="meta">💰 ${srv.price} SAR</div>
      </div>
    `;

    // نضيفه للصفحة
    container.appendChild(card);
  });

};
