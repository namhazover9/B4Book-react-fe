import React from 'react'
import Card from '@components/Card'
import { useLocalization } from '../../context/LocalizationWrapper';
import { Select } from 'antd'
import CategorySlider from './CategorySlider'

export default function Home() {


    return (
        <div className='flex flex-col gap-y-4' >

            <CategorySlider />

        </div>
    )
}
