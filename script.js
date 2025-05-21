document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const ra = document.getElementById('ra').value;

    console.log('Nome:', username);
    console.log('RA:', ra);

    window.location.href = 'portfolio/portfolio.html';
});