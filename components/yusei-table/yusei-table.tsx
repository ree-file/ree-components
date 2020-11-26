import React from 'react';
import { usedTableProps } from './interface';
import Table from './rc-table';
import './style/index';

const defaultProps = {};

const YuseiTable: React.FC<usedTableProps> = (userProps) => {
  const props = { ...defaultProps, ...userProps };
  const columns = [
    {
      title: 'x1',
      dataIndex: 'x1',
      width: 100,
    },
    {
      title: 'x2',
      dataIndex: 'x2',
      width: 100,
    },
    {
      title: 'x2',
      dataIndex: 'x2',
      width: 100,
    },
    {
      title: 'x3',
      dataIndex: 'x3',
      width: 100,
    },
    {
      title: 'x4',
      dataIndex: 'x4',
      width: 100,
    },
  ];
  return <Table columns={columns} data={props.dataSource} rowKey="x1" />;
};

export default YuseiTable;
