import React from 'react'
import Card from '@components/Card'
import { useLocalization } from '../../context/LocalizationWrapper';
import { Select } from 'antd'
import { languages } from '../../constants/constants';
import Translate from '../../components/Common/Translate';

export default function Home() {
    const { switchLocale } = useLocalization();

    const handleChange = (value) => {
        switchLocale(value);
    };

    return (
        <div className='flex flex-col gap-y-4'>
            

   

        </div>
    )
}
