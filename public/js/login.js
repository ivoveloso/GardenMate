const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#sign-in-form-username').value.trim();
  const password = document.querySelector('#sign-in-form-password').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert('Incorrect username or password!');
    }
  }
};

document
  .querySelector('.form-sign-in')
  .addEventListener('submit', loginFormHandler);

