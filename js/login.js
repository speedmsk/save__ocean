document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from local storage
    const userData = localStorage.getItem('user_' + email);
    const toastContainer = document.getElementById('toastContainer');

    if (userData) {
        const user = JSON.parse(userData);

        if (user.password === password) {
            // Store the login state in localStorage
            localStorage.setItem('login', 'true');
            localStorage.setItem("isAdmin", user.type === "admin");

            // Show success toast
            toastContainer.innerHTML = `
                <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            Login Successful! Redirecting...
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            `;
            const toast = new bootstrap.Toast(toastContainer.firstElementChild);
            toast.show();

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to main page
            }, 2000);
        } else {
            // Show invalid password toast
            showToast('Invalid password. Please try again.', 'danger');
        }
    } else {
        // Show no account found toast
        showToast('No account found with this email. Please sign up.', 'warning');
    }
});

function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    const toast = new bootstrap.Toast(toastContainer.firstElementChild);
    toast.show();

    // Automatically hide the toast after 2 seconds
    setTimeout(() => {
        toast.hide();
    }, 2000);
}