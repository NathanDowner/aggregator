import AuthProvider from '../contexts/authContext';
import NotificationProvider from '../contexts/notificationContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { pageProps } }) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default MyApp;
