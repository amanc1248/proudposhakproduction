const asyncHandler = require("express-async-handler");
const { db } = require("../config/db.js");

//@desc get customer login Details
//@route post api/users/signin
//@access PRIVATE

const postUserLoginDetails = asyncHandler(async (req, res) => {
  const { email, firstName, lastName } = req.body;

  let checkIfExists = "SELECT * FROM CUSTOMER where customerId=?";

  let customerValueInsert = "INSERT INTO customer values(?,?,?);";
  let getCustomerValue = "SELECT * FROM CUSTOMER where customerId=?";
  let insertAndGet = customerValueInsert + getCustomerValue;

  db.query(checkIfExists, [email], (err, result) => {
    if (err) throw err;
    console.log("====================================");
    console.log(result);
    console.log("====================================");
    if (result.length !== 0) {
      res.json(result);
    } else {
      db.query(
        insertAndGet,
        [email, firstName, lastName, email],
        (err, result) => {
          if (err) throw err;
          if (result) {
            res.json(result[1]);
          }
        }
      );
    }
  });
});

module.exports = {
  postUserLoginDetails,
};
