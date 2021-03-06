import SignUpPage from "../PageObject/SignUpPage";
import LoginPage from "../PageObject/LoginPage";

describe("Login into the application for a new User ", function () {
  this.beforeEach(function () {
    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt",
      "refreshToken",
      "jwtAccessToken"
    );
    cy.viewport(1256, 770)

    cy.fixture("SignUpTestData/SignUpTestData").then(function (SignUpData) {
      this.SignUPData = SignUpData;
    });

    cy.fixture("ConnectionsDynamicTestData/ConnectionUserCredentials").then(
      function (LoginData) {
        this.Credentials = LoginData;
      }
    );
  });

  it.only("Login into the appLication for New User", function () {
    //PageObject
    const lp = new LoginPage();
    lp.BaseTest()
    
   
    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    lp.EnterEmail(this.Credentials.UserEmail);
    lp.EnterPassword(this.Credentials.Password);
    cy.screenshot("User logged In Details");
    cy.wait(3000);
    lp.Submit();
    cy.log("User has been Logged In into the application");

    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt",
      "refreshToken",
      "jwtAccessToken"
    );

    cy.wait(5000);
    //cy.title().should("eq", "Common Areas");
    cy.log("New Users has been logged in successfully");
    // cy.get(
    //   "#inspire > div.v-application--wrap > div:nth-child(1) > div.root-container.fill-height.fill-width > div.base-layout-main-content.box > div.row.content-wrapper.fill-width.fill-height > div.fill-height.body-right-wrapper.col-sm-12.col.col-xs-12.col-md-7.col-lg-8.col-xl-9 > div > div > div > div.px-4.col.col-12 > div > span"
    // ).should("have.text", this.SignUPData.CompanyName);
    cy.get(
      "#inspire > div.v-application--wrap > div:nth-child(1) > div.root-container.fill-height.fill-width > div.base-layout-main-content.box > div > div.fill-height.body-right-wrapper.col-sm-12.col.col-xs-12.col-md-7.col-lg-8.col-xl-9 > div > div > div > div.px-4.col.col-12 > div"
    ).then(function ($WelEle) {
      const WelcomeTxt = $WelEle.text();
      cy.log(WelcomeTxt);
    });
    cy.log("New Users has been logged in successfully");
    //cy.screenshot("New Users has been logged in successfully");
    cy.wait(5000);
  });

  it.only("Sign Out for logged in user", function () {
    //Click on admin
    cy.get('[name="your-profile"]').click({ force: true });
    cy.wait(2000);
    cy.contains("Sign Out").click({ force: true });
    cy.wait(5000);
    //Log out validation assertion
    cy.contains(" Log In ").should("be.visible");
    cy.url().should("include", "/Public/Login?");
    cy.log("User has been sign out");
  });
});
