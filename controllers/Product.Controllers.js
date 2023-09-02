
const { ProductS } = require("../models/Products.model");

const getProductbyId = async (req, res) => {
  const { _id } = req.params;
  const id = _id;
  try {
    const respuesta = await ProductS.findById(id);

    return res.status(200).json({
      message: "datos produstos",
      detail: respuesta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      detail: error,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const respuesta = await ProductS.find();

    return res.status(200).json({
      message: "datos produstos",
      detail: respuesta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      detail: error,
    });
  }
};

const getProductbyFilter = async (req, res) => {
  const { filter } = req.params;
  try {
    const respuesta = await ProductS.find({filter });

    return res.status(200).json({
      message: "datos produstos",
      detail: respuesta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error",
      detail: error,
    });
  }
};

module.exports = { getProductbyId, getProductbyFilter, getProduct };
