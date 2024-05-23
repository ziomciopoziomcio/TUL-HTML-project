document.addEventListener('DOMContentLoaded', function () {


    document.querySelector('.navbar-toggler').addEventListener('click', function () {
        var navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer.style.display === 'none') {
            navbarContainer.style.display = 'block';
        } else {
            navbarContainer.style.display = 'none';
        }
    });

    document.getElementById('close-menu').addEventListener('click', function () {
        document.getElementById('navbarNav').classList.remove('show');
    });
});