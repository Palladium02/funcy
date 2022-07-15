const { Ok, Err, Some, None } = require("../build");

function getIndex(values, value) {
  const index = values.indexOf(value);
  switch (index) {
    case -1:
      return Err("Value not found.");
    default:
      return Ok(index);
  }
}

let res = getIndex(["a", "b", "c", "d"], "z");
console.log(
  res.match({
    ok: (val) => Some(val),
    err: () => None,
  })
);