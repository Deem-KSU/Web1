//add requests page
var requestForm = document.getElementById("requestForm");

if (requestForm) {

    requestForm.onsubmit = function(event) {

        event.preventDefault(); 
         // check name
        var firstName = requestForm.elements["fName"].value;
        var lastName  = requestForm.elements["LName"].value;

        if (firstName === "" || lastName === "") {
            alert("Please enter your full name *first and last name*");
            return false;
        }

        var hasNumberInFirst = /[0-9]/.test(firstName);
        var hasNumberInLast  = /[0-9]/.test(lastName);

        if (hasNumberInFirst || hasNumberInLast) {
            alert("Name must not contain numbers.");
            return false;
        }

        var hasCharInFirst = /[?!@]/.test(firstName);
        var hasCharInLast  = /[?!@]/.test(lastName);

        if (hasCharInFirst || hasCharInLast) {
            alert("Name must not contain ?, !, or @ characters.");
            return false;
        }

        // check service
        var requestServiceValue = document.getElementById("serviceSelect").value;

        if (requestServiceValue === "Select Service") {
            alert("Please select a service ");
            return false;
        }
       // check date
        var dueDateValue = requestForm.elements["dueDate"].value;

        if (dueDateValue == "") {
            alert("Please select a due date.");
            return false;
        }

        var today = new Date();
        today.setHours(0, 0, 0, 0); 

        var selectedDate = new Date(dueDateValue);

        var diffTime = selectedDate.getTime() - today.getTime();
        var diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 1) {
            alert("Due date is too soon Please choose a later date ");
            return false;
        }
        // check Description
        var descriptionValue = requestForm.elements["Request-Description"].value;

        if (descriptionValue.length < 1) {
            alert("Description must be at least 100 characters.");
            return false;
        }
        //confirm massage
        var confirmStay = confirm(
            "Your request has been sent successfully \nDo you want to stay on this page to add more requests?"
        );

        if (confirmStay) {
         
              var container = document.getElementById("requestsContainer");

            container.innerHTML +=
                "<div class='request-item'>" +
                "<p><strong>Name:</strong> " + firstName + " " + lastName + "</p>" +
                "<p><strong>Service:</strong> " + requestServiceValue + "</p>" +
                "<p><strong>Due Date:</strong> " + dueDateValue + "</p>" +
                "<p><strong>Description:</strong> " + descriptionValue + "</p>" +
                "<hr>" +
                "</div>";

            requestForm.reset();

            return false;
        } else {
            window.location.href = "previousRequests.html";
            return false;
        }
        
    };
}
//service eval page 
var evalForm = document.getElementById("evalForm");

if (evalForm) {

    evalForm.onsubmit = function(event) {

        event.preventDefault(); 
        // check Service
        var evalServiceValue = document.getElementById("service-eval").value;

        if (evalServiceValue === "choose a service") {
            alert("Please select a service to evaluate ");
            return false;
        }

        // check Rating
        var ratingInputs = evalForm.elements["rating"];
        var selectedRating = "";
        var i;

        for (i = 0; i < ratingInputs.length; i++) {
            if (ratingInputs[i].checked) {
                selectedRating = ratingInputs[i].value;
                break;
            }
        }

        if (selectedRating === "") {
            alert("Please select a rating ");
            return false;
        }
        //check feedback
        var feedbackValue = evalForm.elements["feedback"].value;

        if (feedbackValue == "") {
            alert("Please enter your feedback ");
            return false;
        }

        var ratingNumber = parseInt(selectedRating, 10);

        if (ratingNumber >= 3) {
            alert("PureRide appreciates your positive feedback Your satisfaction means a lot to us!”");
        } else {
            alert("We are sorry that you are not fully satisfied We will work to improve our service ");
        }

        window.location.href = "previousRequests.html";
        return false;
    };
}
