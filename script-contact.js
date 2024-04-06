function isEmail(email) {
    let regex = /[a-zA-Z\d]+@[a-zA-Z\d]+\.[a-zA-Z\d]+/;
    return regex.test(email);
}

function submit() {
    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function validate(event){
        event.preventDefault();

        let firstName = document.getElementById("fname").value.trim();
        let lastName = document.getElementById("lname").value.trim();
        let email = document.getElementById("email").value.trim();

        let returning = document.querySelectorAll('input[name="returning"]');
        let returnChosen = false;
        for (let i = 0; i < returning.length; i++) {
            if (returning[i].checked) {
                returnChosen = true;
                break;
            }
        }

        let feedback = document.querySelectorAll('input[name="liked_website"]');
        let feedbackChosen = false;
        for (let i = 0; i < feedback.length; i++) {
            if (feedback[i].checked) {
                feedbackChosen = true;
                break;
            }
        }

        let message = document.getElementById("error-msg");
        
        if (firstName === "") {
            message.innerHTML = "Please enter a first name";
            message.style.color = "red";
        } else if (lastName === "") {
            message.innerHTML = "Please enter a last name";
            message.style.color = "red";
        } else if (email === "") {
            message.innerHTML = "Please enter your email";
            message.style.color = "red";
        } else if (!isEmail(email)) {
            message.innerHTML = "Please enter a valid email";
            message.style.color = "red";
        } else if (!returnChosen) {
            message.innerHTML = "Please answer if you are returning";
            message.style.color = "red";
        } else if (!feedbackChosen) {
            message.innerHTML = "Please choose your feedback";
            message.style.color = "red";
        } else {
            message.innerHTML = "Success!";
            message.style.color = "green";
            alert("Thank you! Your response has been received.");
        }
    });  
}

submit()