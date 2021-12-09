describe("Buy currency", function () {
  before("Login with credentials walker@jw.com:password", async function () {
    await browser.url(
      "https://viktor-silakov.github.io/course-sut/index.html?quick"
    );
    await $("#login").setValue("walker@jw.com");
    await $("#password").setValue("password");
    await $("button").click();
    await $("#spinner").waitForDisplayed({
      reverse: true,
      timeout: 5000,
    });
  });

  it("Should enter 1234 in field currency, click buy, check result amount", async function () {
    
    async function WaitForWriteInDatabase(value, position) {
      await browser.waitUntil(
        async () => {
          const data = await $("#database").getHTML(false);
          const dataJson = await JSON.parse(data);
          return dataJson[position].num === value;
        },
        {
          timeout: 5000,
          interval: 300,
          timeoutMsg: `The element ${value} is not in database`,
        }
      );
    }

    await expect(browser).toHaveTitle("Report portal");
    const currencyRate = await $("#currency-rate").getText();
    const inputSum = await $("#sum-to-buy");
    
    await inputSum.addValue("1");
    await WaitForWriteInDatabase("1", 0);
    await inputSum.addValue("2");
    await WaitForWriteInDatabase("2", 1);
    await inputSum.addValue("3");
    await WaitForWriteInDatabase("3", 2);
    await inputSum.addValue("4");
    await WaitForWriteInDatabase("4", 3);

    await $("//button[text()='Buy']").click();
    const sum = await inputSum.getValue();
    expectedAmount = Number(sum) * Number(currencyRate);

    const resultElement = await $("#withdrew");
    await expect(resultElement).toBeDisplayed();
    const actualAmountStr = await resultElement.getText();
    const expectedAmountStr = `1234 => ${expectedAmount}`;
        
    await expect(expectedAmountStr).toEqual(actualAmountStr);

  });
});
