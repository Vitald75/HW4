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

  async function verifySorting(arrayFromTable, arraySorted, sorting) {
    const arraySortedReverse = arraySorted.map((x) => x).reverse();
    if (sorting === "asc") {
      await expect(arrayFromTable).toEqual(arraySorted);
    } else if (sorting === "desc") {
      await expect(arrayFromTable).toEqual(arraySortedReverse);
    } else {
      throw new Error("Error in determening sorting order");
    }
  }

  context("Should verify if sorting by field Id is correct", async function (){

  it("should click first time on Id header - ascending", async function () {
    const field = "id";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    await expect(sortingType).toEqual("asc");
    const arrayFromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map((x) => {
      return x.getText();
    }); 
    const arraySorted = arrayFromTable
    .map((x) => x)
    .sort(function (a, b) {
      return a - b;
      }); 
    await verifySorting(arrayFromTable, arraySorted, 'asc');
  });

  it("should click second time on Id header - descending", async function () {
    const field = "id";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    await expect(sortingType).toEqual("desc");

    const arrayFromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map((x) => {
      return x.getText();
    });  
    const arraySorted = arrayFromTable
    .map((x) => x)
    .sort(function (a, b) {
      return a - b;
      }); 
    await verifySorting(arrayFromTable, arraySorted,'desc');
  });
})

context("Should verify if sorting by field Name is correct", async function (){
 
  it("should click first time on Name header - ascending", async function () {
    const field = "name";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    await expect(sortingType).toEqual("asc");

    const arrayFromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map((x) => {
      return x.getText();
    });  
    const arraySorted = arrayFromTable
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
    await verifySorting(arrayFromTable, arraySorted, 'asc'); 
  });

  it("should click second time on Name header - descending", async function () {
    const field = "name";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    await expect(sortingType).toEqual("desc");

    const arrayFromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map((x) => {
      return x.getText();
    });  
    const arraySorted = arrayFromTable
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
    await verifySorting(arrayFromTable, arraySorted, 'desc'); 
  });
})

context("Should verify if sorting by field Age is correct", async function (){

  it("should click first time on Age header - ascending", async function () {
    const field = "age";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    await expect(sortingType).toEqual("asc");
    
    const arrayFromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map((x) => {
      return x.getText();
    });  
     const arraySorted = arrayFromTable
    .map((x) => x)
    .sort(function (a, b) {
      return a - b;
      });  
    await verifySorting(arrayFromTable, arraySorted,'asc');
  });

  it("should click second time on Age header descending", async function () {
    const field = "age";
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click();
    await browser.pause(500);
    const sortingType = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute("aria-sort");
    await expect(sortingType).toEqual("desc");

    const arrayFromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map((x) => {
      return x.getText();
    });  
     const arraySorted = arrayFromTable
    .map((x) => x)
    .sort(function (a, b) {
      return a - b;
      }); 
    await verifySorting(arrayFromTable, arraySorted, 'desc');
  });
})
})
