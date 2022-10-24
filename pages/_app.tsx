import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import '@/styles/global.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Layout from '@/components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.

interface MyAppProps extends AppProps {}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
