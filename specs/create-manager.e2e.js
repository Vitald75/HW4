describe("Create manager", function () {
  function assert(actual, expected, field) {
    if (!(actual == expected)) {
      throw new Error(`Error. The field ${field} doesn't match this field at the form Create manager`);
    }
  }

  before("Login with credentials walker@jw.com:password", async function () {
    await browser.url(
      "https://viktor-silakov.github.io/course-sut/index.html?quick"
    );
    await $("#login").setValue("walker@jw.com");
    await $("#password").setValue("password");
    await $("button").click();
    await await $("#spinner").waitForDisplayed({
      reverse: true,
      timeout: 5000,
    });
  });

  it("should Create 2 managers, and check managers data in the table on User form page", async function () {
    const titlePortal = await browser.getTitle();
    if (titlePortal !== "Report portal") {
      throw new Error("You don`t login into system!!!");
    }
   // add the first user(manager)
    await $("a[href='./formManager.html']").click();
    const titleUserForm = await browser.getTitle();
    if (titleUserForm !== "User form") {
      throw new Error("You don`t open Manager form page!!!");
    }
    const email1 = "userManager@company.com";
    const password1 = "1452qw";
    const address11 = "addr1";
    const address21 = "addr2";
    const state1 = "India";
    const zip1 = "220000";
    const description1 = "some descriptions 1";
    const city1 = "Montreal";
    await $("#email").addValue(email1);
    await $("#password").addValue(password1);
    await $("#address1").addValue(address11);
    await $("#address2").addValue(address21);
    const elemState1 = await $("#state");
    await elemState1.click();
    await elemState1.selectByVisibleText(state1);
    await $("#zip").addValue(zip1);
    await $("#description").addValue(description1);
    await $("#demo-balance").click();
    await $("#wait-supervisor").click();
    await $("input[value='country']").click();
    await $("input[name='city']").addValue(city1);
    await $("#autoComplete_result_1").click();
    await $("button[type='submit']").click();

    // add the second user(manager)
    await $("a[href='./formManager.html']").click();
    const titleUserForm2 = await browser.getTitle();
    if (titleUserForm2 !== "User form") {
      throw new Error("You don`t open Manager form page, creating 2-nd manager!");
    }
    const email2 = "userManager222@company.com";
    const password2 = "1452qw";
    const address12 = "addr1";
    const address22 = "addr2";
    const state2 = "Georgia";
    const zip2 = "444444";
    const description2 = "some descriptions second part";
    const city2 = "Boston";
    await $("#email").addValue(email2);
    await $("#password").addValue(password2);
    await $("#address1").addValue(address12);
    await $("#address2").addValue(address22);
    const elemState2 = await $("#state");
    await elemState2.click();
    await elemState2.selectByVisibleText(state2);
    await $("#zip").addValue(zip2);
    await $("#description").addValue(description2);
    await $("#demo-balance").click();
    await $("#wait-supervisor").click();
    await $("input[value='region']").click();
    await $("input[name='city']").addValue(city2);
    await $("#autoComplete_result_1").click();
    await $("button[type='submit']").click();
 
    //verifying the fist user's data
    const actual1Adress1 = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='address1']`).getText();
    const actual1Adress2 = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='address2']`).getText();
    const actual1Role = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='role']`).getText();
    const actual1City = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='city']`).getText();
    const actual1State = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='state']`).getText();
    const actual1Zip = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='zip']`).getText();
    const actual1Description = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='description']`).getText();
    const actual1ManagerType = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='manager-type']`).getText();
    const actual1WaitSupervisor = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='wait-supervisor']`).getText();
    const actual1DemoBalance = await $(`//div[text()='${email1}']/following-sibling::div[@tabulator-field='demo-balance']`).getText();
    assert(actual1Adress1,address11, "Address1");
    assert(actual1Adress2,address21, "Address2");
    assert(actual1Role, "manager", "User_role");
    assert(actual1City,city1, "City");
    assert(actual1State.toUpperCase,state1.slice(0,2).toUpperCase, "State");
    assert(actual1Zip,zip1, "Zip");
    assert(actual1Description,description1, "Description");
    assert(actual1ManagerType, "country", "Manager_type");
    assert(actual1WaitSupervisor, "on", "Wait_for_supervisor");
    assert(actual1DemoBalance, "on", "Demo_balance");

  //verifying the second user's data
    const actual2Adress1 = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='address1']`).getText();
    const actual2Adress2 = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='address2']`).getText();
    const actual2City = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='city']`).getText();
    const actual2State = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='state']`).getText();
    const actual2Zip = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='zip']`).getText();
    const actual2Description = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='description']`).getText();
    const actual2ManagerType = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='manager-type']`).getText();
    const actual2WaitSupervisor = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='wait-supervisor']`).getText();
    const actual2DemoBalance = await $(`//div[text()='${email2}']/following-sibling::div[@tabulator-field='demo-balance']`).getText();
    assert(actual2Adress1,address12, "Address1");
    assert(actual2Adress2,address22, "Address2");
    assert(actual2City,city2, "City");
    assert(actual2State.toUpperCase, state2.slice(0,2).toUpperCase, "State");
    assert(actual2Zip,zip2, "Zip");
    assert(actual2Description,description2, "Description");
    assert(actual2ManagerType, "region", "Manager_type");
    assert(actual2WaitSupervisor, "on", "Wait_for_supervisor");
    assert(actual2DemoBalance, "on", "Demo_balance");
  });
});
