import {
  Badge,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
} from '@material-ui/core';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import React, { useContext } from 'react';
import useStyle from '../utils/styles';
import NextLink from 'next/link';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { createTheme } from '@material-ui/core/styles';

export default function Layouts({ title, children, description }) {
  const { state, dispatch } = useContext(Store);
  const {darkMode, cart} = state;
  const classes = useStyle();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARKMODE_ON' : 'DARKMODE_OFF' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: darkMode ? 'light' : 'dark',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Amazon` : 'Amazon'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Amazon</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                {cart.cartItems.length > 0 ? (
                  <Badge color='secondary' badgeContent={cart.cartItems.length}>Cart</Badge>
                ) : (
                  'Cart'
                )}
                {/* <Link>Cart</Link> */}
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All Right Resolved.Amazon</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
