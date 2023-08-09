import { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/styles/global.scss';
import '../public/styles/root.scss';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
      </Head>

      <FluentProvider
        theme={webDarkTheme}
        style={{ width: '100%', height: '100%' }}
      >
        <div className="app">
          <Component {...pageProps} />
        </div>
      </FluentProvider>
    </>
  );
}

export default CustomApp;
