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
    const titlePortal = await browser.getTitle();
    if (titlePortal !== "Report portal") {
      throw new Error("You don`t login into system!!!");
    } 
    await $("#example-table").waitForDisplayed ({
      timeout: 1000,
      timeoutMsg : "Table is not displayed"
    }) 
  });

  async function verifySorting(field) {
    function assert(sorting, arrayfromTable, arraySorted, arraySortedReverse) {
      if (sorting === "asc") {
        expect(arrayfromTable).toEqual(arraySorted);
      } else if (sorting === "desc") {
        expect(arrayfromTable).toEqual(arraySortedReverse);
      } else {
        throw new Error("Error in determening sorting order");
      }
    }
 
    const sortingType = await $(
      `div[tabulator-field='${field}'][role='columnheader']`
    ).getAttribute("aria-sort");
    const arrayfromTable = await $$(
      `div[role='gridcell'][tabulator-field='${field}']`
    ).map((x) => {
      return x.getText();
    });
    const arraySorted = arrayfromTable
      .map((x) => x)
      .sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (b > a) {
          return -1;
        }
        return 0;
      });
    const arraySortedReverse = arraySorted.map((x) => x).reverse();
    assert(sortingType, arrayfromTable, arraySorted, arraySortedReverse);
  }

async function verifyArrow(field) {
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    const arrowElement = await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-arrow`);
    const arrowTopStyleCSS = await arrowElement.getCSSProperty('borderTopStyle');
    const arrowTopWidthCSS = await arrowElement.getCSSProperty('borderTopWidth');
    const arrowBottomStyleCSS = await arrowElement.getCSSProperty('borderBottomStyle');
    const arrowBottomWidthCSS = await arrowElement.getCSSProperty('borderBottomWidth');
    const arrowTopStyle = arrowTopStyleCSS.value; 
    const arrowTopWidth = arrowTopWidthCSS.value; 
    const arrowBottomStyle = arrowBottomStyleCSS.value; 
    const arrowBottomWidth = arrowBottomWidthCSS.value; 
    
    if (sortingType === "asc") {
      expect("solid6px").toEqual(arrowBottomStyle + arrowBottomWidth, `Error with arrow on ascending sorting ${field}`);
    }
    else if (sortingType === "desc") {
      expect("solid6px").toEqual(arrowTopStyle + arrowTopWidth, `Error with arrow on descending sorting ${field}`);
    } else {
      throw new Error("Error in determening sorting order");
    }
}

context("Should verify if sorting by field Id is correct", async function (){

  it("should click on Id header first time", async function () {
    const field = "id";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    await verifyArrow(field);    
    await verifySorting (field);
  });

  it("should click second time on IDd header", async function () {
    const field = "id";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    await verifyArrow(field);
    await verifySorting (field);
  });
})

context("Should verify if sorting by field Name is correct", async function (){
 
  it("should click on Name header first time", async function () {
    const field = "name";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    await verifyArrow(field);    
    await verifySorting (field);
  });

  it("should click second time on Name header", async function () {
    const field = "name";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    await verifyArrow(field);
    await verifySorting (field);
  });
})

context("Should verify if sorting by field Age is correct", async function (){

  it("should click on Age header first time", async function () {
    const field = "age";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    await verifyArrow(field);    
    await verifySorting (field);
  });

  it("should click second time on Age header", async function () {
    const field = "age";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    await verifyArrow(field);
    await verifySorting (field);
  });
})
})
