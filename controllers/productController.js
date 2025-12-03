const products = ["product 1", "product 2"];

const getProducts = (req, res) => {
  try {
    res.status(200).json({ message: "success", payload: products });
  } catch (err) {
    res.status(500).json({ message: "Oops! something went wrong" });
  }
};

const getProduct = (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: "success", payload: products[id] });
  } catch (err) {
    res.status(500).json({ message: "Oops! something went wrong" });
  }
};

module.exports = { getProduct, getProducts };
