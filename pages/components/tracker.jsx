import { useState } from "react";
import { useForm } from "form-hooks";

import Table from './table';

const Tracker = ({}) => {
  const [tableData, setTableData] = useState({
    less7Days: 0,
    less24Hrs: 0,
    more24HrsLess7Days: 0,
    totalIssues: 0
  });
  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    isSubmitting
  } = useForm({
    initialValues: {
      url: "" // "http://github.com/nodejs/node",
    },
    onSubmit: async ({ url }) => {
      const API_BASE_URL = `${window.location.origin}/api`;
      try {
        const response = await fetch(`${API_BASE_URL}/tracker`, {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            "content-type": "application/json"
          }
        });
        const data = await response.json();
        setTableData(data.result);
      } catch (error) {
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
      <form className="light" onSubmit={handleSubmit}>
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
      </form>
      <Table data={tableData}/>
    </>
  );
};

export default Tracker;
