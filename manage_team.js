// حذف الأعضاء المختارين
function handleDelete(event) {
  event.preventDefault();

  // نجيب كل الشيك بوكس اللي عليها صح
  var checked = document.querySelectorAll('input[name="delete_ids"]:checked');

  if (checked.length === 0) {
    alert("Please select at least one member.");
    return;
  }

  var confirmDelete = confirm("Are you sure you want to delete selected members?");
  if (!confirmDelete) {
    return;
  }

  // نحذف الكروت من الصفحة
  for (var i = 0; i < checked.length; i++) {
    var cb = checked[i];
    // الـ label هو الكرت
    var tile = cb.closest ? cb.closest('.member-tile') : cb.parentElement;
    if (tile && tile.parentNode) {
      tile.parentNode.removeChild(tile);
    }
  }

  alert("Selected members have been deleted.");
}

// إضافة عضو جديد
function handleAddMember(event) {
  event.preventDefault();

  var form = document.getElementById("addMemberForm");
  var nameInput = document.getElementById("memberName");
  var photoInput = document.getElementById("memberPhoto");

  var name = nameInput.value.trim();
  var photoFiles = photoInput.files;

  var errors = [];

  // اسم فاضي
  if (name === "") {
    errors.push("Name is required.");
  }

  // الاسم ما يبدأ برقم
  if (name !== "" && /^[0-9]/.test(name)) {
    errors.push("Name cannot start with a number.");
  }

  // صورة فاضية
  if (!photoFiles || photoFiles.length === 0) {
    errors.push("Photo is required.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  // نجيب فورم الحذف عشان نضيف العضو الجديد هناك
  var deleteForm = document.getElementById("deleteForm");
  var deleteButton = deleteForm.querySelector('button[type="submit"]');

  // نسوي كرت جديد (نفس تصميم member-tile)
  var label = document.createElement("label");
  label.className = "member-tile";

  // نولّد value جديدة للعضو (مثلاً الوقت)
  var newId = Date.now();

  label.innerHTML = ''
    + '<input type="checkbox" name="delete_ids" value="' + newId + '">'
    + '<img src="member.png" alt="New Member">'
    + '<span class="member-name">' + name + '</span>';

  // نضيفه قبل زر الحذف
  deleteForm.insertBefore(label, deleteButton);

  alert("New member '" + name + "' added successfully.");

  // نفرغ الفورم
  form.reset();
}
