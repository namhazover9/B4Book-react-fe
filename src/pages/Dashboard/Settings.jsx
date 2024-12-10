import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userApi from '../../hooks/userApi';
import { message } from 'antd';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalUserInfo, setOriginalUserInfo] = useState(null);
  const [saving, setSaving] = useState(false);

  const hasChanges = JSON.stringify(userInfo) !== JSON.stringify(originalUserInfo);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await userApi.getUserProfile();
        setOriginalUserInfo(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        message.error('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };


  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await userApi.updateUserProfile(userInfo);
      message.success('Profile updated successfully!');
      setOriginalUserInfo(userInfo); // Cập nhật trạng thái gốc sau khi lưu
    } catch (error) {
      console.error('Failed to update profile:', error);
      message.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
            </div>
            <div className="p-7">
              <form>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-black dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={userInfo?.userName || ''}
                      onChange={(e) => handleInputChange('userName', e.target.value)}
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={userInfo?.phoneNumber || ''}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label htmlFor="emailAddress" className="block text-sm font-medium text-black dark:text-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    value={userInfo?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={!hasChanges || saving}
                    className={`px-6 py-2 text-white rounded ${
                      saving ? 'bg-gray' : 'bg-primary hover:bg-primary-dark'
                    }`}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
            </div>
            <div className="p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src={userInfo?.avartar || 'https://res.cloudinary.com/dmyfiyug9/image/upload/v1733216067/user_olhgzp.png'}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
