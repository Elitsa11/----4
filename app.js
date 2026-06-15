const maxEnergy = 100;
let energy = maxEnergy;

const energyBar = document.getElementById("energyBar");
const energyValue = document.getElementById("energyValue");
const statusText = document.getElementById("statusText");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateEnergy() {
  const percent = (energy / maxEnergy) * 100;
  energyBar.style.width = `${percent}%`;
  energyValue.textContent = `${energy} / ${maxEnergy}`;

  document.querySelectorAll(".ability-btn").forEach((button) => {
    const cost = Number(button.dataset.cost) || 0;
    if (button.id === "surgeBtn") {
      button.disabled = energy >= maxEnergy;
    } else {
      button.disabled = energy < cost;
    }
  });
}

function useAbility(name, cost, effect) {
  if (cost > 0 && energy < cost) {
    statusText.textContent = `Недостатъчно енергия за ${name}.`;
    return;
  }

  if (effect === "restore") {
    energy = clamp(energy + cost, 0, maxEnergy);
    statusText.textContent = `${name} активирана! Енергията се възстановява.`;
  } else {
    energy = clamp(energy - cost, 0, maxEnergy);
    statusText.textContent = `${name} активирана! Изразходвани ${cost} енергия.`;
  }

  updateEnergy();
}

document.getElementById("shieldBtn").addEventListener("click", () => {
  useAbility("Shield Bash", 15);
});

document.getElementById("strikeBtn").addEventListener("click", () => {
  useAbility("Power Strike", 30);
});

document.getElementById("surgeBtn").addEventListener("click", () => {
  useAbility("Energy Surge", 40, "restore");
});

updateEnergy();
