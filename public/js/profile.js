const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const mobile = document.querySelector('#mobile').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document
    .querySelector('#confirm_password')
    .value.trim();
  const admin = document.querySelector('#isAdmin');
  const isAdmin = admin.checked;

  if (password !== confirmPassword) {
    alert('passwords do not match');
    return;
  }

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ name, mobile, email, password, isAdmin }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    location.reload();
    alert('employee successfully created');
  } else {
    alert('Failed to add new employee');
  }
};

const newActivityHandler = async (event) => {
  event.preventDefault();

  const type = document.querySelector('#type').value.trim();
  const description = document.querySelector('#description').value.trim();
  const dateBooking = document.querySelector('#date-booking').value.trim();
  const timeAllocation = document.querySelector('#time-allocation').value.trim();
  const employeeID = document.querySelector('#employee_id').value.trim();
  const clientID = document.querySelector('#client_id').value.trim();

  alert(employeeID);

  const response = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify({ type, description, dateBooking, timeAllocation, employeeID, clientID }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    location.reload();
    alert('Activity successfully created');
  } else {
    alert('Failed to add new Activity');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/users/user/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const selButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/profile/${id}`, {
      method: 'GET'
    });

    if (response.ok) {
      document.location.replace(`/profile/${id}`);
    } else {
      alert('Failed to select project');
    }
  }
};

document
  .querySelector('#newEmployee')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-menu')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.select-menu')
  .addEventListener('click', selButtonHandler);

document
  .querySelector('#newActivity')
  .addEventListener('addtask', newActivityHandler);