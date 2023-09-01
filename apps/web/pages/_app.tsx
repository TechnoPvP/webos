import { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/styles/global.scss';
import '../public/styles/root.scss';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import { FileSystemProvider } from '../lib/context/file-system/file-system.provider';

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
        <FileSystemProvider>
          <div className="app">
            <Component {...pageProps} />
          </div>
        </FileSystemProvider>
      </FluentProvider>
    </>
  );
}

export default CustomApp;
