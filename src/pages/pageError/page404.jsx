import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { HomeOutlined } from '@ant-design/icons';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  const navigationLinks = [
    { title: 'Return Home', icon: <HomeOutlined className='mr-2' />, path: '/' },
    // { title: 'Popular Pages', icon: <FaCompass className='mr-2' />, path: '/popular' },
    // { title: 'Search Site', icon: <FaSearch className='mr-2' />, path: '/search' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 py-8'>
      <div className='max-w-4xl w-full text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='space-y-8'
        >
          <div className='relative'>
            <img
              src='images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800'
              alt='Illustration of a lost astronaut floating in space'
              className='mx-auto w-64 h-64 object-cover rounded-full shadow-2xl'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400?text=404+Image';
                e.target.alt = 'Fallback 404 illustration';
              }}
            />
          </div>

          <div className='space-y-4'>
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className='text-6xl md:text-7xl font-bold text-gray-900'
              role='heading'
              aria-level='1'
            >
              404
            </motion.h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-gray-700'>
              Oops! Page Not Found
            </h2>
            <p className='text-gray-600 max-w-md mx-auto'>
              The page you're looking for seems to have wandered off into the digital universe.
              Let's help you find your way back!
            </p>
          </div>

          <nav
            className='flex flex-col md:flex-row gap-4 justify-center items-center'
            role='navigation'
            aria-label='404 page navigation'
          >
            {navigationLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center px-6 py-3 bg-white text-gray-800 rounded-lg
                           shadow-md hover:shadow-lg transform transition-all duration-300
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                onClick={() => (window.location.href = link.path)}
              >
                {link.icon}
                <span>{link.title}</span>
              </motion.button>
            ))}
          </nav>

          <div className='mt-8 text-sm text-gray-500'>
            <p>Need assistance? Contact our support team</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
