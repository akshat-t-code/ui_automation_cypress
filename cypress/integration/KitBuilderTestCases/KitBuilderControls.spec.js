import LoginPage from "../PageObject/LoginPage";
import KitBuilderPage from "../PageObject/KitBuilderPage";
import KitBuilderDataTypes from "../PageObject/KitBuilderDataTypes";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("Input Section Data Elements Configuration", function () {
  this.beforeAll(function () {
    
    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt",
      "refreshToken",
      "jwtAccessToken"
    );
  });

  this.beforeEach("Fixtures file data", function () {
    Cypress.Cookies.preserveOnce(
      ".AspNet.ApplicationCookie",
      "ASP.NET_SessionId",
      "ca-cf-auth",
      "kit-detail-selected-tab",
      "jwt",
      "refreshToken",
      "jwtAccessToken"
    );

    //Globally fixtures for login creads
    cy.fixture("LoginTestData/GlobalLoginCreds").then(function (
      LogInScriptGloably
    ) {
      this.LoginCreds = LogInScriptGloably;
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.data = KitTypeFormViewsNames;
    });
    cy.fixture("KitBuilderTestData/NewKitTypeData").then(function (
      KittypeName
    ) {
      this.KitTypeName = KittypeName;
    });

    cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
      NewDataForElements
    ) {
      this.DataType2 = NewDataForElements;
    });
  });

  it('Login TestCase',function(){
    const lp = new LoginPage();
    const slp = new SanityLoginPage();
    slp.LoginUrl(this.LoginCreds.CAUrl)
    //Handling Alert
    cy.on("window:confirm", () => {
      cy.log("Alert has been Handled");
    });
    //Login Assertions
    cy.contains(" Log In ").should("be.visible");
    //Enter credentials
    lp.EnterEmail(this.LoginCreds.username);
    lp.EnterPassword(this.LoginCreds.Password);
    lp.Submit();
    cy.log("User has been Logged In into the application");
    cy.wait(5000)
  })

  it("Navigating to New Form of Created Kit Type", function () {
    const kb = new KitBuilderPage();
    const lp = new LoginPage();
    cy.wait(5000);
    cy.title().should("eq", "Common Areas");
    lp.KitBuilder()
    cy.log("User entered in kit builder");
    cy.wait(3000);
    //Open Craeted Kit Type
    kb.KBSearchBox(this.KitTypeName.KitName3);
    cy.wait(2000);
    cy.contains(this.KitTypeName.KitName3).click({ force: true });
    cy.log("Created Kit type has been opened");
    cy.contains("Form Views").click({ force: true });
    cy.contains(this.data.NewView).click({ force: true });
    cy.wait(1000);
  });

  it("Input Section Data Elements", function () {
    cy.contains("Inputs").click({ force: true });
  });

  it("Url Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Url"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Url(this.DataType2.Url);
    cy.wait(2000);
  });

  it("Text Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Text"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();

    DataType.Text(this.DataType2.Text);
    cy.wait(2000);
  });

  it("File Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="File"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.File(this.DataType2.File);
    cy.wait(2000);
  });

  it("Telephone Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Telephone"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Telephone(this.DataType2.Telephone);
    cy.wait(2000);
  });

  it("TextAera Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Text Area"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.TextAera(this.DataType2.TextAera);
    cy.wait(2000);
  });

  it("Slider Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Slider"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Slider(this.DataType2.Slider);
    cy.wait(2000);
  });

  it("Currency Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Currency"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Currency(this.DataType2.Currency);
    cy.wait(2000);
  });

  it("Measure Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Measure"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Measure(this.DataType2.Measure);
    cy.wait(2000);
  });

  it("Email Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Email"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Email(this.DataType2.Email);
    cy.wait(2000);
  });

  it("Address Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Address"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Address(this.DataType2.Address);
    cy.wait(2000);
  });

  it("Section Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Section"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Section(this.DataType2.Section);
    cy.wait(2000);
  });

  it("Number Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Number"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Number(this.DataType2.Number);
    cy.wait(2000);
  });

  it("Kit Builder Save and Publish", function () {
    //Kit Builder Save
    cy.get(".mr-2:nth-child(2) > .v-btn__content").click({ force: true });
    //save assertion closed
    cy.get(".v-btn__content > .theme--dark").click({ force: true });
    cy.log("Kit builder(New Form) has been Saved");
    cy.wait(3000);
    //Click on  Publish
    cy.contains("Publish").click({ force: true });
    //cy.get(".v-btn__content > .theme--dark").click();
    cy.log("Kit builder(New Form) has been Published");
    cy.wait(2000);
  });

  it("Time Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Time"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Time(this.DataType2.Time);
    cy.wait(2000);
  });

  it("Date Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Add Date"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Date(this.DataType2.Date);
    cy.wait(2000);
  });

  it("Reminder Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Reminder"]').dblclick({ force: true });
    cy.wait(1000);
    const DataType = new KitBuilderDataTypes();
    DataType.Reminder(this.DataType2.ReminderName);
  });

  it("Kit Builder Save and Publish", function () {
    //Kit Builder Save
    cy.get(".mr-2:nth-child(2) > .v-btn__content").click({ force: true });
    //save assertion closed
    cy.get(".v-btn__content > .theme--dark").click({ force: true });
    cy.log("Kit builder(New Form) has been Saved");
    cy.wait(3000);
    //Click on  Publish
    cy.contains("Publish").click({ force: true });
    //cy.get(".v-btn__content > .theme--dark").click();
    cy.log("Kit builder(New Form) has been Published");
    cy.wait(2000);
  });

  it("Toggle Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Toggle"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Toggle(this.DataType2.Toggle);
    cy.wait(2000);
  });

  it("SelectList Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Select List"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();

    DataType.SelectList(
      this.DataType2.SelectList,
      this.DataType2.SelectListName,
      this.DataType2.SelectListValue1,
      this.DataType2.SelectListValue2,
      this.DataType2.SelectListValue3,
      this.DataType2.SelectListValue4,
      this.DataType2.SelectListValue5
    );
    cy.wait(2000);
  });

  it("RadioSelect Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Radio Select"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();

    DataType.RadioSelect(
      this.DataType2.RadioSelect,
      this.DataType2.RadioSelectName,
      this.DataType2.RadioSelectValue1,
      this.DataType2.RadioSelectValue2,
      this.DataType2.RadioSelectValue3,
      this.DataType2.RadioSelectValue4,
      this.DataType2.RadioSelectValue5
    );
    cy.wait(2000);
  });

  it("CheckboxSelect Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Checkbox Select"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.CheckboxSelect(
      this.DataType2.CheckboxSelect,
      this.DataType2.CheckboxSelectName,
      this.DataType2.CheckboxSelectValue1,
      this.DataType2.CheckboxSelectValue2,
      this.DataType2.CheckboxSelectValue3,
      this.DataType2.CheckboxSelectValue4,
      this.DataType2.CheckboxSelectValue5
    );
    cy.wait(2000);
  });

  it("Kit Builder Save and Publish", function () {
    //Kit Builder Save
    cy.get(".mr-2:nth-child(2) > .v-btn__content").click({ force: true });
    //save assertion closed
    cy.get(".v-btn__content > .theme--dark").click({ force: true });
    cy.log("Kit builder(New Form) has been Saved");
    cy.wait(3000);
    //Click on  Publish
    cy.contains("Publish").click({ force: true });
    //cy.get(".v-btn__content > .theme--dark").click();
    cy.log("Kit builder(New Form) has been Published");
    cy.wait(2000);
  });

  it("Content Section Data Elements", function () {
    cy.contains("Content").click({ force: true });
  });

  it("Stepper Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Stepper"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Stepper(
      this.DataType2.Stepper,
      this.DataType2.StepperName,
      this.DataType2.StepperValue1,
      this.DataType2.StepperValue2,
      this.DataType2.StepperValue3,
      this.DataType2.StepperValue4,
      this.DataType2.StepperValue5
    );
    cy.wait(2000);
  });

  it("UserSelector Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="User Selector"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.UserSelector(this.DataType2.UserSelector);
    cy.wait(2000);
  });

  

  it("ContactSelector Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Contact Selector"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.ContactSelector(this.DataType2.ContactSelector);
    cy.wait(2000);
  });

  

  it("Icon Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Icon"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Icon(this.DataType2.Icon);
    cy.wait(2000);
  });

  it("Inspection Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Inspection"]').dblclick({ force: true });
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Inspection(
      this.DataType2.Inspection,
      this.DataType2.InspectionName,
      this.DataType2.InspectionValue1,
      this.DataType2.InspectionValue2,
      this.DataType2.InspectionValue3,
      this.DataType2.InspectionValue4,
      this.DataType2.InspectionValue5
    );
    cy.wait(2000);
  });

  it("Assigning Data Type", function () {
    //Double click on Data Element to drag it on Canvas
    cy.get('[title="Assigning"]').dblclick({ force: true });
    cy.log(this.DataType2.Assigning);
    cy.wait(1000);
    //Page Object
    const DataType = new KitBuilderDataTypes();
    DataType.Assigning(this.DataType2.Assigning);
    cy.wait(2000);
  });

  it("Kit Builder Save and Publish", function () {
    //Kit Builder Save
    cy.get(".mr-2:nth-child(2) > .v-btn__content").click({ force: true });
    //save assertion closed
    cy.get(".v-btn__content > .theme--dark").click({ force: true });
    cy.log("Kit builder(New Form) has been Saved");
    cy.wait(3000);
    //Click on  Publish
    cy.contains("Publish").click({ force: true });
    //cy.get(".v-btn__content > .theme--dark").click();
    cy.log("Kit builder(New Form) has been Published");
    cy.wait(2000);
  });






});
