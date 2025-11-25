function handleDelete(event) {
  event.preventDefault();

  var checkedBoxes = document.querySelectorAll('.card__checkbox:checked');

  if (checkedBoxes.length === 0) {
    alert("Please select at least one member.");
    return;
  }

  var confirmDelete = confirm("Are you sure you want to delete selected members?");
  if (!confirmDelete) {
    return;
  }

  for (var i = 0; i < checkedBoxes.length; i++) {
    var cb = checkedBoxes[i];
    var card = cb.closest ? cb.closest('.card__continer') : cb.parentElement;
    if (card && card.parentNode) {
      card.parentNode.removeChild(card);
    }
  }

  alert("Selected members have been deleted.");
}

function handleAddMember(event) {
  event.preventDefault();

  var firstNameInput = document.getElementById("firstName");
  var lastNameInput  = document.getElementById("lastName");
  var photoInput     = document.getElementById("photo");

  var firstName = firstNameInput.value.trim();
  var lastName  = lastNameInput.value.trim();
  var photoFiles = photoInput.files;

  var errors = [];

  if (firstName === "") {
    errors.push("First name is required.");
  }
  if (lastName === "") {
    errors.push("Last name is required.");
  }

  if (firstName !== "" && /^[0-9]/.test(firstName)) {
    errors.push("First name cannot start with a number.");
  }
  if (lastName !== "" && /^[0-9]/.test(lastName)) {
    errors.push("Last name cannot start with a number.");
  }

  if (!photoFiles || photoFiles.length === 0) {
    errors.push("Photo is required.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  var fullName = firstName + " " + lastName;

  var deleteForm = document.getElementById("deleteForm");
  var deleteButton = deleteForm.querySelector('button[type="submit"]');

  var newCard = document.createElement("article");
  newCard.className = "card__continer";

  var imgSrc = "Images/staff1.jpg";

  newCard.innerHTML = ''
    + '<div class="card__media">'
    + '  <img src="' + imgSrc + '" alt="Staff Photo">'
    + '</div>'
    + '<div class="card__body">'
    + '  <h3 class="card__title">' + fullName + '</h3>'
    + '</div>'
    + '<input type="checkbox" class="card__checkbox">';

  deleteForm.insertBefore(newCard, deleteButton);

  alert("New member '" + fullName + "' added successfully.");

  document.getElementById("addMemberForm").reset();
}
