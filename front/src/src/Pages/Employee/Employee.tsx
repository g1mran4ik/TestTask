import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, DatePicker, Descriptions, Empty, Progress, Space, Tooltip } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import { EmployeeGET, monthPlan, MESSENGER_TO_ICON_MAP } from '../interface';
import './Employee.css';
import { getEmployeeById, getStatsByMonth } from '../http';
import { computeStyle } from '../../constants/computedstyles';

import './Employee.css';

export default function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeGET | undefined>();

  const [fetchEmployee] = useFetching({
    fetch: async (id: number) => await getEmployeeById(id),
    afterFetch: (employee: EmployeeGET) => setEmployee(employee),
  });

  useEffect(() => {
    id && fetchEmployee(parseInt(id));
  }, [])


  const humanExp = (months: number) => {
    const years = parseInt((months / 12).toString());
    if (months < 12) {
      return `${months} мес.`;
    } else if ((years % 100 < 20 && years % 100 > 9) || years % 10 >= 5) {
      return `${years} лет ${months % 12} мес.`;
    } else {
      return `${years} г. ${months % 12} мес.`;
    }
  };

  const [plan, setPlan] = useState<monthPlan | undefined>();

  const [fetchPlan] = useFetching({
    fetch: async (id: number, dateString: string) => await getStatsByMonth(id, dateString),
    afterFetch: (plan: monthPlan) => setPlan(plan),
  });

  const nowDate = dayjs();

  const nowDateString = `${nowDate.year()}-${[11, 10].includes(nowDate.month()) ? '' : '0'}${nowDate.month() + 1}`;

  useEffect(() => {
    id && fetchEmployee(parseInt(id));
    id &&
      fetchPlan(
        parseInt(id),
        `${[11, 10].includes(nowDate.month()) ? '' : '0'}${nowDate.month() + 1}/${nowDate.year()}`
      );
  }, [id]);

  useEffect(() => {
    plan && console.log(plan.date);
  }, [plan])

  return employee ? (
    <Space align='start' className='cards-block'>
      <Card className='employee-card'
        title={
          <div className='employee-header'>
            <div className='header-text'>
              <h3 className='employee-name'>{`${employee.last_name.toUpperCase()} ${employee.first_name
                } ${employee.surname}`}</h3>
              <span className='employee-role'>
                {employee.role}
              </span>
            </div>
            <Tooltip title='Показатель эффективности за весь период работы'>
              <span style={computeStyle(employee.rating)}>{employee.rating}</span>
            </Tooltip>
          </div>
        }
      >
        <Descriptions column={1} bordered labelStyle={{ width: '30%' }}>
          <Descriptions.Item label='Формат работы'>
            {employee.job_format}
          </Descriptions.Item>
          <Descriptions.Item label='Телефон'>
            <div className='phone-block'>
              <span className='employee-phone'>{employee.phone} </span>
              {employee.messengers.map((key: string) => (
                <img className='phone-icons-block'
                  key={key}
                  height={14}
                  width={14}
                  src={MESSENGER_TO_ICON_MAP[key]}
                  alt='...'
                />
              ))}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label='Email'>{employee.email}</Descriptions.Item>
          <Descriptions.Item label='Город'>{employee.city}</Descriptions.Item>
          <Descriptions.Item label='Возраст'>{employee.age}</Descriptions.Item>
          <Descriptions.Item label='В этой должности'>
            {humanExp(employee.experience)}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                Эффективность{' '}
                <Tooltip title='Процент эффективных месяцев из общего числа месяцев работы'>
                  <QuestionCircleOutlined />
                </Tooltip>
              </>
            }
          >
            <Progress
              width={40}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              type='line'
              percent={employee.month_efficiency}
            ></Progress>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card className='employee-card'
        title={
          <div className='employee-header stats'>
            <div>
              <span className='month-stats-header'>Показатели за месяц</span>
              <DatePicker
                defaultValue={dayjs()}
                locale={locale}
                picker='month'
                disabledDate={(date) => {
                  const dateMap = employee?.month_plans.map((str) => {
                    const innerDate = new Date(str);
                    return { m: innerDate.getMonth(), y: innerDate.getFullYear() };
                  });
                  const currentYear = dateMap?.find(({ y }) => y === date.year());
                  if (
                    currentYear &&
                    dateMap
                      ?.filter(({ y }) => y === currentYear.y)
                      .some(({ m }) => m === date.month())
                  )
                    return false;
                  return true;
                }}
                onChange={(e) => {
                  e &&
                    fetchPlan(
                      employee?.id,
                      `${[11, 10].includes(e.month()) ? '' : '0'}${e.month() + 1
                      }/${e.year()}`
                    );
                }}
              />
            </div>
            {plan?.date.slice(0, 7) === nowDateString ? <Tooltip title='Оценка за текущий месяц. Не учитывается в общем показателе эффективности'>
              <span style={computeStyle(plan?.rating, true)}>
                {plan?.rating}
              </span>
            </Tooltip> : <span style={computeStyle(plan?.rating)}>
              {plan?.rating}
            </span>}
          </div>
        }
      >
        <div className='month-stats-plans'>
          {employee &&
            plan?.plans.map(({ id, task, goal, result }) => (
              <div key={id} className='plans-task'>
                <p>{task}</p>
                <Progress
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={(100 * result) / goal}
                  format={() => `${result}/${goal}`}
                ></Progress>
              </div>
            ))}
        </div>
      </Card>
    </Space>
  ) : (
    <Empty description='Нет данных' />
  );
}
