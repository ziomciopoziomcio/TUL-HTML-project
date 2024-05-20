describe('Form submission', () => {
    it('prevents default form submission', () => {
        // Mock form and event
        const form = document.createElement('form');
        const event = { preventDefault: jest.fn() };
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        form.dispatchEvent(new Event('submit'));

        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('validates email and phone number', () => {
        // Mock form, event, and inputs
        const form = document.createElement('form');
        const emailInput = document.createElement('input');
        const phoneInput = document.createElement('input');
        emailInput.id = 'email';
        phoneInput.id = 'phone';
        form.appendChild(emailInput);
        form.appendChild(phoneInput);
        document.body.appendChild(form);

        const event = { preventDefault: jest.fn() };
        form.addEventListener('submit', function (event) {
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

        // Test with valid email and phone number
        emailInput.value = 'test@example.com';
        phoneInput.value = '+1234567890';
        form.dispatchEvent(new Event('submit'));
        expect(event.preventDefault).toHaveBeenCalled();

        // Test with invalid email
        emailInput.value = 'invalid';
        phoneInput.value = '+1234567890';
        expect(() => form.dispatchEvent(new Event('submit'))).toThrow('Proszę wprowadzić poprawny adres e-mail.');

        // Test with invalid phone number
        emailInput.value = 'test@example.com';
        phoneInput.value = 'invalid';
        expect(() => form.dispatchEvent(new Event('submit'))).toThrow('Proszę wprowadzić poprawny numer telefonu.');
    });
    it('invalidates incorrect email', () => {
        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        document.body.appendChild(emailInput);
        emailInput.value = 'invalid_email';
        expect(validateEmail(emailInput.value)).toBe(false);
    });

    it('invalidates empty email', () => {
        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        document.body.appendChild(emailInput);
        emailInput.value = '';
        expect(validateEmail(emailInput.value)).toBe(false);
    });

    it('invalidates email without domain', () => {
        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        document.body.appendChild(emailInput);
        emailInput.value = 'test@';
        expect(validateEmail(emailInput.value)).toBe(false);
    });

    it('invalidates email without @ symbol', () => {
        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        document.body.appendChild(emailInput);
        emailInput.value = 'test.example.com';
        expect(validateEmail(emailInput.value)).toBe(false);
    });
});

describe('Navbar button click', () => {
    it('toggles navbar visibility', () => {
        // Mock button and navbar
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

        // Test with initially hidden navbar
        navbar.style.display = 'none';
        button.dispatchEvent(new Event('click'));
        expect(navbar.style.display).toBe('block');

        // Test with initially visible navbar
        navbar.style.display = 'block';
        button.dispatchEvent(new Event('click'));
        expect(navbar.style.display).toBe('none');
    });
});