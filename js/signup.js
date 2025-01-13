document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem('user_' + email)) {
      
        const toastContainer = document.getElementById('toastContainer');
        toastContainer.innerHTML = `
            <div class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        This email is already registered. Please try a different email.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        const toastElement = new bootstrap.Toast(toastContainer.firstElementChild);
        toastElement.show();


        setTimeout(() => {
            toastElement.hide();
        }, 2000);
        return;
    }

   
    const userData = {
        name: name,
        email: email,
        password: password,
        type:'user'
    };

    localStorage.setItem('user_' + email, JSON.stringify(userData));


    const toastContainer = document.getElementById('toastContainer');
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Sign-Up Successful!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    const toastElement = new bootstrap.Toast(toastContainer.firstElementChild);
    toastElement.show();

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});