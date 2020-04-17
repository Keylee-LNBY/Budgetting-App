// requires node express to create a server router
const router = require("express").Router();
//imports the Transaction model from the models folder
const Transaction = require("../models/transaction.js");

//Create a POST route on the server that creates a Transaction from the {body object}, and response
router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//Creates a POST route on the server that creates a Transaction for multiple entries "bulk"
router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});


//Creates a GET route to get the information that has been POSTed to the MongoDB
router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//Exports the router so that we have access to these POST & GET routes
module.exports = router;