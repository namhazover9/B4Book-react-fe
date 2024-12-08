import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userApi from '../../hooks/userApi';
import { useNavigate } from 'react-router-dom';
const RegisterShop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append các dữ liệu văn bản vào formData
      formData.append("shopEmail", values.shopEmail);
      formData.append("shopName", values.shopName);
      formData.append("address", JSON.stringify(values.address)); // Nếu address là một object, bạn cần chuyển nó thành chuỗi JSON
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("description", values.description);
      
      // Append file images vào formData
      // Lưu ý rằng bạn cần chắc chắn rằng bạn đã chọn file và images là một mảng hoặc một file
      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append('images', file); // Đảm bảo rằng key đúng là 'images'
          console.log(file);
        });
      }

      // Append file documents vào formData
      if (values.documents && values.documents.length > 0) {
        values.documents.forEach((file) => {
          formData.append('documents', file); // Đảm bảo rằng key đúng là 'images'
          console.log(file);
        });
      }
      const response = await userApi.postRegisterShop(formData);
      alert('Shop registered successfully');
      console.log(response.data);
      navigate('/');
    } catch (err) {
      setError('Error registering shop: ' + err.message);
      console.error(err);
    }
    setLoading(false);
  };

  const validationSchema = Yup.object({
    shopEmail: Yup.string().email('Invalid email format').required('Email is required'),
    shopName: Yup.string().required('Shop name is required'),
    address: Yup.array()
      .of(
        Yup.object({
          street: Yup.string().required('Street is required'),
          city: Yup.string().required('City is required'),
          country: Yup.string().required('Country is required'),
        }),
      )
      .min(1, 'At least one address is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be only digits')
      .required('Phone number is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'At least one image is required').required('Images are required'),
    documents: Yup.array()
      .min(1, 'At least one document is required')
      .required('Documents are required'),
  });

  return (
    <div className='max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg'>
      <h2 className='text-3xl font-semibold text-center mb-6'>Register Shop</h2>
      <Formik
        initialValues={{
          shopEmail: '',
          shopName: '',
          address: [{ street: '', city: '', country: '', isDefault: false }],
          phoneNumber: '',
          description: '',
          documents: [],
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Shop Email</label>
              <Field
                type='email'
                name='shopEmail'
                placeholder='Enter your email'
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
              />
              <ErrorMessage name='shopEmail' component='div' className='text-red-500 text-sm' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Shop Name</label>
              <Field
                type='text'
                name='shopName'
                placeholder='Enter shop name'
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
              />
              <ErrorMessage name='shopName' component='div' className='text-red-500 text-sm' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Address</label>
              {values.address.map((address, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex space-x-4'>
                    <div>
                      <Field
                        name={`address[${index}].street`}
                        placeholder='Street'
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                      />
                      <ErrorMessage
                        name={`address[${index}].street`}
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                    <div>
                      <Field
                        name={`address[${index}].city`}
                        placeholder='City'
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                      />
                      <ErrorMessage
                        name={`address[${index}].city`}
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                    <div>
                      <Field
                        name={`address[${index}].country`}
                        placeholder='Country'
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                      />
                      <ErrorMessage
                        name={`address[${index}].country`}
                        component='div'
                        className='text-red-500 text-sm'
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type='button'
                onClick={() => {
                  const isValid = values.address.every(
                    (addr) => addr.street.trim() && addr.city.trim() && addr.country.trim(),
                  );
                  if (!isValid) {
                    alert('Please fill out all address fields before adding a new address.');
                    return;
                  }
                  setFieldValue('address', [
                    ...values.address,
                    { street: '', city: '', country: '', isDefault: false },
                  ]);
                }}
                className='mt-2 bg-green-500 text-white px-4 py-2 rounded'
              >
                Add Address
              </button>
            </div>

            <div>
              <Field
                name='phoneNumber'
                placeholder='Phone Number'
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
              />
              <ErrorMessage name='phoneNumber' component='div' className='text-red-500 text-sm' />
            </div>

            <div>
              <Field
                as='textarea'
                name='description'
                placeholder='Description'
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
              />
              <ErrorMessage name='description' component='div' className='text-red-500 text-sm' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Upload CV</label>
              <input
                type='file'
                name='documents'
                multiple
                onChange={(e) => setFieldValue('documents', Array.from(e.currentTarget.files))}
                className='mt-1'
              />
              <ErrorMessage name='documents' component='div' className='text-red-500 text-sm' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Upload Images</label>
              <input
                type='file'
                name='images'
                multiple
                onChange={(e) => setFieldValue('images', Array.from(e.currentTarget.files))}
                className='mt-1'
              />
              <ErrorMessage name='images' component='div' className='text-red-500 text-sm' />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              {loading ? 'Submitting...' : 'Register Shop'}
            </button>
            {error && <div className='text-red-500 mt-2'>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterShop;
