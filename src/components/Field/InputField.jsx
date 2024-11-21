import { Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function InputField({
  field,
  form,
  type = 'text',        
  placeholder = '',     
  size = 'large',       
  suffix = null,        
  className = '',       
  autocomplete = 'on',  
  autofocus = false,    
  maxLength = 1000,     
  ...rest
}) {
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  // Sử dụng Input hoặc Input.Password
  const InputOption = type === 'password' ? Input.Password : Input;

  return (
    <div className="mb-4">
      <InputOption
        className={`w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${className} ${
          showError ? 'border-red-500' : ''
        }`}
        name={name}
        {...field}
        {...rest}
        placeholder={placeholder}
        size={size}
        suffix={suffix}
        autoComplete={autocomplete}
        maxLength={maxLength}
        autoFocus={autofocus}
      />
      {showError && (
        <div className="mt-1 text-sm text-red-600">{errors[name]}</div>
      )}
    </div>
  );
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  suffix: PropTypes.object,
  autocomplete: PropTypes.string,
  autofocus: PropTypes.bool,
  maxLength: PropTypes.number,
};

export default InputField;
