import { emailValidation } from "../utils/emailValidation.js";
import { validateId } from "../utils/studentIdValidation.js";

initRegistration();
function initRegistration() {
  const studentId = document.querySelector("#student-id");
  const studentName = document.querySelector("#student-name");
  const studentEmail = document.querySelector("#email");
  const yearSection = document.querySelector("#yearsection");

  const submit = document.querySelector("#submit");
  submit.addEventListener("click", () => {
    if (!validateId(studentId.value.trim())) {
      alert("invalid student ID");
      return;
    }

    if (!emailValidation(studentEmail.value.trim())) {
      alert("invalid Email Format");
      return;
    }

    if (studentName.value.trim().length === 0) {
      alert("student must not empty");
      return;
    }

    if (yearSection.value.trim().length === 0) {
      alert("year & section must not empty");
    }

    console.log(
      `${studentId.value.trim()} - ${studentName.value.trim()} - ${studentEmail.value.trim()} - ${yearSection.value.trim()}`,
    );
  });
}

/*
make a api call for register or post in the mysql (pending..)
make a function that will redirect to the login window (pending..)
*/
