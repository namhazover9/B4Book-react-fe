import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

function DatePickerField(props) {
  const { field, form, className = '', placeholder, size = 'large' } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleOnChange = (date, dateString) => {
    form.setFieldValue(name, dateString);
  };

  useEffect(() => {
    if (field.value) {
      handleOnChange(new Date(field.value), field.value);
    }
    return () => {};
  }, [field.value]);

  return (
    <div className="mb-4">
      <DatePicker
        className={`w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${className} ${
          showError ? 'border-red-500' : ''
        }`}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        size={size}
      />
      {showError && (
        <div className="mt-1 text-sm text-red-600">{errors[name]}</div>
      )}
    </div>
  );
}

DatePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
};

export default DatePickerField;
