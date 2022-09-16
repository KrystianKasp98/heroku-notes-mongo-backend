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
      _id: "631fa7de7872b9c0321f974c",
      note: "test",
      date: 0,
      edits: [],
    },
    {
      _id: "631de6c7772f5d82fa9f6df8",
      note: "Welcome",
      date: 1662904049535,
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
