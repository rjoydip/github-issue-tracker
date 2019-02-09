import { useState } from "react";
import { useForm } from "form-hooks";
import { css } from '@emotion/core';
import { ScaleLoader } from 'react-spinners';

import Table from './table';
import utils from '../utils';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Tracker = ({}) => {
  const [tableData, setTableData] = useState({
    less7Days: 0,
    less24Hrs: 0,
    more24HrsLess7Days: 0,
    totalIssues: 0
  });
  const [showLoader, setLoader] = useState(false);

  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    isSubmitting
  } = useForm({
    initialValues: {
      url: ""
    },
    onSubmit: async ({ url }) => {
      if (utils.isEmpty(url)) {
        return;
      }

      const API_BASE_URL = `${window.location.origin}/api`;
      setLoader(true);
      try {
        const response = await fetch(`${API_BASE_URL}/tracker`, {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            "content-type": "application/json"
          }
        });
        const data = await response.json();
        if (Object.keys(data.result).length) {
          setTableData(data.result);
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error(
          "here",
          (error && error.message) || "Something went wrong"
        );
      }
    },
    validate: values => ({
      ...(!values.url === "" ? { name: "Requires a url" } : {})
    })
  });

  return (
    <>
      <form action="javascript:void(0);" className="light" onSubmit={handleSubmit}>
        <div>
          <input
            type="url"
            name="url"
            className="inp"
            value={values.url}
            onChange={handleChange}
            placeholder="Enter github repo link"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <div className="error">{touched["url"] && errors["url"]}</div>
        <div className='loader-container'>
        <ScaleLoader
          style={override}
          sizeUnit={"px"}
          size={150}
          color={'#0CACE8'}
          loading={showLoader}
        />
      </div> 
      </form>
      <Table data={tableData}/>
    </>
  );
};

export default Tracker;
