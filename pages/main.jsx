import getConfig from 'next/config';
// style impoort
import "./styles/index.css";

const { env } = getConfig();

console.log(env);

const TableItems = (props) => {
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

const Table = (props) => (
  <div className="tbl-content">
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
          {props.data.map((item, key) => <TableItems key={key} data={item}/>)}
        </tr>
      </tbody>
    </table>
  </div>
);

const Header = () => {
  const data = [{
    total_issues: 11,
    within24hrs: 7,
    within7days: 5,
    between24hrsTo7days: 2,
  }];
  return (
    <>
      <div className="header">
        <h1>Github issue tracker</h1>
      </div>
      <Body>
        <div className="container">
          <form method="post" className="light" action="javascript:void(0);">
            <input type="text" placeholder="Please enter a github repo link" />
            <input type="submit" value="Search" />
          </form>
          <div className="credit">
            All the issues are opend state.
          </div>
          <Table data={data}/>
        </div>
      </Body>
    </>
  );
};

const Body = props => <>{props.children}</>;

const Layout = () => (
  <>
    <Header />
    <Body />
  </>
);

export default () => <Layout />;
