import React from 'react';

const TableItems = props => {
  const { data } = props;
  return (
    <>
      <td>{data.total_issues}</td>
      <td>{data.within24hrs}</td>
      <td>{data.within7days}</td>
      <td>{data.between24hrsTo7days}</td>
    </>
  );
};

const Table = props => (
  <table cellPadding="0" cellSpacing="0">
      <thead className="tbl-header">
        <tr>
          <th>Total issues</th>
          <th>Issues within 24hrs</th>
          <th>Issues within 7days</th>
          <th>Issues between 24hrs - 7days</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {props.data.map((item, key) => (
            <TableItems key={key} data={item} />
          ))}
        </tr>
      </tbody>
    </table>
);

export default Table;
