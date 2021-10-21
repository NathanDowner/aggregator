import AuthProvider from '../contexts/authContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { pageProps } }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
