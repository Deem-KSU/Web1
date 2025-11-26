function loadServices() {
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

  for (var i = 0; i < services.length; i++) {
    var srv = services[i];

    var article = document.createElement("article");
    article.className = "card__continer";

    var imgSrc = "Images/CarWash.png";

    var html = "";
    html += '<div class="card__media">';
    html +=   '<img src="' + imgSrc + '" alt="' + srv.name + '">';
    html += '</div>';
    html += '<div class="card__body">';
    html +=   '<h2 class="card__title">' + srv.name + '</h2>';
    html +=   '<p class="card__text">' + srv.description + '</p>';
    html +=   '<div class="card__price">' + srv.price + ' SR</div>';
    html += '</div>';

    article.innerHTML = html;
    container.appendChild(article);
  }
}

// استدعاء الدالة بعد تحميل السكربت
loadServices();
