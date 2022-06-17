import * as React from "react";
import { render } from "react-dom";
import "./styles.css";

const Form = () => {
  const fieldNumbers = [...Array(10).keys()];
  const [values, setValues] = React.useState(fieldNumbers.map(i => ""));
  const [errors, setErrors] = React.useState(fieldNumbers.map(i => ""));
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsBuild = values.map((value, i) =>
      value === "bad" ? "There is a problem!" : ""
    );
    setErrors(errorsBuild);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="fields">
        {fieldNumbers.map(i => (
          <Field
            i={i}
            value={values[i]}
            onValueChange={e => {
              values[i] = e.currentTarget.value;
              setValues([...values]);
            }}
            error={errors[i]}
          />
        ))}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

type FieldProps = {
  i: number;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};
const Field = ({ i, value, onValueChange, error }: FieldProps) => {
  const fieldRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (error && fieldRef.current) {
      // fieldRef.current.scrollIntoView();
      fieldRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);
  return (
    <div className="field" ref={fieldRef}>
      <label htmlFor={`field${i}`}>Field {i}</label>
      <input
        type="text"
        id={`field${i}`}
        value={value}
        onChange={onValueChange}
      />
      <span>{error}</span>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<Form />, rootElement);
