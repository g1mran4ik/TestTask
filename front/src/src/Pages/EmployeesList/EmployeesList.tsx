import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import useFetching from '../../hooks/useFetching';
import { Link } from 'react-router-dom';
import { EmployeesLIST } from '../interface';
import { getAllEmployees } from '../http';
import { computeStyle } from '../../constants/computedstyles';

export default function EmployeesList() {
  const [employees, setEmployees] = useState<EmployeesLIST[] | undefined>();

  const [fetchEmployees] = useFetching({
    fetch: async () => await getAllEmployees(),
    afterFetch: (employees: EmployeesLIST[]) => setEmployees(employees),
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const columns: ColumnsType<EmployeesLIST> = [
    {
      key: 'name',
      title: 'Ф.И.О',
      render: ({ id, first_name, last_name, surname }) => (
        <Link to={`/employees/${id}`}>
          {last_name.toUpperCase()} {first_name} {surname}
        </Link>
      ),
    },
    {
      dataIndex: 'role',
      title: 'Должность',
      render: (role: string) => <span>{role}</span>,
    },
    {
      dataIndex: 'rating',
      title: 'Оценка',
      render: (rating) => (
        <span style={computeStyle(rating)}>{rating}</span>
      )
    },
  ];

  return <Table rowKey={'id'} dataSource={employees} columns={columns} />;
}
