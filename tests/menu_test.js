const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

const menu = require('../assets/menu.js');

describe('Menu functionality', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button class="navbar-toggler"></button>
            <div id="navbar-container" style="display: none;"></div>
            <button id="close-menu"></button>
            <div id="navbarNav" class="show"></div>
        `;
    });

    it('should show the navbar when the navbar-toggler is clicked and the navbar is hidden', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarContainer = document.getElementById('navbar-container');

        navbarToggler.click();

        setTimeout(() => {
            expect(navbarContainer.style.display).toBe('block');
        }, 1000);
    });

    it('should hide the navbar when the navbar-toggler is clicked and the navbar is visible', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarContainer = document.getElementById('navbar-container');

        navbarContainer.style.display = 'block';
        navbarToggler.click();

        setTimeout(() => {
            expect(navbarContainer.style.display).toBe('none');
        }, 1000);
    });

    it('should hide the navbar when the close-menu button is clicked', () => {
        const closeMenuButton = document.getElementById('close-menu');
        const navbarNav = document.getElementById('navbarNav');

        closeMenuButton.click();

        setTimeout(() => {
            expect(navbarNav.classList.contains('show')).toBe(false);
        }, 1000);
    });
});