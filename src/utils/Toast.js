import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const success = (message) => {
  toast.success(message);
};

export const failure = (message) => {
  toast.error(message);
};

export const info = (message) => {
  toast.info(message);
};

export const warning = (message) => {
  toast.warning(message);
};
