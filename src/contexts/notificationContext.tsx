import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

type NotificationContextType = {
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType>(null);

const NotificationProvider = ({ children }) => {
  const notifySuccess = (message: string) => {
    toast.info(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };
  return (
    <NotificationContext.Provider value={{ notifyError, notifySuccess }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      'useNotification must be used inside of a NotificationProvider'
    );
  }
  return context;
};
