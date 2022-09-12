module.exports = {
  message: {
    badRequest: "bad request",
    /**
     *
     * @param {string} name property name
     * @param {string} type property type
     * @returns
     */
    badProperty: (name, type) =>
      `You passed wrong property, ${name} must have ${type} type`,
  },
  sortBy: {
    desc: -1,
    asc: 1,
  },
  test: [
    {
      _id: "631fa7de7872b9c0321f974c",
      note: "test",
      date: 0,
    },
    {
      _id: "631de6c7772f5d82fa9f6df8",
      note: "Welcome",
      date: 1662904049535,
    },
  ],
};
