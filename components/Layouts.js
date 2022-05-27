import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import React from 'react';
import useStyle from '../utils/styles';

export default function Layouts({ children }) {
    const classes = useStyle();
  return (
    <div>
      <Head>
        <title>Amozon</title>
      </Head>
      <AppBar position='static' className={classes.navbar}>
          <Toolbar>
              <Typography>Amozon</Typography>
          </Toolbar>
      </AppBar>
      <Container className={classes.main}>
          {children}
      </Container>
      <footer className={classes.footer}>
          <Typography>All rights resolved. Amozon</Typography>
      </footer>
    </div>
  );
}
