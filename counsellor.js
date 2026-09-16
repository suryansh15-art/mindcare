const filter = document.getElementById("priorityFilter");
const cases = document.querySelectorAll(".case-item");

filter.addEventListener("change", () => {

  const selected = filter.value;

  cases.forEach((item) => {

    if (
      selected === "all" ||
      item.dataset.level === selected
    ) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }

  });

});


function openCase(user, score, status) {

  document.getElementById("modalUser").textContent =
    "User " + user;

  document.getElementById("modalScore").textContent =
    score + "/100";

  document.getElementById("modalStatus").textContent =
    status;

  document
    .getElementById("caseModal")
    .classList.add("show");
}


function closeCase() {

  document
    .getElementById("caseModal")
    .classList.remove("show");
}


function markReviewed() {

  alert(
    "Case marked as reviewed for this prototype."
  );

  closeCase();
}


function logout() {
  window.location.href = "index.html";
}


window.addEventListener("click", (event) => {

  const modal =
    document.getElementById("caseModal");

  if (event.target === modal) {
    closeCase();
  }

});