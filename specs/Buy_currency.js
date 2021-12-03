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

  it("Should enter 1000 in field currency, click buy, check result amount", async function () {
    async function inputOneNumber(value, position) {
      await inputSum.addValue(value);
      await browser.waitUntil(
        async () => {
          const data = await $("#database").getHTML(false);
          console.log (data);
          //const newdata = data.slice(data.indexOf("["), data.indexOf("]") + 1);
          const newdata = data;        
          const dataJson = JSON.parse(newdata);
          return dataJson[position].num == value;
        },
        {
          timeout: 5000,
          interval: 300,
          timeoutMsg: "The element is not in databaswe",
        }
      );
    }

    await expect(browser).toHaveTitle("Report portal");
    const currencyRate = await $("#currency-rate").getText();
    const inputSum = await $("#sum-to-buy");
    await inputOneNumber("1", 0);
    await inputOneNumber("2", 1);
    await inputOneNumber("3", 2);
    await inputOneNumber("4", 3);

    await $("//button[text()='Buy']").click();
    const sum = await inputSum.getValue();
    expectedAmount = Number(sum) * Number(currencyRate);

    const resultElement = await $("#withdrew");
    await expect(resultElement).toBeDisplayed();
    const result = await resultElement.getText();
    const actualAmoutStr = result.slice(result.indexOf(">") + 1).trim();
    const actualAmout = Number(actualAmoutStr);

    await expect(expectedAmount).toEqual(actualAmout);
  });
});
