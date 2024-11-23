import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function CheckboxField(props) {
  const { field, className, children } = props;
  const { name, value } = field;

  return (
    <Checkbox
      className={`rounded-md border-gray-300 text-blue-600 shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${className}`}
      name={name}
      {...field}
      checked={value}
    >
      <span className="text-sm font-medium text-gray-700">{children}</span>
    </Checkbox>
  );
}

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.any,
};

export default CheckboxField;
