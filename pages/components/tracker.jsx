import { useState } from "react";
import { useForm } from "form-hooks";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

import Table from "./table";
import utils from "../utils";

const Tracker = ({}) => {
  const defaultValue = {
    less7Days: 0,
    less24Hrs: 0,
    more24HrsLess7Days: 0,
    totalIssues: 0
  };
  const [tableData, setTableData] = useState(defaultValue); // table data hook
  const [showLoader, setLoader] = useState(false); // loader hook
  const [errorMsg, setErrorMsg] = useState({ show: false, msg: "" }); // error hook
  const {
    errors,
    touched,
    values,
    handleSubmit,
    handleChange,
    isSubmitting
  } = useForm({
    initialValues: { url: "" },
    onSubmit: async ({ url }) => {
      setErrorMsg({
        show: false,
        msg: ''
      });
      if (utils.isEmpty(url)) {
        setErrorMsg({ show: true, msg: "Url can't be empty" });
        return;
      }
      setLoader(true);
      try {
        const response = await fetch(`${window.location.origin}/api/tracker`, {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            "content-type": "application/json"
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        } else {
          if (Object.keys(data.result).length) {
            setTableData(data.result);
          } else {
            setTableData(defaultValue);
            setErrorMsg({ show: true, msg: "No data found" });
          }
          setLoader(false);
        }
      } catch (error) {
        values.url = '';
        setTableData(defaultValue);
        setLoader(false);
        setErrorMsg({
          show: true,
          msg: (error && error.message) || "Something went wrong"
        });
      }
    },
    validate: values => ({
      ...(!values.url === "" ? { name: "Requires a url" } : {}) // right now not working it's an issue of the module
    })
  });

  return (
    <>
      <form
        action="javascript:void(0);"
        className="light"
        onSubmit={handleSubmit}
      >
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
      <div>
        <div className="loader-container">
          <ScaleLoader
            style={css`
              display: block;
              margin: 0 auto;
              border-color: red;
            `}
            sizeUnit={"px"}
            size={150}
            color={"#0CACE8"}
            loading={showLoader}
          />
        </div>
        <div className="error" style={{ textAlign: "center" }}>
          {errorMsg.msg}
        </div>
      </div>
      <Table data={tableData} />
    </>
  );
};

export default Tracker;
