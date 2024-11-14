import React from 'react';
import { Select } from 'antd';
import { languages } from '../constants/constants';
import Translate from '../components/Common/Translate';
import { useLocalization } from '../context/LocalizationWrapper';
export default function Layout({ children }) {

    const { switchLocale } = useLocalization();

    const handleChange = (value) => {
        switchLocale(value);
    };

    return (
        <div className='m-4 font-cairoRegular'>
            <header className='flex items-center justify-center gap-x-10 bg-DeepNightBlack text-Snow w-full h-14 rounded-xl'>
                <h1 className='text-xl text-Green font-semibold'>React - Vite - Starter</h1>
                <div className="flex items-center justify-center gap-y-4 flex-col mt-16">
                <h2 className='text-3xl text-white font-semibold'>
                    <Translate text='Localization Setup Integrated' />
                </h2>
                <Select
                    defaultValue={localStorage.getItem('locale') ?? 'en'}
                    className='h-16 w-20'
                    style={{
                        width: '200px'
                    }}
                    onChange={handleChange}
                    options={languages}
                />
            </div>
            </header>
            {children}
            {/* <footer></footer> */}
        </div>
    )
}
