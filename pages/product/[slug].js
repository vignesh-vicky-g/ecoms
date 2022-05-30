import React, { useContext } from 'react';
import Layouts from '../../components/Layouts';
import NextLink from 'next/link';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import useStyle from '../../utils/styles';
import Image from 'next/image';
import { Rating } from '@mui/material';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { dispatch } = useContext(Store);
  const { product } = props;

  const classes = useStyle();
  if (!product) {
    return <h1>Page is Not Found</h1>;
  }

  const AddToCartHandlar = async () => {
    const { data } = await axios(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('Sorry, Product is out of stork');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
  };
  return (
    <Layouts title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Button variant="outlined">Go to back page</Button>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={560}
            height={560}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography variant="h4">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category : {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand : {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating :{' '}
                <Rating
                  name="half-rating"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                />{' '}
                ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description : {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      color={product.countInStock > 0 ? 'primary' : 'secondary'}
                    >
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={AddToCartHandlar}
                >
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
