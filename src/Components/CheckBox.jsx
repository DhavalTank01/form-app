import React from "react";

const CheckBox = ({ name, label, value, onChange, id }) => {
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        value={value}
        onChange={onChange}
        name={name}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
