
describe('Overdrive Website Tests', () => {

    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.visit('https://overdrive.cl/');
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught Exception:', err.message);
            return false;
        });
    });

    it('Should return an error message when the username is not registered', () => {
        let user = "user";
        cy.contains('Ingresar / Registrar').click();
        cy.get('#username').type(user);
        cy.get('#password').type('password');
        cy.get('.woocommerce-form-login__submit').click();
        cy.get('.woocommerce-error')
            .should('be.visible')
            .and('contain', `Error: El nombre de usuario ${user}`);
    })

    it('Should return an error message for an unknown user email', () => {
        cy.contains('Ingresar / Registrar').click();
        cy.get('#username').type('email@example.com');
        cy.get('#password').type('password');
        cy.get('.woocommerce-form-login__submit').click();
        cy.get('.woocommerce-error')
            .should('be.visible')
            .and('contain', 'Dirección de correo electrónico desconocida.');
    });

    it('Should return an error message when entering the incorrect password', () => {
        // Attempting login with correct username and incorrect password
        cy.contains('Ingresar / Registrar').click();
        cy.get('#username').type(Cypress.env('USERNAME'));
        cy.get('#password').type('password');
        cy.get('.woocommerce-form-login__submit').click();

        // Verifying the display of the error message for incorrect password
        cy.get('.woocommerce-error')
            .should('be.visible')
            .and('contain', `Error: la contraseña que has introducido para el nombre de usuario ${Cypress.env('USERNAME')} no es correcta.`);
    });


    it('Should log in successfully and display account information', () => {

        cy.contains('Ingresar / Registrar').click();
        cy.get('#username').type(Cypress.env('USERNAME'));
        cy.get('#password').type(Cypress.env('PASSWORD'));
        cy.get('.woocommerce-form-login__submit').click();
        cy.get('.woocommerce-MyAccount-content')
            .should('be.visible')
            .and('contain', `Hola ${Cypress.env('USERNAME')}`);

    });

    it('Should navigate to Guitars > PRS Guitars page and check content', () => {
        cy.get("#menu-1-c35ecb3 a").contains('Guitarras').click();
        cy.get(".elementor-sub-item").contains('PRS Guitars').click();
        cy.url().should('include', 'https://overdrive.cl/marca/prs-guitars/');
        cy.get('.elementor-widget-container h2').contains('PRS Guitars');
        cy.get('.woo-entry-inner').first().click();
        cy.get('h6.elementor-heading-title a[rel="tag"]').should('be.visible').and('contain', 'Guitarras Eléctricas');
        cy.get('.elementor-widget-heading h1.elementor-heading-title').should('be.visible').and('contain', 'PRS Guitars');
    });

})