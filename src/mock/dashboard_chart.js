function chart(method) {
  let res;
  switch (method) {
    case "GET":
      res = [30, 40, 78, 10, 30, 48];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
