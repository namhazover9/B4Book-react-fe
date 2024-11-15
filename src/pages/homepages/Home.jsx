import React from 'react'
import Card from '@components/Card'
import { useLocalization } from '../../context/LocalizationWrapper';
import { Select } from 'antd'
import DiscountBanners from './DiscountBanner';
import TopVendor from './Topvendor'
import Bestseller from './BestSelling'
import Test from './test'
import Trending from './Trending'


export default function Home() {


    return (
        <div className='flex flex-col gap-y-4' >
            <Test />
            <DiscountBanners />
            <TopVendor />
            <Bestseller />
            <Trending />
        </div>
    )
}
