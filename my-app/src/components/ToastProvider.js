import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer autoClose={3000} position="top-right" />
      {children}
    </>
  );
};

export default ToastProvider;
