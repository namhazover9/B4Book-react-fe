import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaLock } from 'react-icons/fa';

const ForbiddenPage = () => {
  useEffect(() => {
    document.title = '403 Forbidden - Access Denied';
  }, []);

  const navigationLinks = [
    { title: 'Return Home', icon: <FaHome className='mr-2' />, path: '/' },
    // { title: 'Popular Pages', icon: <FaCompass className='mr-2' />, path: '/popular' },
    // { title: 'Search Site', icon: <FaSearch className='mr-2' />, path: '/search' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center'
      >
        <div className='relative mb-8'>
          <img
            src='images.unsplash.com/photo-1624969862644-791f3dc98927'
            alt='Security Shield'
            className='w-48 h-48 mx-auto object-cover rounded-full shadow-lg'
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12 2L2 7v10c0 5 10 10 10 10s10-5 10-10V7L12 2z'/%3E%3C/svg%3E";
              e.target.className = 'w-48 h-48 mx-auto';
            }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          >
            <FaLock className='text-red-500 text-4xl' />
          </motion.div>
        </div>

        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className='text-4xl font-bold text-gray-800 mb-4'
          role='heading'
          aria-level='1'
        >
          403 Forbidden
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-gray-600 mb-8'
          role='alert'
        >
          Sorry, you don't have permission to access this page. Please verify your credentials or
          contact the system administrator for assistance.
        </motion.p>

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
          <p>Error Code: 403 | Access Denied</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
