import '../styles/globals.css';
import { Provider as AuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AuthProvider session={session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
