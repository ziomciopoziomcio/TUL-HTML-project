const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('Form validation', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form>
                <input id="email" type="text" />
                <input id="phone" type="text" />
                <input id="contact-email" type="text" />
            </form>
        `;
    });

    it('should prevent form submission when email is invalid', () => {
        const form = document.querySelector('form');
        const email = document.getElementById('email');

        email.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
        email.value = 'invalid email';
        form.dispatchEvent(new Event('submit'));

        expect(form.checkValidity()).toBe(false);
    });

    it('should prevent form submission when phone is invalid', () => {
        const form = document.querySelector('form');
        const phone = document.getElementById('phone');


        phone.setAttribute('pattern', '^\\+?[0-9]{9,11}$');
        phone.value = 'invalid phone';
        form.dispatchEvent(new Event('submit'));

        expect(form.checkValidity()).toBe(false);
    });

    it('should allow form submission when email and phone are valid', () => {
        const form = document.querySelector('form');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        email.value = 'test@example.com';
        phone.value = '+1234567890';
        form.dispatchEvent(new Event('submit'));

        expect(form.checkValidity()).toBe(true);
    });

    it('should prevent contact form submission when email is invalid', () => {
        const form = document.querySelector('form');
        const email = document.getElementById('contact-email');


        email.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
        email.value = 'invalid email';
        form.dispatchEvent(new Event('submit'));

        expect(form.checkValidity()).toBe(false);
    });

    it('should allow contact form submission when email is valid', () => {
        const form = document.querySelector('form');
        const email = document.getElementById('contact-email');

        email.value = 'test@example.com';
        form.dispatchEvent(new Event('submit'));

        expect(form.checkValidity()).toBe(true);
    });
});