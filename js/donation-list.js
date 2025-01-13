document.addEventListener("DOMContentLoaded", function () {
    const donationList = document.getElementById("donation-list");
    const totalDonationsElement = document.getElementById("total-donations");

    const allDonors = JSON.parse(localStorage.getItem("allDonors")) || [];
    let totalDonations = parseFloat(
      localStorage.getItem("totalDonations") || "0"
    );

    let selectedDonorIndex = null;

    const renderDonors = () => {
      let html = "";
      allDonors.forEach((donor, index) => {
        html += `
          <tr>
            <td>${donor.firstName}</td>
            <td>${donor.lastName}</td>
            <td>${donor.email}</td>
            <td>${donor.telephone}</td>
            <td>${donor.currency}</td>
            <td>${donor.donationAmount}</td>
            <td>${donor.convertedAmount.toFixed(2)}</td>
            <td>
              <button type="button" class="btn btn-primary modify-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#modifyModal">Modify</button>
              <button type="button" class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
            </td>
          </tr>
        `;
      });
      donationList.innerHTML = html;
      totalDonationsElement.textContent = totalDonations.toFixed(2);
    };

    const openModifyModal = (index) => {
      selectedDonorIndex = index;
      const donor = allDonors[index];

      document.getElementById("firstName").value = donor.firstName;
      document.getElementById("lastName").value = donor.lastName;
      document.getElementById("email").value = donor.email;
      document.getElementById("telephone").value = donor.telephone;
      document.getElementById("currency").value = donor.currency;
      document.getElementById("donationAmount").value = donor.donationAmount;
    };

    const saveChanges = () => {
      const donor = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        currency: document.getElementById("currency").value,
        donationAmount: parseFloat(document.getElementById("donationAmount").value),
        convertedAmount: parseFloat(document.getElementById("donationAmount").value),
      };

      allDonors[selectedDonorIndex] = donor;
      localStorage.setItem("allDonors", JSON.stringify(allDonors));
      renderDonors();
      const modal = bootstrap.Modal.getInstance(document.getElementById("modifyModal"));
      modal.hide();
    };

    const deleteDonor = (index) => {
      const removedDonor = allDonors.splice(index, 1)[0];
      totalDonations -= removedDonor.convertedAmount;
      localStorage.setItem("allDonors", JSON.stringify(allDonors));
      localStorage.setItem("totalDonations", totalDonations.toFixed(2));
      renderDonors();
    };

    donationList.addEventListener("click", (event) => {
      if (event.target.classList.contains("modify-btn")) {
        openModifyModal(event.target.dataset.index);
      } else if (event.target.classList.contains("delete-btn")) {
        deleteDonor(event.target.dataset.index);
      }
    });

    document.getElementById("saveChanges").addEventListener("click", saveChanges);

    renderDonors();
  });