const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const authRouter = require("./auth.router");
function route(app) {
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/auth", authRouter);
}

module.exports = route;
