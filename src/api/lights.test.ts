import { assert } from "chai";
import { json } from "express";
import * as lights from "./lights";

import * as MOCK_DATA from './lights-response-mock-data.json';

const TEST_DATE_EXISTS = '2001-01-01';
const TEST_DATE_DOES_NOT_EXIST = '2002-01-01';


 
describe("api/lights", () => {
  // TODO: SHould we mock the call here? 

  it(`should find test row ${TEST_DATE_EXISTS}`, async () => {
    const data = await lights._api(TEST_DATE_EXISTS);
    console.log(data);
    // const result = addition(2, 3);
    // assert.equal(result, 5);
  }); 

  it("should format API response", () => {
    const formatted = lights._format(MOCK_DATA);
    console.log(formatted);

    assert.equal(5, 5);
  });
});
