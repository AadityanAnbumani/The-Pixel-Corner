document.addEventListener("DOMContentLoaded", () => {
  // ---------- Hamon section ----------
  const hamonSection = document.querySelector(".hamon-section");
  const sunlight = document.querySelector(".sunlight");
  const breathingOverlay = document.querySelector(".breathing-overlay");

  const hamonBtn = document.getElementById("hamon-btn");
  const joseph = document.getElementById("joseph");
  const hamonJoseph = document.getElementById("hamon-joseph");
  const josephScene = document.querySelector(".joseph-scene");
  const hamonFlash = document.querySelector(".hamon-flash");

  // Toggle sunlight + breathing rings when the Hamon section scrolls into view
  const hamonObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const opacity = entry.isIntersecting ? "1" : "0";
        sunlight.style.opacity = opacity;
        if (breathingOverlay) breathingOverlay.style.opacity = opacity;
      });
    },
    { threshold: 0.4 }
  );

  if (hamonSection) {
    hamonObserver.observe(hamonSection);
  }

  if (hamonBtn && joseph && hamonJoseph && josephScene && hamonFlash) {
    hamonBtn.addEventListener("click", () => {
      josephScene.classList.add("powering");
      hamonBtn.disabled = true;
      hamonBtn.innerText = "Channeling Hamon...";
      hamonFlash.classList.add("active");

      setTimeout(() => {
        joseph.style.opacity = "0";
        hamonJoseph.style.opacity = "1";
        hamonBtn.innerText = "Hamon Activated";
      }, 3000);
    });
  }

  // ---------- Stand section ----------
  const arrowBtn = document.getElementById("arrow-btn");
  const standFlash = document.querySelector(".stand-flash");
  const awakening = document.querySelector(".stand-awakening");
  const selection = document.querySelector(".stand-selection");
  const detail = document.querySelector(".stand-detail");
  const standCharacter = document.querySelector(".stand-character");
  const standCards = document.querySelectorAll(".stand-card");
  const standBack = document.getElementById("stand-back");
  const standIdle = document.getElementById("stand-idle");
  const standAttack = document.getElementById("stand-attack");
  const standName = document.getElementById("stand-name");
  const standStats = document.getElementById("stand-stats");
  const attackBtn = document.getElementById("attack-btn");

  const stands = {
    star: {
      name: "Star Platinum",
      idle: "https://i.imgur.com/r4OXrro.gif",
      attack: "https://i.imgur.com/dHQ8mZA.gif",
      attackTime: 1200,
      stats: `
        Power ★★★★★<br>
        Speed ★★★★★<br>
        Range ★☆☆☆☆<br><br>
        Ability: Superhuman precision and time stopping.
      `,
    },
    world: {
      name: "The World",
      idle: "https://i.imgur.com/sEQMSle.gif",
      attack: "https://i.imgur.com/DeSmdRU.gif",
      attackTime: 3000,
      stats: `
        Power ★★★★★<br>
        Speed ★★★★★<br>
        Range ★★☆☆☆<br><br>
        Ability: Stops time itself.
      `,
    },
    chariot: {
      name: "Silver Chariot",
      idle: "https://i.imgur.com/wRrrIq5.gif",
      attack: "https://i.imgur.com/mwKtn8W.gif",
      attackTime: 2500,
      stats: `
        Power ★★★★☆<br>
        Speed ★★★☆☆<br>
        Range ★★★☆☆<br><br>
        Ability: Extreme speed and precision sword attacks.
      `,
    },
  };

  let selectedStand = null;

  // Pierce the arrow -> reveal stand selection
  arrowBtn.addEventListener("click", () => {
    standFlash.classList.add("active");

    setTimeout(() => {
      awakening.classList.add("hidden");
      selection.classList.remove("hidden");
    }, 300);
  });

  // Choose a stand -> show its detail view
  standCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedStand = stands[card.dataset.stand];

      selection.classList.add("hidden");
      detail.classList.remove("hidden");
      standCharacter.classList.remove("hidden");

      standName.innerHTML = selectedStand.name;
      standStats.innerHTML = selectedStand.stats;
      standIdle.src = selectedStand.idle;
      standAttack.src = selectedStand.attack;

      standIdle.style.display = "block";
      standAttack.style.display = "none";
    });
  });

  // Back button -> return to stand selection
  standBack.addEventListener("click", () => {
    detail.classList.add("hidden");
    selection.classList.remove("hidden");
    standAttack.style.display = "none";
  });

  // Attack button -> play attack gif, then revert to idle
  attackBtn.addEventListener("click", () => {
    if (!selectedStand) return;

    standIdle.style.display = "none";
    standAttack.style.display = "block";

    setTimeout(() => {
      standAttack.style.display = "none";
      standIdle.style.display = "block";
    }, selectedStand.attackTime);
  });

  // ---------- Creativity puzzle ----------
  document.querySelectorAll(".puzzle-reveal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".puzzle-card");
      const answer = card.querySelector(".puzzle-answer");
      answer.classList.remove("hidden");
      btn.disabled = true;
      btn.innerText = "Revealed";
    });
  });

  // ---------- Design Your Own Power builder ----------
  const builderStep1 = document.getElementById("builder-step-1");
  const builderStep2 = document.getElementById("builder-step-2");
  const builderResult = document.getElementById("builder-result");
  const resultAbility = document.getElementById("result-ability");
  const resultLimitation = document.getElementById("result-limitation");
  const builderRestart = document.getElementById("builder-restart");

  let chosenAbility = null;

  if (builderStep1) {
    builderStep1.querySelectorAll(".builder-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        chosenAbility = btn.dataset.value;
        builderStep1.classList.add("hidden");
        builderStep2.classList.remove("hidden");
      });
    });
  }

  if (builderStep2) {
    builderStep2.querySelectorAll(".builder-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosenLimitation = btn.dataset.value;
        resultAbility.innerText = chosenAbility;
        resultLimitation.innerText = chosenLimitation;
        builderStep2.classList.add("hidden");
        builderResult.classList.remove("hidden");
      });
    });
  }

  if (builderRestart) {
    builderRestart.addEventListener("click", () => {
      chosenAbility = null;
      builderResult.classList.add("hidden");
      builderStep2.classList.add("hidden");
      builderStep1.classList.remove("hidden");
    });
  }

  // ---------- Reading progress bar ----------
  const progressBar = document.getElementById("progress-bar");

  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }
});