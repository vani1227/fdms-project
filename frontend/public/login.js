document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent default form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.facultyId) {
        localStorage.setItem('facultyId', data.facultyId); // Store faculty ID
        window.location.href = 'faculty_dashboard.html';   // Redirect to dashboard
      } else {
        alert('Login failed: ' + data.error);
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Something went wrong.');
    });
  });
  