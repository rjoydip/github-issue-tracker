import React from "react";

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
        <td>{props.data.totalIssues}</td>
        <td>{props.data.less7Days}</td>
        <td>{props.data.less24Hrs}</td>
        <td>{props.data.more24HrsLess7Days}</td>
      </tr>
      <tr>
        <td colSpan={4}>
          <b>Note:</b> <i>Counts are shown based on open issues</i>
        </td>
      </tr>
    </tbody>
  </table>
);

export default Table;
