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
    alert('passwords are not thesame');
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

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE'
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

document
  .querySelector('#newEmployee')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
