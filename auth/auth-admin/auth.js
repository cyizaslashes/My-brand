const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

/***Authentication */


const isAuthenticated = localStorage.getItem('authenticated');

// Function to handle login
function handleLogin(username, password) {
  if (username === 'user' && password === 'password') {
    // Set authentication status to true
    localStorage.setItem('authenticated', 'true');
    // Redirect to the dashboard
    window.location.href = 'Dashboard.html';
  } else {
    alert('Authentication failed. Check your credentials.');
  }
}

// Function to handle registration
function handleRegistration(username, email, password) {
  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);

  alert('Registration was successful');
  
  window.location.href = 'dashboard.html';
}

// Event listener for the login form
document.querySelector('.sign-in-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = this.querySelector('input[type="text"]').value;
  const password = this.querySelector('input[type="password"]').value;
  handleLogin(username, password);
});

// Event listener for the registration form
document.querySelector('.sign-up-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;
  handleRegistration(username, email, password);
});

// Redirect to dashboard if already authenticated
if (isAuthenticated === 'true') {
  window.location.href = 'auth.html';
}
