describe("Verify sorting at the table Week leaders", function () {
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

  async function verifySorting(field) {
    function assert(sorting, arrayfromTable, arraySorted, arraySortedReverse) {
      if (sorting == "asc") {
        expect(arrayfromTable).toEqual(arraySorted);
      } else if (sorting == "desc") {
        expect(arrayfromTable).toEqual(arraySortedReverse);
      } else {
        throw new Error("Error in determening sorting order");
      }
    }
    // first click on the table header
    await $(
      `div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`
    ).click();

    const sortTypeFirstClick = await $(
      `div[tabulator-field='${field}'][role='columnheader']`
    ).getAttribute("aria-sort");
    let arrayfromTable = await $$(
      `div[role='gridcell'][tabulator-field='${field}']`
    ).map((x) => {
      return x.getText();
    });
    const arraySorted = arrayfromTable
      .map((x) => x)
      .sort(function (a, b) {
        return a - b;
      });
    const arraySortedReverse = arraySorted.map((x) => x).reverse();
    assert(sortTypeFirstClick, arrayfromTable, arraySorted, arraySortedReverse);

    //second click on the table header
    await $(
      `div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`
    ).click();
    const sortTypeSecondClick = await $(
      `div[tabulator-field='${field}'][role='columnheader']`
    ).getAttribute("aria-sort");
    arrayfromTable = await $$(
      `div[role='gridcell'][tabulator-field='${field}']`
    ).map((x) => {
      return x.getText();
    });
    assert(
      sortTypeSecondClick,
      arrayfromTable,
      arraySorted,
      arraySortedReverse
    );
  }

  it("should verify if sorting by fields Id, Name, Age is correct", async function () {
    const titlePortal = await browser.getTitle();
    if (titlePortal !== "Report portal") {
      throw new Error("You don`t login into system!!!");
    }
    await verifySorting("id");
    await verifySorting("name");
    await verifySorting("age");
    await verifySorting("rate");
    await verifySorting("col");
  });
});
