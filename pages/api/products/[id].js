import nextConnect from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.connect();
    const produc = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(produc)
});

export default handler;