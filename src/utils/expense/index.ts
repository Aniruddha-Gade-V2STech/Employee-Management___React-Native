import {EmployeeExpenseType} from '../../screens/expense/types/type';

export const getPieChartData = (expenses: EmployeeExpenseType[]) => {
  const incoming = expenses
    ?.filter(e => e?.type === 'incoming')
    .reduce((acc, curr) => acc + curr?.amount, 0);

  const outgoing = expenses
    ?.filter(e => e?.type === 'outgoing')
    .reduce((acc, curr) => acc + curr?.amount, 0);

  return [
    {
      // name: 'Incoming',
      name: `₹`,
      amount: incoming,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 14,
    },
    {
      // name: 'Outgoing',
      name: `₹`,
      amount: outgoing,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 14,
    },
  ];
};
