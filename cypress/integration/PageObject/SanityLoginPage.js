class SanityLoginPage {

  TmProd() {
    cy.visit("https://tm.commonareas.io/Public/Login?ReturnUrl=%2F");
  }

  nvdTest() {
    cy.visit("https://nvd.ca-test.com/Public/Login?ReturnUrl=%2F");
  }


  visitServiceBuild() {
    cy.visit("https://serviceproviders.ca-build.com/");
  }

  visitKitBuilderServiceBuild() {
    cy.visit("https://serviceproviders.ca-build.com/ClientAdmin/KitBuilder#/");
  }

  visitServiceTest() {
    cy.visit("https://serviceproviders.ca-test.com/");
  }

  visitKitBuilderServiceTest() {
    cy.visit("https://serviceproviders.ca-test.com/ClientAdmin/KitBuilder#/");
  }

  propmanagementcoreTest() {
    cy.visit("https://propmanagementcore.ca-test.com/Public/Login?ReturnUrl=%2F");
  }

  visitCityComBuild() {
    cy.visit("https://citycommercial.ca-build.com/#/");
  }

  visitCityComTestKitBuilder() {
    cy.visit("https://citycommercial.ca-test.com/ClientAdmin/KitBuilder#/");
  }

  visitCityComKBuildKitBuilder() {
    cy.visit("https://citycommercial.ca-build.com/ClientAdmin/KitBuilder#/");
  }

  CityComTestAddUser() {
    cy.visit("https://citycommercial.ca-test.com/ClientAdmin/AddUser");
  }

  CityComBuildAddUser() {
    cy.visit("https://citycommercial.ca-build.com/ClientAdmin/AddUser");
  }
}

export default SanityLoginPage;
