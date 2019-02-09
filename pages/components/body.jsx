import { useForm, useField } from "react-final-form-hooks";
import Table from "./table";

const data = [];

const onSubmit = async values => {
  // window.alert(JSON.stringify(values, 0, 2));
  const API_BASE_URL = `${window.location.origin}/api`
  
  const response = await fetch(`${API_BASE_URL}/tracker`, {
    method: 'POST',
    body: JSON.stringify({
      url: values.search
    }, 0, 2),
    headers: {
      'content-type': 'application/json'
    },
  });
  const data = await response.json();
  console.log(data);
};

const validate = values => {
  const errors = {};
  if (!values.search) {
    errors.search = "Required";
  }
  return errors;
};

const Body = ({}) => {
  const { form, handleSubmit, values, pristine, submitting } = useForm({
    onSubmit,
    validate
  });
  const search = useField("search", form);

  return (
    <>
      <form className="light" onSubmit={handleSubmit}>
        <div>
          <input
            type="url"
            className="inp"
            {...search.input}
            placeholder="Enter github repo link"
          />
        </div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <div className="error">
          {search.meta.touched && search.meta.error && (
            <span>{search.meta.error}</span>
          )}
        </div>
        <pre>{JSON.stringify(values, undefined, 2)}</pre>
      </form>

      {(data && data.length) ? <Table data={data} /> : null}
    </>
  );
};

export default Body;
