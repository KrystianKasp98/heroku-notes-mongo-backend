const { app } = require("./app.js");
require("dotenv").config();

app.listen(process.env.PORT || 4000, function () {
  if (process.env.PORT !== undefined) {
    console.log(`App running on process.env.PORT     ${process.env.PORT}`);
  } else {
    console.log(`App running on PORT 4000`);
  }
});
