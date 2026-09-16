const form = document.getElementById("checkinForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const answers = document.querySelectorAll(
    'input[type="radio"]:checked'
  );

  if (answers.length < 4) {
    alert("Please answer all four check-in questions.");
    return;
  }

  let total = 0;

  answers.forEach((answer) => {
    total += Number(answer.value);
  });

  // 4–16 ko 0–100 scale mein convert
  const score = Math.round(
    ((total - 4) / 12) * 100
  );

  let status;
  let priority;

  if (score <= 30) {
    status = "Stable";
    priority = "Low";
  } else if (score <= 60) {
    status = "Needs Attention";
    priority = "Medium";
  } else {
    status = "Priority Review";
    priority = "High";
  }

  const note =
    document.getElementById("note")?.value || "";

  const checkin = {
    score: score,
    status: status,
    priority: priority,
    note: note,
    date: new Date().toISOString()
  };

  // Purani history
  let history = JSON.parse(
    localStorage.getItem("mindcareCheckins")
  ) || [];

  // Naya check-in add
  history.push(checkin);

  // Last 14 records hi rakho
  if (history.length > 14) {
    history = history.slice(-14);
  }

  localStorage.setItem(
    "mindcareCheckins",
    JSON.stringify(history)
  );

  // Latest result alag save
  localStorage.setItem(
    "mindcareLatestCheckin",
    JSON.stringify(checkin)
  );

  // Counsellor case update
  updateCounsellorCase(checkin, history);

  alert(
    "Check-in submitted successfully.\n\n" +
    "Well-being indicator: " +
    score +
    "/100\n" +
    "Status: " +
    status
  );

  window.location.href = "dashboard.html";
});


function updateCounsellorCase(checkin, history) {

  // Higher number = higher support priority
  const caseData = {
    id: "Case MC-1024",

    score: checkin.score,

    priority: checkin.priority,

    status: checkin.status,

    updated: new Date().toISOString(),

    note: checkin.note,

    history: history,

    reviewed: false,

    followup: false
  };

  localStorage.setItem(
    "mindcareCase",
    JSON.stringify(caseData)
  );
}