import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import AltaUsuarioPage from "../../pages/AltaUsuarioPage";

let name = null;
let email = null;
let password = null;

Before(() => {
  cy.fixture('data.json').as('data');
});
Given("Ingreso a la página de creacion de usuario", function () {
  cy.visit(this.data.url);
  //AltaUsuarioPage.validate_altaPage();
  AltaUsuarioPage.storeInitialRecordCount()
});

When("Presiono el botón Cadastar", function () {
  AltaUsuarioPage.click_btnCadastar();
});

When("Completo el formulario con los valores indicados", function (dataTable) {
  dataTable.hashes().forEach(row => {
    console.log(row.campo)
    switch (row.campo) {
      case "nombre":
        name = row.valor;
        AltaUsuarioPage.type_inName(row.valor);
        break;
      case "email":
        email = row.valor;
        AltaUsuarioPage.type_inEmail(row.valor);
        break;
      case "password":
        password = row.valor;
        AltaUsuarioPage.type_inPassword(row.valor);
        break;
      default:
        throw new Error(`Campo no reconocido: ${row.campo}. Valores validos: nombre, email y password`);
    }
  });
});

Then("Para el campo indicado visualizo la alerta esperada", function (dataTable) {
  dataTable.hashes().forEach(row => {
    console.log(row.nombreCampo)
    switch (row.nombreCampo) {
      case "nombre":
        AltaUsuarioPage.validate_alertName(row.mensaje);
        break;
      case "email":
        AltaUsuarioPage.validate_alertEmail(row.mensaje);
        break;
      case "password":
        AltaUsuarioPage.validate_alertPassword(row.mensaje);
        break;
      default:
        throw new Error(`Campo no reconocido: ${row.nombreCampo}. Mensaje esperado: ${row.mensaje}`);
    }
  });
});

When("Completo todos los campos con valores validos: {string}, {string} y {string}", function (nombre, email, password) {
  AltaUsuarioPage.type_inName(nombre);
  AltaUsuarioPage.type_inEmail(email);
  AltaUsuarioPage.type_inPassword(password);
});


When("Elimino el primer registro", function(){
  AltaUsuarioPage.click_btnExcluir();
});

When("Genero correctamente dos nuevo usuario", function (dataTable) {
  dataTable.hashes().forEach(row => {
    AltaUsuarioPage.type_inName(row.nombre);
    AltaUsuarioPage.type_inEmail(row.email);
    AltaUsuarioPage.type_inPassword(row.password);
    AltaUsuarioPage.click_btnCadastar();
    AltaUsuarioPage.storeInitialRecordCount();
  });
});

Then("Genero correctamente el nuevo usuario", function () {
  AltaUsuarioPage.validate_newRecordAdded(name, email, password);
});

Then("Valido que se elimina correctamente", function(){
  AltaUsuarioPage.validate_userRemoved();
})