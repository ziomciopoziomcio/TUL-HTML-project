document.getElementById('navbar-button').addEventListener('click', function() {
    var navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer.style.display === 'none') {
        navbarContainer.style.display = 'block';
    } else {
        navbarContainer.style.display = 'none';
    }
});