import nextConnect from 'next-connect';
import Product from '../../models/Product';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = nextConnect();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ Message: 'Seed page' });
});

export default handler;
