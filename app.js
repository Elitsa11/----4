const maxEnergy = 120;
let energy = maxEnergy;

const energyBar = document.getElementById("energyBar");
const energyValue = document.getElementById("energyValue");
const statusText = document.getElementById("statusText");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

const heroPanel = document.querySelector(".hero-panel");

function updateEnergy() {
  const percent = (energy / maxEnergy) * 100;
  energyBar.style.width = `${percent}%`;
  energyValue.textContent = `${energy} / ${maxEnergy}`;

  if (energy === 0) {
    statusText.textContent = "Енергията е 0. Не може да се използва способност.";
    heroPanel.classList.remove("shield", "strike", "surge");
  }

  document.querySelectorAll(".ability-btn").forEach((button) => {
    const cost = Number(button.dataset.cost) || 0;
    if (button.id === "surgeBtn") {
      button.disabled = energy >= maxEnergy || energy === 0;
    } else {
      button.disabled = energy < cost || energy === 0;
    }
  });
}

function setActiveAbility(name, styleClass) {
  statusText.textContent = `Активирана способност: ${name}`;
  heroPanel.classList.remove("shield", "strike", "surge");
  if (styleClass) {
    heroPanel.classList.add(styleClass);
  }
}

function useAbility(name, cost, effect, styleClass) {
  if (energy === 0) {
    statusText.textContent = `Не може да се използва ${name}. Енергията е 0.`;
    statusText.classList.add("warning");
    return;
  }

  if (energy < cost) {
    statusText.textContent = `Недостатъчно енергия за ${name}.`;
    statusText.classList.add("warning");
    return;
  }

  statusText.classList.remove("warning");

  if (effect === "restore") {
    energy = clamp(energy + cost, 0, maxEnergy);
    statusText.textContent = `Активирана способност: ${name}. Енергията се възстановява.`;
  } else {
    energy = clamp(energy - cost, 0, maxEnergy);
    statusText.textContent = `Активирана способност: ${name}. Изразходвани ${cost} енергия.`;
  }

  setActiveAbility(name, styleClass);
  updateEnergy();
}

function power(ability) {
  const { name, cost, color, effect = null } = ability;
  useAbility(name, cost, effect, color);
}

document.getElementById("shieldBtn").addEventListener("click", () => {
  power({ name: "Shield Bash", cost: 20, color: "shield" });
});

document.getElementById("strikeBtn").addEventListener("click", () => {
  power({ name: "Power Strike", cost: 35, color: "strike" });
});

document.getElementById("surgeBtn").addEventListener("click", () => {
  power({ name: "Energy Surge", cost: 50, color: "surge", effect: "restore" });
});

document.getElementById("frostBtn").addEventListener("click", () => {
  power({ name: "Frost Wall", cost: 25, color: "frost" });
});

document.getElementById("meteorBtn").addEventListener("click", () => {
  power({ name: "Meteor Strike", cost: 45, color: "meteor" });
});

updateEnergy();
