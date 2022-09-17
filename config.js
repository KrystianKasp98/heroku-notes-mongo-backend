module.exports = {
  message: {
    badRequest: "bad request",
    /**
     *
     * @param {string} name property name
     * @param {string} type correct property type, not passed
     * @returns
     */
    badProperty: (name, type) =>
      `You passed wrong property, ${name} must have ${type} type. `,
  },
  sortBy: {
    desc: -1,
    asc: 1,
  },
  mappedTypes: {
    id: "string",
    note: "string",
    date: "number",
    query: "object",
    options: "object",
  },
  method: {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
  },
  tests: [
    {
      _id: "6325ff55e79521788fd0f3d7",
      note: "welcome in my app",
      date: 1663434665905,
      edits: [],
    },
    {
      _id: "6326080a6b6db35867d0fb32",
      note: "Welcome",
      date: 222333,
      edits: [],
    },
    {
      note: "POST, PUT, DELETE",
      date: 222444333,
    },
    {
      note: "new note POST, PUT, DELETE",
      date: 222444334,
    },
  ],
};
