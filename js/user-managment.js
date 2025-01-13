document.addEventListener("DOMContentLoaded", function () {
    const userTableBody = document.getElementById("userTableBody");
    const modalName = document.getElementById("modalName");
    const modalEmail = document.getElementById("modalEmail");
    const modalType = document.getElementById("modalType");
    const saveChangesButton = document.getElementById("saveChangesButton");
    const toastNotification = document.getElementById("toastNotification");

    let selectedUserEmail = "";

    // Load users from localStorage
    function loadUsers() {
      userTableBody.innerHTML = ""; // Clear existing rows
      let userCount = 0;

      for (let key in localStorage) {
        if (key.startsWith("user_")) {
          const user = JSON.parse(localStorage.getItem(key));
          userCount++;

          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${userCount}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.type}</td>
            <td>
              <button class="btn btn-sm btn-primary btn-modify" onclick="openModifyModal('${user.email}')">Modify</button>
              <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.email}')">Delete</button>
            </td>
          `;
          userTableBody.appendChild(row);
        }
      }

      if (userCount === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `
          <td colspan="5" class="text-center">No users found</td>
        `;
        userTableBody.appendChild(noDataRow);
      }
    }

    // Open Modify Modal
    window.openModifyModal = function(email) {
      const user = JSON.parse(localStorage.getItem("user_" + email));
      if (user) {
        selectedUserEmail = email;
        modalName.value = user.name;
        modalEmail.value = user.email;
        modalType.value = user.type;
        const modifyUserModal = new bootstrap.Modal(document.getElementById("modifyUserModal"));
        modifyUserModal.show();
      }
    };

    // Save changes in Modify Modal
    saveChangesButton.addEventListener("click", function() {
      const user = JSON.parse(localStorage.getItem("user_" + selectedUserEmail));
      if (user) {
        user.type = modalType.value; // Update user type
        localStorage.setItem("user_" + selectedUserEmail, JSON.stringify(user));
        loadUsers(); // Refresh the table

        // Show green toast notification
        const toast = new bootstrap.Toast(toastNotification);
        toast.show();

        // Hide modal after saving
        const modifyUserModal = bootstrap.Modal.getInstance(document.getElementById("modifyUserModal"));
        modifyUserModal.hide();
      }
    });

    // Delete a user
    window.deleteUser = function(email) {
      if (confirm(`Are you sure you want to delete the user with email: ${email}?`)) {
        localStorage.removeItem("user_" + email);
        loadUsers(); // Refresh the table
      }
    };

    // Load users on page load
    loadUsers();
  });