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

  async function verifyingSorting(field) {
    function assert (sorting, arrayfromTable, arraySorted, arraySortedReverse ) {
      if (sorting == 'asc') {
        expect(arrayfromTable).toEqual(arraySorted);    
      } else if (sorting == 'desc') {
        expect(arrayfromTable).toEqual(arraySortedReverse);
      } else {
        throw new Error('Error in determening sorting order');
      }
    }
    // first click on sort Icon
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click(); 
    //await browser.pause(3000);
    // asc or desc
    const sortingClick1 = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute('aria-sort');
    // array from table column ID
    let arrayfromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map(x => {
      return x.getText();
    }) 
    const arraySorted = arrayfromTable.map((x) => x).sort(function(a, b) {
      return a - b;
    });
    const arraySortedReverse = arraySorted.map((x) => x).reverse();
    assert (sortingClick1, arrayfromTable, arraySorted, arraySortedReverse);

    //second click on triangle 
    await $(`div[tabulator-field='${field}'][role='columnheader'] div.tabulator-col-content`).click(); 
    // asc or desc
    const sortingClick2 = await $(`div[tabulator-field='${field}'][role='columnheader']`).getAttribute('aria-sort');
   // array from table column ID
    arrayfromTable = await $$(`div[role='gridcell'][tabulator-field='${field}']`).map(x => {
      return x.getText();
    }) 
    assert (sortingClick2, arrayfromTable, arraySorted, arraySortedReverse);
   
    //await browser.execute('alert(arguments[0] + arguments[1] + arguments[2])', arrayfromTable, sortingClick2, arraySortedReverse);
    //await browser.pause(3000);
  }

    
  it("should verify if sorting by fields Id, Name, Age is correct", async function () {
      
    const titlePortal = await browser.getTitle();
    if (titlePortal !== "Report portal") {
      throw new Error("You don`t login into system!!!");
    }
  
    await verifyingSorting('id');
    await verifyingSorting('name');
    await verifyingSorting('age');
    await verifyingSorting('rate');
    await verifyingSorting('col');

 //   await verifyingSorting('dob');

  });
});
