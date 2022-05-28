import { AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import Head from 'next/head';
import React, { useContext } from 'react';
import useStyle from '../utils/styles';
import NextLink from 'next/link';
import { CssBaseline, Link, Switch } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeProvider } from 'styled-components';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layouts({ title, discription, children }) {
  const [state, dispatch] = useContext(Store);
  const darkMode = state;

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00e676',
      },
    },
  });

  const classes = useStyle();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARKMODE_OFF' : 'DARKMODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'NO' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} + - Amozon` : 'Amozon'}</title>
        {discription && <meta name="discription" content={discription}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Amozon</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>
                  <ShoppingCartIcon sx={{ mr: 1 }} />
                  Cart
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>
                  <LoginIcon sx={{ mr: 1 }} />
                  Login
                </Link>
              </NextLink>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights resolved. Amozon</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
