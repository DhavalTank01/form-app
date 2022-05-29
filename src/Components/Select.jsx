import React from "react";

const Select = ({
  value,
  id,
  name,
  label,
  helpText,
  error,
  onChange,
  option,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        defaultValue={value}
        className="form-select"
        aria-label="Default select example"
        id={id}
        onChange={onChange}
        name={name}
      >
        <option>select genre</option>
        {option.map((item, idx) => {
          return (
            <option value={item._id} key={idx}>
              {item.name}
            </option>
          );
        })}
      </select>
      {helpText && <div className="form-text">{helpText}</div>}
      {error && <div className="form-text text-danger">{error}</div>}
    </>
  );
};

export default Select;
