import { useRouter } from 'next/router';
import React from 'react';
import Layouts from '../../components/Layouts';
import data from '../../utils/data';
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


export default function ProductScreen() {
  const classes = useStyle();
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <h1>Page is Not Found</h1>;
  }
  return (
    <Layouts title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Button variant="outlined">Go to back page</Button>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={560}
            height={560}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid md={3} xs={12}>
          <List>
          <ListItem>
              <Typography variant="h4">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Category : {product.category}
              </Typography>
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
        <Grid md={3} xs={12}>
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
                    <Typography color={product.countInStock > 0 ? 'primary' : 'secondary'}>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
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
