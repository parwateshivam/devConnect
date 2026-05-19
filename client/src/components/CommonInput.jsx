import React from "react";

const CommonInput = ({
    placeholder,
    name,
    type = "text",
    value,
    onChange,
    required
}) => {
    return (
        <input
            className="form-control"
            placeholder={placeholder}
            name={name}
            type={type}
            value={type !== "file" ? value : undefined}
            onChange={onChange}
            required={required}
        />
    );
};

export default CommonInput;