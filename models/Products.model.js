const mongoose = require("mongoose");

const schemaProducts = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  edad: {
    type: [Number],
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  imagenes: {
    principal: {
      type: String,
      required: true,
    },
    secundaria: {
      type: [String],
      required: false,
    },
  },
  sku: {
    type: Number,
    required: true,
  },
  filter: {
    type: String,
    required: true,
  },
});
const ProductS = mongoose.model("ProductS", schemaProducts);
module.exports = { ProductS };
