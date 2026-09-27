const BMC_URL = "https://www.buymeacoffee.com/YOUR_USERNAME";
let selectedAmount = 5;
const amountButtons = document.querySelectorAll("#amounts button");
const customAmount = document.getElementById("customAmount");
const donateBtn = document.getElementById("donateBtn");

amountButtons.forEach(button => {
  button.addEventListener("click", () => {
    amountButtons.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    customAmount.value = "";
    selectedAmount = Number(button.dataset.amount);
    updateDonateButton();
  });
});

customAmount.addEventListener("input", () => {
  amountButtons.forEach(b => b.classList.remove("selected"));
  const value = Number(customAmount.value);
  if (value > 0) selectedAmount = value;
  updateDonateButton();
});

function updateDonateButton() {
  donateBtn.innerHTML = `Donate $${selectedAmount || 0} <span>→</span>`;
}

donateBtn.addEventListener("click", () => {
  if (!selectedAmount || selectedAmount < 1) {
    alert("Please enter a donation amount of at least $1.");
    return;
  }
  if (BMC_URL.includes("YOUR_USERNAME")) {
    alert("Set your Buy Me a Coffee username in script.js first.");
    return;
  }
  window.open(BMC_URL, "_blank", "noopener,noreferrer");
});

function shareProject() {
  const data = { title: "Morgan Player", text: "Check out Morgan Player — a modern music and video player.", url: window.location.href };
  if (navigator.share) navigator.share(data).catch(() => {});
  else navigator.clipboard?.writeText(window.location.href).then(() => alert("Page link copied!"));
}

document.getElementById("year").textContent = new Date().getFullYear();
