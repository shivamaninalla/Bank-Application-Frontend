
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import UserDashboard from './components/userDashboard/UserDashboard';
import Error from './utils/error/Error'
import ViewCustomers from './components/adminDashboard/adminComponents/viewCustomers/ViewCustomers';
import ViewTransaction from './components/adminDashboard/adminComponents/viewTransactions/ViewTransaction';
import AddCustomer from './components/adminDashboard/adminComponents/addCustomer/AddCustomer'
import Success from './utils/success/Success';
import Register from './components/Register';
import ConfirmAccountCreation from "../src/components/adminDashboard/adminComponents/addBankAccount/ConfirmAccountCreation";
import ViewPassbook from '../src/components/userDashboard/userComponents/viewPassbook/ViewPassbook'
import PerformTransaction from '../src/components/userDashboard/userComponents/PerformTransaction/PerformTransaction'
import Deposit from './components/userDashboard/userComponents/Deposit/Deposit';
import Profile from './components/userDashboard/userComponents/Profile/Profile';

function App() {
  return (
    <>
    <Routes>
      
      <Route exact path='/?(.*)' element={<Login/>} />
      <Route exact path='/' element={<Login/>} />
      <Route exact path='/register' element={<Register/>} />
      <Route exact path='/error' element={<Error/>} />
      <Route path="/admin-dashboard/confirm-account-creation" element={<ConfirmAccountCreation />} />
      <Route exact path='/success' element={<Success/>} />
      <Route exact path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route exact path='/admin-dashboard/view-customers' element={<ViewCustomers/>}/>
      <Route exact path='/admin-dashboard/add-customer/:userId' element={<AddCustomer/>}/>
      <Route exact path='/admin-dashboard/view-transactions' element={<ViewTransaction/>}/>
      <Route exact path='/user-dashboard/:userId' element={<UserDashboard/>}/>
      <Route exact path="/user-dashboard/:userId/passbook/:accountNumber" element={<ViewPassbook/>}/>
      <Route exact path="/user-dashboard/:userId/perform-transaction" element={<PerformTransaction/>}/>
      <Route exact path="/user-dashboard/:userId/deposit-amount" element={<Deposit/>}/>
      <Route exact path="/user-dashboard/:userId/profile" element={<Profile/>}/>

    </Routes>
    </>
  );
}

export default App;
