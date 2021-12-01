describe("Create manager", function () {
 /*  function assert(actual, expected, field) {
    if (!(actual == expected)) {
      throw new Error(
        `Error. The field ${field} doesn't match this field at the form Create manager`
      );
    }
  }
 */
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
    
    await expect(browser).toHaveTitle("Report portal");
    await browser.pause(2000);
    //const currencyRate = await $("#currency-rate").getText();
    //const inputSum = await $("#sum-to-buy");
    const inputSum = await $("#sum-to-buy").addValue('1');
    
    await browser.pause(2000);
    await inputSum.addValue('2');
    await browser.pause(2000);
    await inputSum.addValue('3');
    await browser.pause(2000);
    await inputSum.addValue('4');
    await browser.pause(2000); 
    
   
    //await $("button:contains('Buy')").click();
    await $("button[onclick='withdraw()']").click();
    await browser.pause(2000);
   
  });
});


/* если у вас при выполнении 4-го задания проблема получения 
содержимого #database через функцию .getText() то используйте
 вместо нее .getHTML(false) */