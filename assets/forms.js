document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var surname = document.getElementById('surname').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;


        var nameSurnamePattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/;
        if (!nameSurnamePattern.test(name)) {
            alert('Proszę wprowadzić poprawne imię.');
            return;
        }

        if (!nameSurnamePattern.test(surname)) {
            alert('Proszę wprowadzić poprawne nazwisko.');
            return;
        }

        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            alert('Proszę wprowadzić poprawny adres e-mail.');
            return;
        }

        var phonePattern = /^(\+)?[0-9]{9,11}$/;
        if (!phonePattern.test(phone)) {
            alert('Proszę wprowadzić poprawny numer telefonu.');
            return;
        }

        var inputs = document.querySelectorAll('input, select');
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].value) {
                alert('Proszę wypełnić wszystkie pola.');
                return;
            }
        }
        alert('Dane zostały poprawnie przesłane.');
    });

    // contact.js
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('contact-name').value;
        var email = document.getElementById('contact-email').value;
        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        var namePattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/;
        if (!namePattern.test(name)) {
            alert('Proszę wprowadzić poprawne imię.');
            return;
        }

        if (!emailPattern.test(email)) {
            alert('Proszę wprowadzić poprawny adres e-mail.');
            return;
        }
        alert('Wiadomość została przesłana.');
    });
});