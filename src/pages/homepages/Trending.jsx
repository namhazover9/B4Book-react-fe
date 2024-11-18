// eslint-disable-next-line no-unused-vars
import { Button, Carousel } from 'antd';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import pic1 from '../../assets/images/BestSelling/1.jpg';
import pic2 from '../../assets/images/BestSelling/4.jpg';
import pic3 from '../../assets/images/BestSelling/7.jpg';
import pic4 from '../../assets/images/BestSelling/9.jpg';
import pic5 from '../../assets/images/BestSelling/12.jpg';
import pic6 from '../../assets/images/BestSelling/13.jpg';
import pic7 from '../../assets/images/BestSelling/15.jpg';
import pic8 from '../../assets/images/BestSelling/16.jpg';
import pic9 from '../../assets/images/BestSelling/30.jpg';
import store1 from '../../assets/images/BestSelling/h6_banner4.jpg';

const BookShowcase = () => {
    const banner = {
        id: 1,
        sologan: " Why not send the gift of a book to family & friends.",
        title: "Books Make Great Gifts",
        detail: "20%",
        contact: "Shop Now",
    };
    const books = [
        {
            id: 1,
            title: 'Christmas Short',
            author: 'Warren Graham',
            price: '$741.23',
            rating: 4,
            image: pic1,
        },
        {
            id: 2,
            title: 'Heartland Stars',
            author: 'Ernesto Wade',
            price: '$664.55',
            rating: 5,
            image: pic2,
        },
        {
            id: 3,
            title: 'House of Sky',
            author: 'Ernesto Wade',
            price: '$72.99',
            rating: 4,
            image: pic3,
        },
        {
            id: 4,
            title: 'My Dearest Darkest',
            author: 'Enrique Wallace',
            price: '$914.53',
            rating: 3,
            image: pic4,
        },
        {
            id: 5,
            title: 'My Dearest Darkest',
            author: 'Enrique Wallace',
            price: '$94.53',
            rating: 3,
            image: pic5,
        },
        {
            id: 6,
            title: 'My Dearest Darkest',
            author: 'Enrique Wallace',
            price: '$114',
            rating: 3,
            image: pic6,
        },
        {
            id: 7,
            title: 'My Dearest Darkest',
            author: 'Enrique Wallace',
            price: '$53',
            rating: 3,
            image: pic7,
        },
        {
            id: 8,
            title: 'My Dearest Darkest',
            author: 'Enrique Wallace',
            price: '$53',
            rating: 3,
            image: pic8,
        },
        {
            id: 9,
            title: 'My Dearest Darkest',
            author: 'Enrique Wallace',
            price: '$53',
            rating: 3,
            image: pic9,
        },
    ];
    return (
        <div className="p-4 bg-white px-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Trending Now</h2>
                <div className="w-1/2 h-px bg-gray-300 my-2 shadow-md"></div>
                <button className="bg-red-400 text-white px-3 py-1.5 rounded-full text-sm hover:bg-red-500 transition-colors">
                    View All
                </button>
            </div>

            <div className="flex w-full max-w-6xl mx-auto p-4 gap-4">
                <div className="w-2/3 overflow-hidden">
                    <Carousel autoplay dots={false} slidesToShow={4} swipeToSlide autoplaySpeed={3000}>
                        {books.map((book) => (
                            <div key={book.id} className="w-1/4 p-2">
                                <div className="group relative">
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <img
                                            src={book.image}
                                            className="w-full h-60 object-cover transition-all ease-in-out duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute right-4 bottom-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                                                <button className="p-2 bg-white border-2 border-transparent rounded-full hover:bg-red-400 hover:border-white hover:text-white transition-colors transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 shadow-lg">
                                                    <Heart className="w-5 h-5 text-black-500" />
                                                </button>
                                                <button className="p-2 bg-white border-2 border-transparent rounded-full hover:bg-red-400 hover:border-white hover:text-white transition-colors transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-75 shadow-lg">
                                                    <Eye className="w-5 h-5 text-black-500" />
                                                </button>
                                                <button className="p-2 bg-white border-2 border-transparent rounded-full hover:bg-red-400 hover:border-white hover:text-white transition-colors transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-150 shadow-lg">
                                                    <ShoppingCart className="w-5 h-6 text-black-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <h3 className="text-lg font-semibold truncate hover:text-red-400">
                                            <button>{book.title}</button>
                                        </h3>
                                        <p className="text-gray-600 text-sm hover:text-red-600">
                                            <button>{book.author}</button>
                                        </p>
                                        <p className="text-red-500 font-bold mt-1">{book.price}</p>
                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-lg ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <span className="ml-1 text-gray-500 text-sm">5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="w-1/3">
                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                        <img src={store1} alt="Banner" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                            <div className="absolute inset-0 flex flex-col justify-start items-start text-white p-6">
                                <h2 className="text-3xl font-bold mt-7">{banner.title}</h2>
                                <div className="text-5xl font-bold mb-4">{banner.detail} Off</div>
                                <h3 className="text-lg mb-2">{banner.sologan}</h3>
                                <p className="text-xl text-white/80 hover:text-yellow-400 underline decoration-dotted">
                                    <button className="hover:underline">{banner.contact}</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookShowcase;
