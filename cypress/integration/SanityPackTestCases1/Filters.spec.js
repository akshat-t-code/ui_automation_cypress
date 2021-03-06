import LoginPage from "../PageObject/LoginPage";
import KitTypePage from "../PageObject/KitTypePage";
import SanityLoginPage from "../PageObject/SanityLoginPage";

describe("TableList KitItem Filter", function () {
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

  this.beforeEach("KitType Data", function () {
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
    ////////////////////////////////////////////////////////////////////////////////////////////

    cy.fixture("SanityPackTestData2/RecurringKitItemData").then(function (
      SanityTCData
    ) {
      this.NewKitItemData = SanityTCData;
    });


    // cy.fixture("SanityPackTestData2(Prod)/RecurringKitItemData(Prod)").then(
    //   function (SanityTCData) {
    //     this.NewKitItemData = SanityTCData;
    //   }
    // );

    cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
      NewDataForElements
    ) {
      this.DataType2 = NewDataForElements;
    });

    // cy.fixture("SanityPackTestData(Prod)/KitBuilderDataTypes2(Prod)").then(
    //   function (NewDataForElements) {
    //     this.DataType2 = NewDataForElements;
    //   }
    // );

    //////////////////////////////////////////////////////////////////////////////////

    cy.fixture("KitBuilderTestData/FormViewsNameData").then(function (
      KitTypeFormViewsNames
    ) {
      this.ViewName = KitTypeFormViewsNames;
    });
  });

  it.only('Login TestCase',function(){
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

  it.only("Open Created Kit type As ListView KitItem", function () {
    //Page Object
    const lp = new LoginPage();
    //Assertion
    cy.title().should("eq", "Common Areas");
    cy.wait(10000);
    //Click on Hamburger Icon
    lp.HMBIcon();
    cy.contains(this.NewKitItemData.KitName).scrollIntoView({
      force: true,
    });
    cy.wait(5000);
    //Open KitType from left paneal
    cy.contains(this.NewKitItemData.KitName).click({ force: true });
    cy.log("Kit type opened from left pannel");
    cy.wait(5000);
  });

  it.only("Filter Url Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Url + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(2000);
    cy.get("[name" + "=" + this.DataType2.Url + "]")
      .last()
      .type(this.NewKitItemData.Url);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(5000)

    // cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]//div[@class="v-list-item__subtitle truncate list-item--title"]')
    //   .then(KitItem => {
    //     const KitItemCount = Cypress.$(KitItem).length;
    //     expect(KitItem).to.have.length(KitItemCount);
    //     cy.log(expect(KitItem).to.have.length(KitItemCount));
    //   })

    //cy.wait(30000)

    //Assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
      .first().click({ force: true });
    cy.wait(1000);
    var lower = this.DataType2.Url.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Url)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filter
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
  });

  it.only("Filter Text Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .type(this.NewKitItemData.Text);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");

    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .scrollIntoView({ force: true });

    var lower = this.DataType2.Text.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Text)
    cy.wait(1000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Filter Telephone Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .last()
      .type(this.NewKitItemData.Telephone);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");

    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    cy.get("[name" + "=" + this.DataType2.Telephone + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(1000);
    var lower = this.DataType2.Telephone.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Telephone)
    cy.wait(1000);

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Filter TextAera Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .type(this.NewKitItemData.TextAera);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(1000);

    var lower = this.DataType2.TextAera.toLowerCase();
    //Validating details view input data
    cy.get('[name="TextAera"]').last()
      .should("have.value", this.NewKitItemData.TextAera)
    cy.wait(3000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
  });

  it("Validate the Filter for Slider Element", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    cy.get('.v-text-field__slot [type="number"]').eq(1).clear();
    cy.wait(2000);

    cy.get('.v-text-field__slot [type="number"]')
      .eq(1)
      .type(this.NewKitItemData.SliderrValue);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(5000);

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.wait(3000);

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });

  it.only("Validate the Filter for Currency Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    //Clear Currency default value
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(1).clear();
    cy.wait(2000);

    //enter Currency value to filter
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(1).type(this.NewKitItemData.Currency);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    lp.FilterIcon();
    cy.wait(2000)
    //Clear Currency default value AGAIN
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(1).clear();
    cy.wait(2000);
    //enter Currency value to filter AGAIN
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(1).type(this.NewKitItemData.Currency);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(5000);

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(2000);

    var currency = this.DataType2.Currency.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.NewKitItemData.Currency)
    cy.wait(2000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(2000);
  });

  it.only("Validate the Filter for Measure Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    //Clear measure default value
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(2).clear();
    cy.wait(2000);

    //enter measure value to filter
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(2).type(this.NewKitItemData.Measure);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(1000);
    lp.FilterIcon();
    cy.wait(2000)
    //Clear measure default value AGAIN
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(2).clear();
    cy.wait(2000);
    //enter measure value to filter AGAIN
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(2).type(this.NewKitItemData.Measure);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);

    cy.get("[name" + "=" + this.DataType2.TextAera + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    //Validate Value
    var measure = this.DataType2.Measure.toLowerCase();
    //Assertion Validation for currency
    cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
      .next('input').should("have.value", this.NewKitItemData.Measure)
    cy.wait(2000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(2000);
  });

  it.only("Validate the Filter Email Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .last()
      .type(this.NewKitItemData.Email);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    //scroll
    cy.get("[name" + "=" + this.DataType2.Email + "]")
      .last()
      .scrollIntoView({ force: true });
    //Data existance assertion
    var lower = this.DataType2.Email.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Email)
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter Address Element", function () {
    //Page Object
    const lp = new LoginPage();
    //Filter Address by Addressline1
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .type(this.NewKitItemData.Addressline1);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);

    //Validating details view input data
    cy.get('[placeholder="Street address, building, company ... "]')
      .should("have.value", this.NewKitItemData.Addressline1)
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for Addressline2 Element", function () {
    //Page Object
    const lp = new LoginPage();
    //Filter Address by Addressline2
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .type(this.NewKitItemData.Addressline2);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);

    //Validating details view input data
    cy.get('[name="Address line 2."]')
      .should("have.value", this.NewKitItemData.Addressline2)
    cy.wait(1000)
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for City Element", function () {
    //Page Object
    const lp = new LoginPage();
    //Filter Address by City
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .type(this.NewKitItemData.City);

    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(1000);

    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);

    //Validating details view input data
    cy.get('[placeholder="City"]')
      .should("have.value", this.NewKitItemData.City)
    cy.wait(1000);

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for State Element", function () {
    //Page Object
    const lp = new LoginPage();
    //Filter Address by State
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .type(this.NewKitItemData.State);
    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(1000);
    //scroll
    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);
    //Data Assertion in details view
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true })
    //Validating details view input data
    cy.get('[placeholder="Zip/Postal Code"]')
      .should("have.value", this.NewKitItemData.ZipCode);
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for ZipCode Element", function () {
    //Page Object
    const lp = new LoginPage();
    //Filter Address by ZipCode
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .type(this.NewKitItemData.ZipCode);

    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(1000);

    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);

    cy.xpath('//div[@class="v-select__slot"]//div[@class="v-select__selections"]//div[@class="v-select__selection v-select__selection--comma"]')
      .eq(0)
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.State)
      })
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    cy.wait(5000);

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });

  it.only("Validate the Filter for Country Element", function () {
    //Page Object
    const lp = new LoginPage();
    //Filter Address by Country
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.get("[name" + "=" + this.DataType2.Address + "]")
      .last()
      .type(this.NewKitItemData.Country);

    cy.wait(1000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(1000);

    cy.get(
      '[placeholder="Street address, building, company ... "]'
    ).scrollIntoView({ force: true });
    cy.wait(1000);

    //Validating details view input data
    cy.get('[placeholder="Country"]')
      .should("have.value", this.NewKitItemData.Country)
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for Number Element", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get("[name" + "=" + this.DataType2.Text + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    //Clear Number default value
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(3).clear();
    cy.wait(2000);

    //enter Number value to filter
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(3).type(this.NewKitItemData.Number);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    lp.FilterIcon();
    cy.wait(2000)
    //Clear Number default value AGAIN
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(3).clear();
    cy.wait(2000);
    //enter Number value to filter AGAIN
    cy.xpath('//div[@class="v-input__append-outer"]//div[@class="v-text-field__slot"]//input')
      .eq(3).type(this.NewKitItemData.Number);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);

    cy.get("[name" + "=" + this.DataType2.Number + "]")
      .last()
      .scrollIntoView({ force: true });
    cy.wait(3000);

    var lower = this.DataType2.Number.toLowerCase();
    //Validating details view input data
    cy.xpath("//input[@controlname='" + lower + "']")
      .should("have.value", this.NewKitItemData.Number)
    cy.wait(2000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(2000);
  });

  it.only("Validate the Filter Time Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Time"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(2000);
    cy.get('[placeholder="Add Time"][type="text"]').click({ force: true });
    cy.wait(1000);

    //Select hour value
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//span[5]"
    ).click({ force: true });
    cy.wait(1000);
    //Select Value of miniutes
    cy.xpath("//span[contains(text(),'30')]").first().click({ force: true });
    cy.wait(1000);
    //Click on PM
    cy.xpath("//div[contains(text(),'PM')]").click({ force: true });
    //Click on OK to save date
    cy.xpath(
      "//div[contains(@class,'v-dialog v-dialog--active')]//button[1]"
    ).click({ force: true });
    cy.wait(2000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(2000);

    //json value assertion
    cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(0)
      .should("have.value", this.NewKitItemData.LoggedTime)
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter Date Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Date"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(2000);
    cy.get('[placeholder="Add Date"][type="text"]').click({ force: true });
    //Select Date
    cy.xpath("//div[@class='v-btn__content'][contains(text(),'25')]")
      .first()
      .click({ force: true });
    cy.wait(2000);
    //Click on OK to save Date
    cy.xpath("//span[contains(text(),'OK')]").first().click({ force: true });
    cy.wait(2000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //created kit item assertion
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).should('be.visible')

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });

    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(2000);

    //json value assertion
    cy.get('[placeholder=" MM / DD / YYYY"]')
      .should("have.value", this.NewKitItemData.LoggedDate)
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter Toggle(True) Element", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Date"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on toggle dropdown
    cy.get(
      " div.v-input.kit-control-select-list.layout-alignment.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    ).click({ force: true });
    cy.wait(2000);
    //Toggle filter for true
    cy.contains(" true ").click({ force: true });
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);

    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(2000);

    //Validation for True Value 
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .should('have.attr', 'aria-checked', 'true')
    cy.wait(2000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    cy.wait(5000);

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });

  it.only("Validate the Filter Toggle(False) Element", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Date"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on toggle dropdown
    cy.get(
      " div.v-input.kit-control-select-list.layout-alignment.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    ).click({ force: true });
    cy.wait(2000);
    //Toggle for false
    cy.get(".v-list-item:nth-child(3) .v-list-item__subtitle").click({
      force: true,
    });
    cy.wait(2000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.xpath('//div[@class="row-list-item-details--content py-2 justify-center col col-10 truncate-wrapper"]')
      .first().click({ force: true });
    cy.wait(3000);
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(3000);
    //Validation for False Value 
    cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
      .should('have.attr', 'aria-checked', 'false')
    cy.wait(2000)
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });

  it.only("Validate the Filter SelectList Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Date"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on SelectList dropdown
    cy.get(
      " div.v-input.kit-control-select-list.layout-alignment.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--is-multi div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    )
      .eq(0)
      .click({ force: true });
    cy.wait(2000);
    //SelectList filter value
    cy.contains(this.NewKitItemData.SelectListValue).click({ force: true });
    cy.wait(2000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);
    //scroll
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(3000);
    //scroll
    cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
      .scrollIntoView({ force: true })
    cy.wait(1000)

    var selectList = this.DataType2.SelectListName.toLowerCase();
    cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.SelectListValue)
      });
    cy.wait(2000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter RadioSelect Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Date"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on RadioSelect dropdown
    cy.get(
      " div.v-input.kit-control-select-list.layout-alignment.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--is-multi div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    )
      .eq(1)
      .click({ force: true });
    cy.wait(2000);
    //RadioSelect filter value
    cy.contains(this.NewKitItemData.RadioSelectValue).click({ force: true });
    cy.wait(2000);
    //Click on Apply filters dropdown
    cy.contains("Apply Filters").click({ force: true });
    cy.wait(2000);
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(3000);
    //scroll
    cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
      .scrollIntoView({ force: true })
    cy.wait(1000)
    //json value assertion
    cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
      .invoke('text')
      .then((text) => {
        cy.log(text)
        expect(text.trim()).contains(this.NewKitItemData.RadioSelectValue)
      });

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(2000);
  });

  it("Validate the Filter CheckboxSelect Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    //Validation for Filer Elements
    cy.get('[placeholder="Add Date"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on Checkbox dropdown
    cy.get(
      "div.d-flex.align-center.justify-end.col.app-secondary-header-left--buttons.fill-height.gray-divider div.row.left_panel_menu.filter.row.button-left--border.second-header-left--buton.button-left--border div.sticky-dropdown div.wrapper-content.col:nth-child(2) div.row.full-width.fill-height div.form.tools-padding.left_panel_body.col.left_column.col div.row.flex-nowrap.flex-column.fill-height div.filter-wrapper.col div.container.kit-filter-wrapper.fill-height div.row.kit-filter-container.fill-height div.px-3.pt-4.col.col-12 div.row.fill-height div.wrapper-scroll.col div.container.details-wrapper.fill-height.kit-wrapper-search.col div.row.kit-related-form.pa-6 div.kit-control-component.row-component.px-3.col:nth-child(16) div.v-input.kit-control-select-list.layout-alignment.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--is-multi div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    ).click({ force: true });
    cy.wait(2000);
    //CheckboxSelect filter value(Values coming form KitItemValues Json File)
    cy.contains(this.NewKitItemData.CheckboxSelectValue1).click({
      force: true,
    });
    cy.wait(1000);
    //Click on Apply filters dropdown
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.wait(2000);
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);
    cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true });
    cy.wait(1000);

    //CheckboxSelect validation
    cy.get('[type="checkbox"]').eq(3).should('be.checked')
    cy.wait(2000)
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter Stepper Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    //Validation for Filer Elements
    cy.contains(this.DataType2.Stepper).scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //Click on Stepper dropdown
    cy.get(
      " div.v-input.kit-control-select-list.layout-alignment.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--is-multi div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    )
      .eq(3)
      .click({ force: true });
    cy.wait(2000);
    //Stepper filter value
    cy.contains(this.NewKitItemData.StepperValue).click({ force: true });
    cy.wait(2000);

    cy.contains("Apply Filters").click({ force: true });
    cy.wait(5000);
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);
    //Scroll to stepper
    cy.get(".ca-item").eq(0).scrollIntoView({ force: true });
    cy.wait(1000)
    //json value assertion
    var stepper = this.DataType2.StepperName.toLowerCase();
    cy.xpath('//div[@controlname="' + stepper + '"]//div[@class="v-stepper__header"]//div[@class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete"]//div[@class="v-list-item__subtitle"]')
      .scrollIntoView({ force: true })
    cy.wait(1000)

    //json value assertion
    var stepper = this.DataType2.StepperName.toLowerCase();
    cy.xpath('//div[@controlname="' + stepper + '"]//div[@class="v-stepper__header"]//div[@class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete"]//div[@class="v-list-item__subtitle"]')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.StepperValue)
      })
    cy.wait(1000)
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");

    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter Inspection Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    //Validation for Filer Elements
    cy.get('[placeholder="Created On"][type="text"]').scrollIntoView({
      force: true,
    });
    //Click on Inspection dropdown
    cy.get(
      " div.v-input.kit-control-select-list.layout-alignment.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select.v-select--is-multi div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    )
      .eq(4)
      .click({ force: true });
    cy.wait(2000);
    //Inpection filter value(need to be set in json)
    cy.xpath('//*[contains(@class, "v-list-item v-list-item--link theme--light")]//*[text() =" ' + this.NewKitItemData.InspectionValue + ' "]')
      .click({ force: true })

    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.wait(5000);
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(2000);
    //Scroll to Inspection
    cy.get(".v-btn:nth-child(1) .v-badge > .inline-svg").scrollIntoView({
      force: true,
    });
    cy.wait(1000);
    //json value assertion
    var inspection = this.DataType2.InspectionName.toLowerCase();
    cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
      .invoke('text').then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.InspectionValue)
      });
    cy.wait(2000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".filter-tag-content path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for UserSelector Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.contains(this.DataType2.UserSelector).scrollIntoView({
      force: true,
    });
    //Click on UserSelect link to open userselect list popup
    // cy.get(
    //   " div.v-input.searchSelectNone.v-input--is-readonly.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined.v-select div.v-input__control div.v-input__slot > div.v-select__slot:nth-child(2)"
    // )
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    ).eq(0).click({ force: true });

    cy.contains(" Users ").should("be.visible");
    cy.wait(1000);
    cy.xpath('//*[text() ="Search"]').click({ force: true })
    cy.xpath('//*[text() ="Search"]').next('input').type(`${this.NewKitItemData.UserSelectorName}{enter}`)
    //select userselector value
    cy.contains(this.NewKitItemData.UserSelectorName).click({ force: true });
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(2000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(3000);
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    //json value assertion
    cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.NewKitItemData.UserSelectorName)
    });
    cy.wait(1000)
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Filter for ContactSelector Element", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    cy.contains(this.DataType2.ContactSelector).scrollIntoView({
      force: true,
    });
    cy.wait(4000);
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    ).eq(1).click({ force: true });
    cy.contains(" Connection ").should("be.visible");
    cy.wait(3000)
    //select ContactSelector value
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input').type(`${this.NewKitItemData.ContactSelectorName}{enter}`)
    cy.contains(this.NewKitItemData.ContactSelectorName).click({ force: true });
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(3000);
    //scroll to user selector
    cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
    cy.wait(1000)
    //json value assertion
    cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
      expect(text.trim()).equal(this.NewKitItemData.ContactSelectorName)
    });
    cy.wait(1000)

    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(3000);
  });

  it.only("Validate the Filter for Assigning Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.contains(this.DataType2.Assigning).scrollIntoView({
      force: true,
    });
    //Click on Assigning link to open Assigning list popup
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    ).eq(2).click({ force: true });
    cy.contains(" Connection ").should("be.visible");
    cy.wait(3000);
    cy.xpath('//*[text() ="Search"]').first().click({ force: true })
    cy.wait(1000)
    cy.xpath('//*[text() ="Search"]').first().next('input').type(`${this.NewKitItemData.AssigningName}{enter}`)
    //select Assigning value
    cy.contains(this.NewKitItemData.AssigningName).click({ force: true });
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.contains(
      this.DataType2.Url + ":" + " " + this.NewKitItemData.Url
    ).click({ force: true });
    cy.wait(3000);
    //validation
    var lower = this.DataType2.Assigning.toLowerCase();
    cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').scrollIntoView({ force: true })
    //json value assertion
    cy.xpath('//div[@controlname="assigning"]//div[@class="item-label col"]').children('div').invoke('text')
      .then((text) => {
        expect(text.trim()).equal(this.NewKitItemData.AssigningName)
      });
    cy.wait(2000)
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    cy.log(this.NewKitItemData.KitName + "Kit item has been Close");
    cy.contains(" Recently Viewed ").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(3000);
  });

  it.only("Validate the Default Filter for KitItemID", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.get('[placeholder="Created On"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.get('[placeholder="Item Id"]')
      .first()
      .type(this.NewKitItemData.KitItemID);
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);
    //Click on created kit item
    cy.get(".list-item--title").click({ force: true });
    cy.wait(3000);

    //Validation for kit item
    cy.contains(
      this.NewKitItemData.KitName + " " + "#" + this.NewKitItemData.KitItemID
    ).should("be.visible");
    cy.get(".kitname-account-id").should(
      "have.text",
      this.NewKitItemData.KitName + " " + "#" + this.NewKitItemData.KitItemID
    );
    cy.wait(2000);
    //Close Kit type
    cy.get(".subheader--button-icon-wrapper .inline-svg").click({
      force: true,
    });
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the default Filter for Created By Element", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    cy.contains(this.DataType2.Assigning).scrollIntoView({
      force: true,
    });
    cy.wait(3000);
    //Click on CreatedBy link to open CreatedBy list popup
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    ).eq(3).click({ force: true });
    cy.contains(" Users ").should("be.visible");
    cy.wait(2000);
    //select CreatedBy value
    cy.contains(this.NewKitItemData.CreatedBy).click({ force: true });
    cy.wait(2000);
    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(1000);
  });

  it.only("Validate the Default Filter for Modified By", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    cy.contains(this.DataType2.Assigning).scrollIntoView({
      force: true,
    });
    cy.wait(3000);
    //Click on ModifiedBy link to open ModifiedBy list popup
    cy.xpath(
      '//span[@class="searchRel"]//div[@class="v-select__slot"]//div[@class="v-select__selections"]'
    ).eq(4).click({ force: true });
    cy.contains(" Users ").should("be.visible");
    cy.wait(2000);

    //select ModifiedBy value
    cy.contains(this.NewKitItemData.ModifiedBy).click({ force: true });

    cy.wait(2000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });

  it.only("Validate the Default Filter for Created On", function () {
    //Page Object
    const lp = new LoginPage();
    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    cy.get('[placeholder="Created On"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(3000);
    cy.get('[placeholder="Created On"][type="text"]').click({ force: true });
    cy.wait(2000);
    //Select date by user

    //Firing Alert pop for manual action
    cy.log("User need to do something").then(() => {
      alert("Select the Created On Date for kit item");
    });
    cy.log("User will select created on date");
    cy.wait(3000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });

  it.only("Validate the Default Filter for Modified On", function () {
    //Page Object
    const lp = new LoginPage();

    lp.FilterIcon();
    cy.log("Kit type filters has been opened");
    cy.wait(3000);
    cy.get('[placeholder="Created On"][type="text"]').scrollIntoView({
      force: true,
    });
    cy.wait(3000);
    cy.get('[placeholder="Modified On"][type="text"]').click({ force: true });
    cy.wait(2000);
    //Select date by user

    //Firing Alert pop for manual action
    cy.log("User need to do something").then(() => {
      alert("Select the Modified On Date for kit item");
    });
    cy.log("User will select Modified on date");
    cy.wait(3000);

    cy.contains("Apply Filters").click({ force: true });
    cy.get(".filter-tag").should("be.visible");
    cy.wait(3000);

    //Click on cross icon to remove filer
    cy.get(".inline-svg:nth-child(3) > path").click({ force: true });
    cy.wait(5000);
  });
});
