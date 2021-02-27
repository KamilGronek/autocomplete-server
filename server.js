const express = require("express");
const app = express();
const cors = require("cors");
const request = require("request");
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

app.listen(port, function () {
  console.log("Listening!");
});

app.get("/api/nautocomplete/:value", function (req, res, next) {
  const { value } = req.params;
  if (isEmpty(value)) {
    res.status(200);
    res.json({
      fuzzy: [],
      autocomplete: [],
      did_you_mean: [],
    });
  } else {
    autocomplete(value, res);
  }
});

autocomplete = (value, res) => {
  let options = {
    method: "GET",
    url: `https://unsplash.com/nautocomplete/${value}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      res.status(500);
      res.json("Internal server error");
    } else {
      res.status(200);
      res.json(JSON.parse(body));
    }
  });
};

isEmpty = (value) => {
  return value.length === 0 || !value.trim();
};
