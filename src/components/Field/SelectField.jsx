import { Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

SelectField.defaultProps = {
  placeholder: '',
  size: 'large',
  options: [],
};

function SelectField(props) {
  const { field, form, className = '', placeholder, options, size } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  // Override event onChange
  const handleOnChange = (value) => {
    const changeEvent = {
      target: {
        name,
        value,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <div className="mb-4">
      <Select
        name={name}
        {...field}
        className={`w-full rounded-lg ${
          showError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        } ${className}`}
        placeholder={placeholder}
        size={size}
        onChange={handleOnChange}
      >
        {options &&
          options.map((option, index) => (
            <Select.Option key={index} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
      </Select>
      {showError && (
        <div className="mt-1 text-sm text-red-600">{errors[name]}</div>
      )}
    </div>
  );
}

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  size: PropTypes.string,
};

export default SelectField;
