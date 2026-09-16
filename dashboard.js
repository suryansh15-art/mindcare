/* =========================================================
   MINDCARE - COMPLETE DASHBOARD.JS
   Mood + Check-in Data + Insights + Mira AI Companion
========================================================= */


/* =========================================================
   1. MOOD SELECTOR
========================================================= */

const moodButtons = document.querySelectorAll(".mood-btn");
const moodMessage = document.getElementById("moodMessage");

moodButtons.forEach((button) => {

  button.addEventListener("click", () => {

    moodButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const mood = button.dataset.mood;

    if (moodMessage) {
      moodMessage.textContent =
        "Selected mood: " + mood;
    }

    localStorage.setItem(
      "mindcareMood",
      mood
    );

  });

});


/* =========================================================
   2. START CHECK-IN
========================================================= */

function startCheckin() {

  window.location.href =
    "checkin.html";

}


/* =========================================================
   3. LOGOUT
========================================================= */

function logout() {

  window.location.href =
    "index.html";

}


/* =========================================================
   4. EXPLAINABLE AI MODAL
========================================================= */

function showExplanation() {

  const modal =
    document.getElementById(
      "explanationModal"
    );

  if (modal) {
    modal.classList.add("show");
  }

}


function closeExplanation() {

  const modal =
    document.getElementById(
      "explanationModal"
    );

  if (modal) {
    modal.classList.remove("show");
  }

}


window.addEventListener(
  "click",
  (event) => {

    const modal =
      document.getElementById(
        "explanationModal"
      );

    if (
      modal &&
      event.target === modal
    ) {

      closeExplanation();

    }

  }
);


/* =========================================================
   5. LOAD LATEST CHECK-IN
========================================================= */

function loadLatestCheckin() {

  const latest =
    JSON.parse(
      localStorage.getItem(
        "mindcareLatestCheckin"
      )
    );

  if (!latest) {
    return;
  }


  const scoreElement =
    document.getElementById(
      "latestScore"
    );

  const statusElement =
    document.getElementById(
      "latestStatus"
    );

  const lastCheckinElement =
    document.getElementById(
      "lastCheckin"
    );


  if (scoreElement) {

    scoreElement.textContent =
      latest.score + "/100";

  }


  if (statusElement) {

    statusElement.textContent =
      latest.status;

  }


  if (lastCheckinElement) {

    const date =
      new Date(latest.date);

    lastCheckinElement.textContent =
      date.toLocaleString();

  }


  updateDashboardInsight(
    latest
  );

}


/* =========================================================
   6. DYNAMIC AI INSIGHT
========================================================= */

function updateDashboardInsight(latest) {

  const insight =
    document.getElementById(
      "dynamicInsight"
    );

  if (!insight) {
    return;
  }


  if (latest.score <= 30) {

    insight.textContent =
      "Your recent check-in pattern looks relatively stable.";

  }

  else if (latest.score <= 60) {

    insight.textContent =
      "Some changes appeared in your recent check-in. Tracking the pattern over the next few days may provide more context.";

  }

  else {

    insight.textContent =
      "Your latest responses show a noticeable change. A support professional may review this check-in.";

  }

}


/* =========================================================
   7. GET CHECK-IN HISTORY
========================================================= */

function getCheckinHistory() {

  return (
    JSON.parse(
      localStorage.getItem(
        "mindcareCheckins"
      )
    ) || []
  );

}


/* =========================================================
   8. RESTORE SAVED MOOD
========================================================= */

function restoreMood() {

  const savedMood =
    localStorage.getItem(
      "mindcareMood"
    );

  if (!savedMood) {
    return;
  }


  moodButtons.forEach(
    (button) => {

      if (
        button.dataset.mood ===
        savedMood
      ) {

        button.classList.add(
          "active"
        );

      }

    }
  );


  if (moodMessage) {

    moodMessage.textContent =
      "Selected mood: " +
      savedMood;

  }

}


/* =========================================================
   9. MIRA CHAT OPEN / CLOSE
========================================================= */

function toggleMiraChat() {
  const chat = document.getElementById("miraChat");
  const miraButton = document.getElementById("miraFab");

  if (!chat) {
    return;
  }

  chat.classList.toggle("show");

  if (miraButton) {
    if (chat.classList.contains("show")) {
      miraButton.style.display = "none";
    } else {
      miraButton.style.display = "flex";
    }
  }

  setTimeout(scrollToBottom, 100);
}


/* =========================================================
   10. SEND MIRA MESSAGE
========================================================= */

function sendMiraMessage() {

  const input =
    document.getElementById(
      "miraInput"
    );

  if (!input) {
    return;
  }


  const message =
    input.value.trim();


  if (!message) {
    return;
  }


  addUserMessage(
    message
  );

  input.value = "";

  hideQuickReplies();

  showTypingIndicator();


  setTimeout(() => {

    removeTypingIndicator();

    const response =
      generateMiraResponse(
        message
      );

    addBotMessage(
      response
    );

  }, 700);

}


/* =========================================================
   11. QUICK REPLY
========================================================= */

function quickReply(text) {

  addUserMessage(
    text
  );

  hideQuickReplies();

  showTypingIndicator();


  setTimeout(() => {

    removeTypingIndicator();

    addBotMessage(
      generateMiraResponse(
        text
      )
    );

  }, 650);

}


/* =========================================================
   12. ADD USER MESSAGE
========================================================= */

function addUserMessage(message) {

  const messages =
    document.getElementById(
      "miraMessages"
    );

  if (!messages) {
    return;
  }


  const div =
    document.createElement(
      "div"
    );

  div.className =
    "mira-message user-message";

  div.innerHTML =
    escapeHTML(message);

  messages.appendChild(
    div
  );

  scrollToBottom();

}


/* =========================================================
   13. ADD BOT MESSAGE
========================================================= */

function addBotMessage(message) {

  const messages =
    document.getElementById(
      "miraMessages"
    );

  if (!messages) {
    return;
  }


  const div =
    document.createElement(
      "div"
    );

  div.className =
    "mira-message bot-message";

  div.innerHTML =
    message;

  messages.appendChild(
    div
  );

  scrollToBottom();

}


/* =========================================================
   14. TYPING INDICATOR
========================================================= */

function showTypingIndicator() {

  const messages =
    document.getElementById(
      "miraMessages"
    );

  if (!messages) {
    return;
  }


  removeTypingIndicator();


  const typing =
    document.createElement(
      "div"
    );

  typing.id =
    "miraTyping";

  typing.className =
    "mira-message bot-message typing-message";

  typing.innerHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;

  messages.appendChild(
    typing
  );

  scrollToBottom();

}


function removeTypingIndicator() {

  const typing =
    document.getElementById(
      "miraTyping"
    );

  if (typing) {
    typing.remove();
  }

}


/* =========================================================
   15. MIRA RESPONSE ENGINE
========================================================= */

function generateMiraResponse(message) {

  const text =
    message
      .toLowerCase()
      .trim();


  /* -------------------------
     GREETINGS
  ------------------------- */

  if (
    text === "hi" ||
    text === "hii" ||
    text === "hiii" ||
    text === "hello" ||
    text === "hey" ||
    text === "heyy" ||
    text === "heyyy"
  ) {

    return `
      Hey 🙂 I'm here.
      How has your day been going so far?
    `;

  }


  /* -------------------------
     GOOD MORNING
  ------------------------- */

  if (
    text.includes(
      "good morning"
    )
  ) {

    return `
      Good morning 🙂
      How are you feeling about the day ahead?
    `;

  }


  /* -------------------------
     GOOD EVENING
  ------------------------- */

  if (
    text.includes(
      "good evening"
    )
  ) {

    return `
      Good evening 🙂
      How has your day treated you?
    `;

  }


  /* -------------------------
     THANK YOU
  ------------------------- */

  if (
    text.includes(
      "thank you"
    ) ||
    text === "thanks" ||
    text === "thankyou" ||
    text === "thx"
  ) {

    return `
      Anytime 🙂
      I'm here whenever you feel like checking in again.
    `;

  }


  /* -------------------------
     POSITIVE FAMILY
  ------------------------- */

  if (
    (
      text.includes("mom") ||
      text.includes("mother") ||
      text.includes("mummy") ||
      text.includes("dad") ||
      text.includes("father") ||
      text.includes("papa") ||
      text.includes("family")
    ) &&
    (
      text.includes("happy") ||
      text.includes("good") ||
      text.includes("love") ||
      text.includes("better") ||
      text.includes("nice")
    )
  ) {

    return `
      That sounds like a really positive part of your day 🙂
      Spending time with people you care about can make a big difference.
      What about that moment made you feel especially good today?
    `;

  }


  /* -------------------------
     FAMILY GENERAL
  ------------------------- */

  if (
    text.includes("mom") ||
    text.includes("mother") ||
    text.includes("mummy") ||
    text.includes("dad") ||
    text.includes("father") ||
    text.includes("papa") ||
    text.includes("family")
  ) {

    return `
      Family can have a big effect on how a day feels.
      Do you want to tell me what happened?
    `;

  }


  /* -------------------------
     POSITIVE MOOD
  ------------------------- */

  if (
    text.includes("happy") ||
    text.includes("amazing") ||
    text.includes("great") ||
    text.includes("feeling good") ||
    text.includes("better today") ||
    text.includes("excited") ||
    text.includes("pretty good")
  ) {

    return `
      That's nice to hear 🙂
      What was the best part of your day?
    `;

  }


  /* -------------------------
     FRIENDS
  ------------------------- */

  if (
    text.includes("friend") ||
    text.includes("friends")
  ) {

    return `
      Sounds like your friends are on your mind.
      Was something good happening with them, or has something been bothering you?
    `;

  }


  /* -------------------------
     STUDY / EXAM
  ------------------------- */

  if (
    text.includes("exam") ||
    text.includes("exams") ||
    text.includes("marks") ||
    text.includes("result") ||
    text.includes("study") ||
    text.includes("studying") ||
    text.includes("assignment") ||
    text.includes("padhai")
  ) {

    return `
      Study pressure can feel pretty intense sometimes.
      Is it the workload, an upcoming deadline, or worrying about the result that's bothering you most?
    `;

  }


  /* -------------------------
     COLLEGE / SCHOOL
  ------------------------- */

  if (
    text.includes("college") ||
    text.includes("school") ||
    text.includes("class") ||
    text.includes("teacher")
  ) {

    return `
      Got it. Something around school or college seems to be affecting your day.
      What happened?
    `;

  }


  /* -------------------------
     STRESS
  ------------------------- */

  if (
    text.includes("stress") ||
    text.includes("stressed") ||
    text.includes("pressure") ||
    text.includes("overwhelmed") ||
    text.includes("tension")
  ) {

    return `
      Sounds like you've got a lot competing for your attention right now.
      What's the biggest source of pressure at the moment?
    `;

  }


  /* -------------------------
     WORRIED
  ------------------------- */

  if (
    text.includes("nervous") ||
    text.includes("anxious") ||
    text.includes("worried") ||
    text.includes("worry")
  ) {

    return `
      Sounds like your mind is running ahead to what might happen.
      What's the specific thing you're most worried about right now?
    `;

  }


  /* -------------------------
     TIRED / SLEEP
  ------------------------- */

  if (
    text.includes("tired") ||
    text.includes("sleep") ||
    text.includes("sleepy") ||
    text.includes("exhausted")
  ) {

    return `
      Your energy sounds pretty low right now.
      Has this mostly been today, or have you been feeling tired for several days?
    `;

  }


  /* -------------------------
     ANGRY
  ------------------------- */

  if (
    text.includes("angry") ||
    text.includes("annoyed") ||
    text.includes("irritated") ||
    text.includes("frustrated")
  ) {

    return `
      Sounds like something really bothered you.
      Want to tell me what happened?
    `;

  }


  /* -------------------------
     LONELY
  ------------------------- */

  if (
    text.includes("lonely") ||
    text.includes("alone") ||
    text.includes(
      "no one understands"
    )
  ) {

    return `
      Feeling disconnected can make a difficult day feel heavier.
      Is there someone you trust who you could talk to or spend some time with today?
    `;

  }


  /* -------------------------
     LOW MOOD
  ------------------------- */

  if (
    text.includes("sad") ||
    text.includes("low") ||
    text.includes("feeling bad") ||
    text.includes("not good")
  ) {

    return `
      I'm listening.
      You don't have to explain everything at once.
      What has been making today feel difficult?
    `;

  }


  /* -------------------------
     BAD DAY
  ------------------------- */

  if (
    text.includes("bad day") ||
    text.includes("rough day") ||
    text.includes("terrible day") ||
    text.includes("stressful day")
  ) {

    return `
      Sounds like today has been difficult.
      We can take it one thing at a time.
      What was the hardest part?
    `;

  }


  /* -------------------------
     BORED
  ------------------------- */

  if (
    text.includes("bored") ||
    text.includes("boring") ||
    text.includes(
      "nothing to do"
    )
  ) {

    return `
      One of those slow days 😅
      A small change of scene, some music, or a short walk might help.
      Or you can just stay here and talk for a bit.
    `;

  }


  /* -------------------------
     CONFUSED
  ------------------------- */

  if (
    text.includes("confused") ||
    text.includes(
      "don't know what to do"
    ) ||
    text.includes(
      "dont know what to do"
    )
  ) {

    return `
      We don't have to figure everything out at once.
      What's the main situation or decision you're stuck on?
    `;

  }


  /* -------------------------
     MUSIC
  ------------------------- */

  if (
    text.includes("music") ||
    text.includes("song") ||
    text.includes("songs")
  ) {

    return `
      Music can be a nice reset.
      Has listening to something helped your mood today?
    `;

  }


  /* -------------------------
     WALK / EXERCISE
  ------------------------- */

  if (
    text.includes("walk") ||
    text.includes("exercise") ||
    text.includes("gym")
  ) {

    return `
      A little movement can sometimes help clear your head.
      How did you feel afterwards compared with before?
    `;

  }


  /* -------------------------
     SAFETY / NEED HUMAN HELP
  ------------------------- */

  if (
    text.includes("unsafe") ||
    text.includes("danger") ||
    text.includes("emergency") ||
    text.includes("need help now")
  ) {

    return `
      It sounds important to involve a real person right now.
      Please reach out to a trusted adult or an authorized support professional nearby.
      I can also help you organise what you'd like to tell them.
    `;

  }


  /* -------------------------
     JUST WANT TO TALK
  ------------------------- */

  if (
    text === "talk" ||
    text.includes(
      "want to talk"
    ) ||
    text.includes(
      "just want to talk"
    )
  ) {

    return `
      Of course.
      Start wherever feels easiest — what's been on your mind today?
    `;

  }


  /* -------------------------
     BYE
  ------------------------- */

  if (
    text === "bye" ||
    text === "goodbye" ||
    text === "goodnight" ||
    text.includes(
      "good night"
    )
  ) {

    return `
      Take care 🙂
      You can come back whenever you feel like checking in again.
    `;

  }


  /* -------------------------
     DEFAULT
  ------------------------- */

  return `
    I'm listening 🙂
    Tell me a little more about that.
  `;

}


/* =========================================================
   16. QUICK REPLIES HIDE
========================================================= */

function hideQuickReplies() {

  const replies =
    document.querySelector(
      ".mira-quick-replies"
    );

  if (replies) {
    replies.style.display =
      "none";
  }

}


/* =========================================================
   17. SCROLL CHAT
========================================================= */

function scrollToBottom() {

  const messages =
    document.getElementById(
      "miraMessages"
    );

  if (!messages) {
    return;
  }

  messages.scrollTop =
    messages.scrollHeight;

}


/* =========================================================
   18. SECURITY - ESCAPE USER TEXT
========================================================= */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    text;

  return div.innerHTML;

}


/* =========================================================
   19. ENTER KEY SEND
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const input =
      document.getElementById(
        "miraInput"
      );

    if (input) {

      input.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" &&
            !event.shiftKey
          ) {

            event.preventDefault();

            sendMiraMessage();

          }

        }
      );

    }

  }
);


/* =========================================================
   20. INITIALISE DASHBOARD
========================================================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    restoreMood();

    loadLatestCheckin();

  }
);