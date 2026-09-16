let selectedRole = "user";


const roleButtons =
  document.querySelectorAll(".role-btn");

const loginForm =
  document.getElementById("loginForm");

const message =
  document.getElementById("message");

const passwordInput =
  document.getElementById("password");

const togglePassword =
  document.getElementById("togglePassword");


roleButtons.forEach((button) => {

  button.addEventListener("click", () => {

    roleButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedRole =
      button.dataset.role;

  });

});


if (togglePassword) {

  togglePassword.addEventListener(
    "click",
    () => {

      if (
        passwordInput.type === "password"
      ) {

        passwordInput.type = "text";

        togglePassword.textContent =
          "Hide";

      }

      else {

        passwordInput.type =
          "password";

        togglePassword.textContent =
          "Show";

      }

    }
  );

}


loginForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const email =
      document.getElementById("email")
      .value;

    const password =
      passwordInput.value;


    if (!email || !password) {

      message.textContent =
        "Please fill all fields.";

      message.style.color =
        "#b34b4b";

      return;

    }


    message.textContent =
      `Access granted as ${selectedRole.toUpperCase()} ✓`;

    message.style.color =
      "#477657";


    setTimeout(() => {

      if (
        selectedRole === "user"
      ) {

        window.location.href =
          "dashboard.html";

      }


      else if (
        selectedRole === "counsellor"
      ) {

        window.location.href =
          "counsellor.html";

      }


      else if (
        selectedRole === "admin"
      ) {

        window.location.href =
          "admin.html";

      }

    }, 600);

  }
);