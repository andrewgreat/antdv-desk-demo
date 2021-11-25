function form(method) {
  let res;
  switch (method) {
    case "POST":
      res = { message: "成功" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = form;
