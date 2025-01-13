const urlParams = new URLSearchParams(window.location.search);
      const price = parseFloat(urlParams.get('price')) || 0; // Default to 0 if no price is passed
      const participatePriceInput = document.getElementById('participate-price');
      const currencySelect = document.getElementById('currency');
    
      // Display the default price as a numeric value
      participatePriceInput.value = `${price.toFixed(2)}`;
    
      // Conversion rates
      const conversionRates = {
        USD: 1,
        TND: 3.21,
        EUR: 0.97,
        GBP:  0.82,
      };
    
      // Update the price based on selected currency
      currencySelect.addEventListener('change', () => {
        const selectedCurrency = currencySelect.value;
        if (conversionRates[selectedCurrency]) {
          const convertedPrice = (price * conversionRates[selectedCurrency]).toFixed(2);
          participatePriceInput.value = `${convertedPrice}`;
        } else {
          participatePriceInput.value = `${price.toFixed(2)}`; // Default to original price if no currency is selected
        }
      });
    
      // Form validation and submission handler
      document.getElementById('participation-form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const telephone = document.getElementById('telephone').value;
        const birthDate = document.getElementById('birth-date').value;
        const email = document.getElementById('email').value;
        const currency = document.getElementById('currency').value;
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeat-password').value;
    
        let valid = true;
    
        
        if (!/^[a-zA-Z\s]+$/.test(firstName)) {
          document.getElementById('first-name-error').style.display = 'block';
          valid = false;
        } else {
          document.getElementById('first-name-error').style.display = 'none';
        }
    
        if (!/^[a-zA-Z\s]+$/.test(lastName)) {
          document.getElementById('last-name-error').style.display = 'block';
          valid = false;
        } else {
          document.getElementById('last-name-error').style.display = 'none';
        }
    
        if (!/^[0-9]+$/.test(telephone)) {
          document.getElementById('telephone-error').style.display = 'block';
          valid = false;
        } else {
          document.getElementById('telephone-error').style.display = 'none';
        }
    
        if (password !== repeatPassword) {
          document.getElementById('password-error').style.display = 'block';
          valid = false;
        } else {
          document.getElementById('password-error').style.display = 'none';
        }
    
        if (!valid) return;
    
     
        const existingData = JSON.parse(localStorage.getItem('participationFormData')) || [];
    
     
        let participations = Array.isArray(existingData) ? existingData : [existingData];
    
        
        const newParticipation = {
          firstName,
          lastName,
          telephone,
          birthDate,
          email,
          price: participatePriceInput.value,
          currency,
        };
    
       
        participations.push(newParticipation);
    
      
        localStorage.setItem('participationFormData', JSON.stringify(participations));
    
        
        const thankYouMessage = document.getElementById('thank-you-message');
        thankYouMessage.textContent = `Thank you for your participation!`;
        thankYouMessage.style.display = 'block';
    
       
        document.getElementById('participation-form').reset();
        participatePriceInput.value = `${price.toFixed(2)}`;
        window.location.href = "index.html"; 
      
      });