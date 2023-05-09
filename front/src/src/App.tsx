import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import CustomLayout from './Components/CustomLayout';
import Employee from './Pages/Employee/Employee';
import EmployeesList from './Pages/EmployeesList/EmployeesList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/employees' element={<CustomLayout children={<Outlet />} />}>
          <Route path='' element={<EmployeesList />}></Route>
          <Route path=':id' element={<Employee />}></Route>
          <Route path='*' element={<Navigate to={'employees'} replace />} />
        </Route>
        <Route path='*' element={<Navigate to={'/employees'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
