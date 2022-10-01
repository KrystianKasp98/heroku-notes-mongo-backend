export default {
  message: {
    badRequest: "Bad request" as string,
    badAuth: "Bad credentials" as string,
    failedAuth: "Authorization failed" as string,
    /**
     *
     * @param {string} name property name
     * @param {string} type correct property type, not passed
     * @returns
     */
    badProperty: (name:string, type: string) =>
      `You passed wrong property, ${name} must have ${type} type.`,
  } as object,
  sortBy: {
    desc: -1 as number,
    asc: 1 as number,
  } as object,
  mappedTypes: {
    id: "string" as string,
    note: "string" as string,
    date: "number" as string,
    query: "object" as string,
    options: "object" as string,
  } as object,
  method: {
    GET: "get" as string,
    POST: "post" as string,
    PUT: "put" as string,
    DELETE: "delete" as string,
  },
  testsApi: [
    {
      _id: "6325ff55e79521788fd0f3d7" as string,
      note: "welcome in my app" as string,
      date: 1663434665905 as number,
      edits: [] as [],
    },
    {
      _id: "6326080a6b6db35867d0fb32" as string,
      note: "Welcome" as string,
      date: 222333 as number,
      edits: [] as [],
    },
    {
      note: "POST, PUT, DELETE" as string,
      date: 222444333 as number,
    },
    {
      note: "new note POST, PUT, DELETE" as string,
      date: 222444334 as number,
    },
  ] as object[],
  testsUtils: {
    basic: [
      {
        date: 2000,
        id: "2333534534",
        note: "Welcome"
      },
      {
        id: 2132423,
        note: true,
        date: 2142152363
      },
      {
        note: "correct note",
        id: "correct id"
      },
      {
        id: "2131",
        badProp: true,
        date: true
      },
      ["id", "note", "date", "name"],
      {
        id: "2131",
        badProp: true,
        date: null
      },
    ],
    formated: [
      {
        date: 2000,
        id: "2333534534",
        note: /^Welcome$/i
      },
      "You passed wrong property, id must have string type. You passed wrong property, note must have string type.",
      "",
      "You passed wrong property, date must have number type.",
      {
        id: "string",
        note: "string",
        date: "number"
      },
      {
        id: "string",
        badProp: "boolean",
        date: "undefined"
      }
    ]
  }
} as const;
