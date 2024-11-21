import { Radio } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

Radio.defaultProps = {
  options: [],
};

function RadioField(props) {
  const { field, form, className = '', options } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleOnChange = (data) => {
    const { value } = data.target;
    form.setFieldValue(name, value);
  };

  return (
    <div className="mb-4">
      <Radio.Group
        className={`flex flex-col space-y-2 ${className} ${
          showError ? 'border-red-500' : ''
        }`}
        name={name}
        value={value}
        onChange={handleOnChange}
      >
        {options &&
          options.map((option, index) => (
            <Radio
              key={index}
              value={option.value}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              {option.label}
            </Radio>
          ))}
      </Radio.Group>
      {showError && (
        <div className="mt-1 text-sm text-red-600">{errors[name]}</div>
      )}
    </div>
  );
}

RadioField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  options: PropTypes.array,
};

export default RadioField;
