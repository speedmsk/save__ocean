const participationsKey = 'participationFormData';
      const participationsList = document.getElementById('participations-list');
      const modifyModal = new bootstrap.Modal(document.getElementById('modifyModal'));
      const modifyForm = document.getElementById('modifyForm');

      // Currency conversion rates
      const conversionRates = {
        TND: { USD: 0.311, EUR: 0.30, GBP: 0.25 },
        USD: { TND: 3.21, EUR: 0.97, GBP: 0.82 },
        EUR: { TND: 3.29, USD: 1.02, GBP: 0.83 },
        GBP: { TND: 3.92, USD: 1.22, EUR: 1.19 },
      };

      // Load participations from local storage
      function loadParticipations() {
        const participationsData = localStorage.getItem(participationsKey);
        participationsList.innerHTML = '';

        if (participationsData) {
          let participations = JSON.parse(participationsData);

          participations.forEach((participation, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${index + 1}</td>
              <td>${participation.firstName}</td>
              <td>${participation.lastName}</td>
              <td>${participation.telephone}</td>
              <td>${participation.birthDate}</td>
              <td>${participation.email}</td>
              <td>${participation.price}</td>
              <td>${participation.currency}</td>
              <td>
                <button type="button" class="btn btn-primary" onclick="openModifyModal(${index})">Modify</button>
                <button type="button" class="btn btn-danger" onclick="deleteParticipation(${index})">Delete</button>
              </td>
            `;
            participationsList.appendChild(row);
          });
        } else {
          participationsList.innerHTML = `
            <tr>
              <td colspan="9" class="no-data">No participations found</td>
            </tr>
          `;
        }
      }

      function openModifyModal(index) {
        const participations = JSON.parse(localStorage.getItem(participationsKey));
        const participation = participations[index];

        document.getElementById('participationIndex').value = index;
        document.getElementById('firstName').value = participation.firstName;
        document.getElementById('lastName').value = participation.lastName;
        document.getElementById('telephone').value = participation.telephone;
        document.getElementById('birthDate').value = participation.birthDate;
        document.getElementById('email').value = participation.email;
        document.getElementById('currency').value = participation.currency;

        modifyModal.show();
      }

      document.getElementById('saveChanges').addEventListener('click', () => {
        const index = document.getElementById('participationIndex').value;
        const participations = JSON.parse(localStorage.getItem(participationsKey));

        const participation = participations[index];

        const newCurrency = document.getElementById('currency').value;
        const oldCurrency = participation.currency;

        if (oldCurrency !== newCurrency) {
          const exchangeRate = conversionRates[oldCurrency][newCurrency];
          participation.price = (participation.price * exchangeRate).toFixed(2);
        }

        participation.firstName = document.getElementById('firstName').value;
        participation.lastName = document.getElementById('lastName').value;
        participation.telephone = document.getElementById('telephone').value;
        participation.birthDate = document.getElementById('birthDate').value;
        participation.email = document.getElementById('email').value;
        participation.currency = newCurrency;

        participations[index] = participation;
        localStorage.setItem(participationsKey, JSON.stringify(participations));

        loadParticipations();
        modifyModal.hide();
      });

      // Delete a participation
      function deleteParticipation(index) {
        const participations = JSON.parse(localStorage.getItem(participationsKey));

        if (confirm('Are you sure you want to delete this participation?')) {
          participations.splice(index, 1);
          localStorage.setItem(participationsKey, JSON.stringify(participations));
          loadParticipations();
        }
      }

      // Initialize page
      loadParticipations();