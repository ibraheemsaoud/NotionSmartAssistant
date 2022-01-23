import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { createClient, Provider } from "urql";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const graphqlCLient = createClient({
  url: "http://localhost:4001/graphql",
  fetchOptions: { credentials: "include" },
});

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider value={graphqlCLient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
