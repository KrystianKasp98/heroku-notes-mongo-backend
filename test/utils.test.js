const {formatMongoQuery, checkIfWrongPropertyTypes, mapTypes, mapReceived} = require("../utils/index");
const config = require("../config");


describe("Test utils methods", () => {
  test("formatMongoQuery", () => {
    const received = config.testsUtils.basic[0];
    const edited = formatMongoQuery(received);

    expect(edited).toEqual(config.testsUtils.formated[0]);
  });

  test("checkIfWrongPropertyTypes", () => {
    const received1 = mapReceived(config.testsUtils.basic[1]);
    const expected1 = mapTypes(["id", "note", "date"]);
    const edited1 = checkIfWrongPropertyTypes(expected1, received1);

    expect(edited1).toEqual(config.testsUtils.formated[1]);

    const received2 = mapReceived(config.testsUtils.basic[2]);
    const expected2 = mapTypes(["id", "note"]);
    const edited2 = checkIfWrongPropertyTypes(expected2, received2);

    expect(edited2).toEqual(config.testsUtils.formated[2]);

    const received3 = mapReceived(config.testsUtils.basic[3]);
    const expected3 = mapTypes(["id", "date"]);
    const edited3 = checkIfWrongPropertyTypes(expected3, received3);

    expect(edited3).toEqual(config.testsUtils.formated[3]);
  });

  test("mapTypes", () => {
    const received = config.testsUtils.basic[4];
    const edited = mapTypes(received);

    expect(edited).toEqual(config.testsUtils.formated[4]);
  });

  test("mapReceived", () => {
    const received = config.testsUtils.basic[5];
    const edited = mapReceived(received);

    expect(edited).toEqual(config.testsUtils.formated[5]);
  });
});
