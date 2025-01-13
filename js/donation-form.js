document
.getElementById("donation-form")
.addEventListener("submit", function (event) {
  event.preventDefault();

  
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const telephone = document.getElementById("telephone").value;
  const email = document.getElementById("email").value;
  const donationAmount = parseFloat(
    document.getElementById("donation-amount").value
  );
  const currency = document.getElementById("currency").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById(
    "repeat-password"
  ).value;

  let valid = true;


  if (!/^[a-zA-Z\s]+$/.test(firstName)) {
    document.getElementById("first-name-error").style.display = "block";
    valid = false;
  } else {
    document.getElementById("first-name-error").style.display = "none";
  }

  if (password !== repeatPassword) {
    document.getElementById("password-error").style.display = "block";
    valid = false;
  } else {
    document.getElementById("password-error").style.display = "none";
  }

  if (donationAmount <= 0 || isNaN(donationAmount)) {
    document.getElementById("donation-amount-error").style.display =
      "block";
    valid = false;
  } else {
    document.getElementById("donation-amount-error").style.display =
      "none";
  }

  if (!valid) return;

  
  let convertedAmount = donationAmount;
  if (currency === "TND") {
    convertedAmount = donationAmount / 3.33; 
  } else if (currency === "EUR") {
    convertedAmount = donationAmount * 1.1;
  } else if (currency === "GBP") {
    convertedAmount = donationAmount * 1.25;
  }

  
  const donorData = {
    firstName,
    lastName,
    telephone,
    email,
    currency,
    donationAmount,
    convertedAmount,
  };

  const allDonors = JSON.parse(localStorage.getItem("allDonors")) || [];
  allDonors.push(donorData);
  localStorage.setItem("allDonors", JSON.stringify(allDonors));

 
  const totalDonations =
    parseFloat(localStorage.getItem("totalDonations")) || 0;
  const updatedTotalDonations = totalDonations + convertedAmount;
  localStorage.setItem("totalDonations", updatedTotalDonations);

  
  
const thankYouMessage = document.getElementById("thank-you-message");
thankYouMessage.style.display = "block";
  window.location.href = "index.html"; 
});