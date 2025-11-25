window.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("dynamicServices");
  if (!container) return;

  var servicesJSON = localStorage.getItem("services");
  if (!servicesJSON) {
    container.innerHTML = "<p>No added services yet.</p>";
    return;
  }

  var services;
  try {
    services = JSON.parse(servicesJSON);
  } catch (e) {
    return;
  }

  if (!Array.isArray(services) || services.length === 0) {
    container.innerHTML = "<p>No added services yet.</p>";
    return;
  }

  services.forEach(function (srv) {
    var article = document.createElement("article");
    article.className = "card__continer";

    var imgSrc = "Images/CarWash.png";

    article.innerHTML = `
      <div class="card__media">
        <img src="${imgSrc}" alt="${srv.name}">
      </div>
      <div class="card__body">
        <h2 class="card__title">${srv.name}</h2>
        <p class="card__text">
          ${srv.description}
        </p>
        <div class="card__price">
          ${srv.price} SR
        </div>
      </div>
    `;

    container.appendChild(article);
  });
});
