import { ExpectedNotes, ReceivedNotes, MapTypesProperties } from "../interfaces";
import config from "../../config";

export default class Utils {
    /**
   * @info it formats string type properties for disable case sensitive
   */
  static formatMongoQuery(query: any) {
    // remove case sensitive
    for (let key in query) {
      if (typeof query[key] === "string" && key !== "id") {
        query[key] = new RegExp(["^", query[key], "$"].join(""), "i");
      }
    }
    return query;
  };

  // // expected:{id:"string",note:"string",date:"number"}, received: {id:typeof id, note: typeof note, date: typeof date}
  // /**
  //  * @info compare expected req.body props with received req.body props
  //  * @param {{id?: "string", note?: "string", date?: "number", query?: "object"}} expected
  //  * @param {{id?: string, note?: string, date?: string, query: string}} received
  //  * @returns {string} if types are correct it will return empty string(falsy value)
  //  */
  static checkIfWrongPropertyTypes(expected: ExpectedNotes, received: ReceivedNotes): string  {
    let message = "";
    for (let key in expected) {
      if (expected[key] !== received[key] || received[key] === undefined) {
        message += `${config.message.badProperty(key, expected[key])} `;
      }
    }
    return message === "" ? message : message.slice(0, -1);
  };

  static mapTypes(properties: MapTypesProperties){
  const mappedObject = {};
  properties.forEach(prop => {
    if (config.mappedTypes[prop]) {
      mappedObject[prop] = config.mappedTypes[prop];
    }
  });

  return mappedObject;
};
  
}