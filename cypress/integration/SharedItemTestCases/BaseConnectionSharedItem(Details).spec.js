import LoginPage from "../PageObject/LoginPage";
import SignUpPage from "../PageObject/SignUpPage";
import SanityLoginPage from "../PageObject/SanityLoginPage";


describe("Base Connection Shared Kit Item Test Case", function () {
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
    
            //Globally fixtures for shared item test cases creads
            cy.fixture("LoginTestData/SharedUserCredentials").then(function (
            LogInScriptGloably
            ) {
            this.SharedCreds = LogInScriptGloably;
            });
          /////////////////////////////////////////////////////////////////////////

          cy.fixture("KitTypeTestData/NewKitItemDataValues").then(function (
            KitDataEle
         ) {
            this.NewKitItemData = KitDataEle;
         });

         // cy.fixture("SanityPackTestData(Prod)/NewKitItemDataValue(Prod)").then(
         //   function (KitDataEle) {
         //     this.NewKitItemData = KitDataEle;
         //   }
         // );

        cy.fixture("SanityPackTestData/UpdateKItItemData").then(function (
            UpDateKitItemSDTCData
        ) {
            this.UpdateKitItemData = UpDateKitItemSDTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/UpdateKItItemData(Prod)").then(
        //     function (UpDateKitItemSDTCData) {
        //         this.UpdateKitItemData = UpDateKitItemSDTCData;
        //     }
        // );

        cy.fixture("VerificationTestCasesData/KitBuilderDataTypes2").then(function (
            NewDataForElements
        ) {
            this.DataType2 = NewDataForElements;
        });

        // cy.fixture("SanityPackTestData(Prod)/KitBuilderDataTypes2(Prod)").then(
        //     function (NewDataForElements) {
        //         this.DataType2 = NewDataForElements;
        //     }
        // );

        cy.fixture("SanityPackTestData/DetailViewTestData").then(function (
            SanityTCData
        ) {
            this.SData = SanityTCData;
        });

        // cy.fixture("SanityPackTestData(Prod)/DetailViewTestData(Prod)").then(
        //     function (SanityTCData) {
        //         this.SData = SanityTCData;
        //     }
        // );
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        cy.fixture("SanityPackTestData2/KitItemId").then(function (ItemID) {
            this.KitItemId = ItemID;
        });

    });

    it.only('Login TestCase',function(){
        const lp = new LoginPage();
        const slp = new SanityLoginPage();
        slp.BaseUrl(this.LoginCreds.BaseUrl)
        //Handling Alert
        cy.on("window:confirm", () => {
          cy.log("Alert has been Handled");
        });
        //Login Assertions
        cy.contains(" Log In ").should("be.visible");
        //Enter credentials
        lp.EnterEmail(this.SharedCreds.DetailsBaseConnection);
        lp.EnterPassword(this.LoginCreds.Password);
        lp.Submit();
        cy.log("User has been Logged In into the application");
        cy.wait(5000)
      })

    it.only('Click on Shared Kit Item', function () {
        cy.wait(2000)
        var id = this.KitItemId.ItemID.replace(' #', '# ')
        cy.log(id)
        cy.xpath('//*[contains(@class, "row collaboration-inbox__title")]//*[text()="' + id + '"]')
            .click({ force: true })
    })


    it.only("Url Element data Validation", function () {
        var lower = this.DataType2.Url.toLowerCase();
        //Validating details view input data
        cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Url)
    });


    it.only("Text Element data Validation", function () {
        var lower = this.DataType2.Text.toLowerCase();
        //Validating details view input data
        cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Text)
    });

    it.only('File Element data Validation', function () {
        var lower = this.DataType2.File.toLowerCase();
        cy.xpath('//div[@class="drop-zone"]//div[@class="v-input__slot"]//div[@class="v-text-field__slot"]//input')
            .invoke('val').then((text) => {
                expect(text.trim()).equal(this.UpdateKitItemData.UpdateFileName)
            });
    })


    it.only("Telephone Element data Validation", function () {
        var lower = this.DataType2.Telephone.toLowerCase();
        //Validating details view input data
        cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Telephone)
    });


    it.only("TextAera Element data Validation", function () {
        var lower = this.DataType2.TextAera.toLowerCase();
        //Validating details view input data
        cy.get('[name="TextAera"]').eq(1).should("have.value", this.UpdateKitItemData.TextAera)
    });

    it.only('Currency Element data Validation', function () {
        var currency = this.DataType2.Currency.toLowerCase();
        cy.xpath('//div[@class="kit-control-' + currency + '--right ma-0 pa-0 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
            .next('input').should("have.value", this.UpdateKitItemData.Currency)
    })

    it.only('Measure Element data Validation', function () {
        var measure = this.DataType2.Measure.toLowerCase();
        cy.xpath('//div[@class="kit-control-' + measure + '--left ma-0 pa-0 pr-2 col"]//div[@class="v-text-field__slot"]//label[@class="v-label v-label--active theme--light"]')
            .next('input').should("have.value", this.UpdateKitItemData.Measure)
    })

    it.only("Email Element data Validation", function () {
        var lower = this.DataType2.Email.toLowerCase();
        //Validating details view input data
        cy.xpath("//input[@controlname='" + lower + "']").should("have.value", this.UpdateKitItemData.Email)
    });

    it.only("Addressline1 Element data Validation", function () {
        cy.get('[placeholder="Street address, building, company ... "]').scrollIntoView({ force: true })
        //Validating details view input data
        cy.get('[placeholder="Street address, building, company ... "]')
            .should("have.value", this.UpdateKitItemData.Addressline1)
    });

    it.only("Addressline2 Element data Validation", function () {
        //Validating details view input data
        cy.get('[name="Address line 2."]')
            .should("have.value", this.UpdateKitItemData.Addressline2)
    });

    it.only("City Element data Validation", function () {
        //Validating details view input data
        cy.get('[placeholder="City"]')
            .should("have.value", this.UpdateKitItemData.City)
    });

    it.only("ZipCode Element data Validation", function () {
        cy.get('[placeholder="Zip/Postal Code"]').scrollIntoView({ force: true })
        //Validating details view input data
        cy.get('[placeholder="Zip/Postal Code"]')
            .should("have.value", this.UpdateKitItemData.ZipCode)
    });

    it.only("State Element data Validation", function () {
        cy.xpath('//div[@class="v-select__slot"]//div[@class="v-select__selections"]//div[@class="v-select__selection v-select__selection--comma"]')
            .eq(0)
            .invoke('text').then((text) => {
                expect(text.trim()).equal(this.UpdateKitItemData.State)
            })
    });

    it.only("Country Element data Validation", function () {
        //Validating details view input data
        cy.get('[placeholder="Country"]')
            .should("have.value", this.UpdateKitItemData.Country)
    });

    it.only("Number Element data Validation", function () {
        var lower = this.DataType2.Number.toLowerCase();
        //Validating details view input data
        cy.xpath("//input[@controlname='" + lower + "']")
            .should("have.value", this.UpdateKitItemData.Number)
    });

    it.only('Time Element data Validation', function () {
        //Check in josn for LoggedTime
        cy.get('[placeholder="Add Time"][readonly="readonly"]').eq(0)
            .should("have.value", this.UpdateKitItemData.LoggedTime)
    })

    it.only('Date Element data Validation', function () {
        //Check in josn for LoggedDate
        cy.get('[placeholder=" MM / DD / YYYY"]')
            .should("have.value", this.UpdateKitItemData.LoggedDate)
    })

    it.only("Toggle Element data Validation", function () {
        cy.xpath('//div[@class="pl-3 col"]//div[@class="v-input--selection-controls__input"]//input')
            .should('have.attr', 'aria-checked', 'false')
    });

    it.only("SelectList Element data Validation", function () {
        var selectList = this.DataType2.SelectListName.toLowerCase();
        cy.xpath('//div[@controlname="selectList"]//div[@class="v-list-item__subtitle"]')
            .invoke('text').then((text) => {
                expect(text.trim()).equal(this.UpdateKitItemData.SelectListValue)
            });
    })

    it.only('RadioSelect Element data Validation', function () {
        var radio = this.DataType2.RadioSelectName.toLowerCase();
        //json value assertion
        cy.xpath('//div[@controlname="radioSelect"]//div[@class="v-input__slot"]//div[@class="v-radio theme--light v-item--active"]//div[@class="v-list-item__content"]')
            .invoke('text')
            .then((text) => {
                cy.log(text)
                expect(text.trim()).contains(this.UpdateKitItemData.RadioSelectValue)
            });
    })

    it.only("CheckboxSelect Element data Validation", function () {
        //CheckboxSelect2
        cy.get('[type="checkbox"]').eq(2).should('be.checked')
    });

    it.only('Stepper Element data Validation', function () {
        var stepper = this.DataType2.StepperName.toLowerCase();
        cy.xpath('//div[@controlname="' + stepper + '"]//div[@class="v-stepper__header"]//div[@class="v-stepper__step v-stepper__step--inactive v-stepper__step--complete"]//div[@class="v-list-item__subtitle"]')
            .invoke('text').then((text) => {
                expect(text.trim()).equal(this.UpdateKitItemData.StepperValue)
            })
    });

    it.only('UserSelector Element data Validation', function () {
        //scroll to user selector
        cy.get('.imageContent').eq(0).scrollIntoView({ force: true })
        cy.wait(1000)
        cy.xpath('//div[@controlname="userSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
            expect(text.trim()).equal(this.UpdateKitItemData.UserSelector)
        });

    })

    it.only('ContactSelector Element data Validation', function () {
        cy.xpath('//div[@controlname="contactSelector"]//div[@class="col item-label"]').children('div').invoke('text').then((text) => {
            expect(text.trim()).equal(this.UpdateKitItemData.ContactSelector)
        });
    })

    it.only('Assigning Element data Validation', function () {
        var assigning = this.DataType2.Assigning.toLowerCase();
        cy.get('.v-btn:nth-child(1) .v-badge > .inline-svg').scrollIntoView({ force: true })
        //json value assertion
        cy.xpath('//div[@controlname="' + assigning + '"]//div[@class="item-label col"]').children('div').invoke('text')
            .then((text) => {
                expect(text.trim()).equal(this.UpdateKitItemData.Assigning)
            });
    })

    it.only('Inspection Element data Validation', function () {
        var inspection = this.DataType2.InspectionName.toLowerCase();
        cy.xpath('//div[@controlname="' + inspection + '"]//div[@class="v-slide-group__content"]').children('span.v-chip--active')
            .invoke('text').then((text) => {
                expect(text.trim()).equal(this.UpdateKitItemData.InspectionValue)
            });
    });

    it.only('Icon Element data Validation', function () {
        //Validating details view input data
        cy.get('[placeholder="Label"]')
            .should("have.value", this.UpdateKitItemData.IconLabel)
    })

    it("Files tab data Validation in details view", function () {
        cy.contains("Files").click({ force: true });
        //cy.contains(this.NewKitItemData.NewFormLibFileName).should("be.visible");
        cy.contains(this.SData.DetailViewFileName).should("be.visible");
        cy.log("Uploaded files exist");

    });

    it.only("Contributors tab data Validation in details view", function () {
        cy.contains("Contributors").click({ force: true })
        cy.contains(this.SData.ExternalConnection).should('be.visible')
    });

    it.only("Comments tab data Validation in details view", function () {
        cy.contains("Comments").click({ force: true });
        cy.wait(1000);
        cy.contains(this.SData.AddComments).should("be.visible");
        cy.log("Created comments exist");

    });

    it.only("Tabs which should be hide for Shared View", function () {
        cy.contains(" Time Entries ").should('not.exist')
        cy.contains(" Calendar ").should('not.exist')
        cy.contains(" Scheduler ").should('not.exist')
        cy.contains(" Common Plans ").should('not.exist')
    });

    it.only("Email Notification Shared Kit Item Activity for Base Connection(New View Contributor)", function () {
        //PageObject
        const sp = new SignUpPage();
        sp.mailinatorSite();
        cy.url().should("include", "mailinator.com");
        sp.EnterMailinatorEmail(this.SharedCreds.DetailsBaseConnection);
        cy.log("User Email has been Entered");
        //Click on Go
        sp.Go();
        cy.wait(5000);
        cy.contains("New " + this.NewKitItemData.KitName).click({ force: true });
    });


})


