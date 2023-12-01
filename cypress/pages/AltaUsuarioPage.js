class HomePage {
    elements = {
        body: () => cy.get('body'),
        btn_cadastar: () => cy.get('#register'),
        in_name: () => cy.get('#name'),
        in_email: () => cy.get('#email'),
        in_password: () => cy.get('#password'),
        alert_name: () => cy.get('form div:nth-child(1) p.error'),
        alert_email: () => cy.get('form div:nth-child(2) p.error'),
        alert_password: () => cy.get('form div:nth-child(3) p.error'),
        title_user: () => cy.get('h2.table-title'),
        last_user_row: () => cy.get('table tr').last(),
        btn_excluir_last_user: () => this.elements.last_user_row().find('a[id^="removeUser"]'),
    };

    initialRecordCount = 0;

    storeInitialRecordCount() {
        this.elements.body().then(($body) => {
            if ($body.find('table tr').length) {
              this.initialRecordCount = $body.find('table tr').length
            } 
          })
    }

    validate_altaPage() {
        this.elements.btn_cadastar().should('be.visible');
        this.elements.in_name().should('be.visible');
        this.elements.in_email().should('be.visible');
        this.elements.in_password().should('be.visible');
    }

    click_btnCadastar() {
        this.elements.btn_cadastar().click();
    }

    type_inName(name) {
        this.elements.in_name().type(name);
    }

    type_inEmail(email) {
        this.elements.in_email().type(email);
    }

    type_inPassword(password) {
        this.elements.in_password().type(password);
    }

    validate_alertName(msgName) {
        this.elements.alert_name().should('contain.text', msgName);;
    }

    validate_alertEmail(msgEmail) {
        this.elements.alert_email().should('contain.text', msgEmail);;
    }

    validate_alertPassword(msgPassword) {
        this.elements.alert_password().should('contain.text', msgPassword);;
    }

    validate_newRecordAdded(name, email, password) {
        this.elements.body().then(($body) => {
            if ($body.find('table tr').length) {
                console.log($body.find('table tr').length)
                expect($body.find('table tr').length).to.equal(this.initialRecordCount + 1)
                const lastRecord = $body.find('table tr').eq(-1);
                expect(lastRecord).to.contain.text(name);
                expect(lastRecord).to.contain.text(email);
            } 
          })
    }

    click_btnExcluir() {
        this.elements.body().then(($body) => {
            const $lastRow = $body.find('table tr').last();
            if ($lastRow.length) {
                cy.wrap($lastRow).find('a[id^="removeUser"]').click();
            }
          });
    }

    validate_userRemoved() {
        this.elements.body().then(($body) => {
            if ($body.find('table tr').length) {
                expect($body.find('table tr').length).to.equal(this.initialRecordCount - 1)
            } 
          })
    }
}
  
module.exports = new HomePage();


