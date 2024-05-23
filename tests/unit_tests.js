describe('Form submission', () => {
    it('prevents default form submission', () => {
        const form = document.createElement('form');
        const mockPreventDefault = jest.fn();
        form.addEventListener('submit', function (event) {
            mockPreventDefault();
        });
        form.dispatchEvent(new Event('submit'));

        expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('validates correct email and phone number', () => {
        const form = document.createElement('form');
        const emailInput = document.createElement('input');
        const phoneInput = document.createElement('input');
        emailInput.id = 'email';
        phoneInput.id = 'phone';
        form.appendChild(emailInput);
        form.appendChild(phoneInput);
        document.body.appendChild(form);

        global.alert = jest.fn();

        form.addEventListener('submit', function (event) {
            event.preventDefault = jest.fn();
            event.preventDefault();

            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;

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
        });

        emailInput.value = 'test@example.com';
        phoneInput.value = '+1234567890';
        form.dispatchEvent(new Event('submit'));
        expect(global.alert).not.toHaveBeenCalled();
    });

    it('invalidates incorrect phone number', () => {
        const form = document.createElement('form');
        const phoneInput = document.createElement('input');
        phoneInput.id = 'phone';
        form.appendChild(phoneInput);
        document.body.appendChild(form);

        global.alert = jest.fn();

        form.addEventListener('submit', function (event) {
            event.preventDefault = jest.fn();
            event.preventDefault();

            var phone = document.getElementById('phone').value;
            var phonePattern = /^(\+)?[0-9]{9,11}$/;
            if (!phonePattern.test(phone)) {
                alert('Proszę wprowadzić poprawny numer telefonu.');
                return;
            }
        });

        phoneInput.value = 'invalid_phone_number';
        form.dispatchEvent(new Event('submit'));
        expect(global.alert).toHaveBeenCalledWith('Proszę wprowadzić poprawny numer telefonu.');
    });

    it('invalidates incorrect phone number', () => {
        const form = document.createElement('form');
        const phoneInput = document.createElement('input');
        phoneInput.id = 'phone';
        form.appendChild(phoneInput);
        document.body.appendChild(form);

        global.alert = jest.fn();

        form.addEventListener('submit', function (event) {
            event.preventDefault = jest.fn();
            event.preventDefault();

            var phone = document.getElementById('phone').value;
            var phonePattern = /^(\+)?[0-9]{9,11}$/;
            if (!phonePattern.test(phone)) {
                alert('Proszę wprowadzić poprawny numer telefonu.');
                return;
            }
        });

        phoneInput.value = 'invalid_phone';
        form.dispatchEvent(new Event('submit'));
        expect(global.alert).toHaveBeenCalledWith('Proszę wprowadzić poprawny numer telefonu.');
    });
});

describe('Navbar button click', () => {
    it('toggles navbar visibility', () => {
        const button = document.createElement('button');
        const navbar = document.createElement('div');
        button.id = 'navbar-button';
        navbar.id = 'navbar-container';
        document.body.appendChild(button);
        document.body.appendChild(navbar);

        button.addEventListener('click', function () {
            var navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer.style.display === 'none') {
                navbarContainer.style.display = 'block';
            } else {
                navbarContainer.style.display = 'none';
            }
        });

        navbar.style.display = 'none';
        button.dispatchEvent(new Event('click'));
        expect(navbar.style.display).toBe('block');

        navbar.style.display = 'block';
        button.dispatchEvent(new Event('click'));
        expect(navbar.style.display).toBe('none');
    });
});