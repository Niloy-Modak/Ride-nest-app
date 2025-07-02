import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Discount = () => {
    const offers = [
        {
            title: "Get 15% off on weekend rent cars and enjoy",
            subtitle: "Book now and get this big offer!",
            image: "https://imagecdnsa.zigwheels.ae/large/gallery/exterior/2/1937/audi-a8-l-53658.jpg"
        },
        {
            title: "Free GPS with all luxury car rentals",
            subtitle: "Explore freely with our premium vehicles!",
            image: "https://static.overfuel.com/dealers/trust-auto/image/2020-ford-mustang-shelby-gt350-heritage-edition-3-1024x640.jpg"
        },
        {
            title: "Save 20% on your first booking",
            subtitle: "Sign up and get instant discount!",
            image: "https://d2v1gjawtegg5z.cloudfront.net/posts/preview_images/000/015/155/original/fordpickup.png?1717090124"
        },
        {
            title: "Long trip? Get 1 day free on 5-day rent",
            subtitle: "Perfect for family or road trips!",
            image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/bfa4cc91477621.5e32d3fdbb963.jpg"
        },
    ];

    return (
        <div className='bg-red-50 p-3 md:p-4 lg:p-8 rounded-2xl mb-16'>
            <h1 className='text-3xl text-center font-bold mb-6'>SPECIAL OFFER</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {offers.map((offer, index) => {
                    const ref = useRef(null);
                    const isInView = useInView(ref, { once: true, amount: 0.3 });

                    return (
                        <motion.div
                            key={index}
                            ref={ref}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative p-6 rounded-xl shadow-lg text-white h-48 flex flex-col justify-end overflow-hidden"
                            style={{
                                backgroundImage: `linear-gradient(0deg, rgb(16,16,16) -19.5%, rgba(16,16,16,0) 100%), url(${offer.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <h1 className="text-lg font-semibold mb-1 z-10">{offer.title}</h1>
                            <p className="text-sm text-gray-200 z-10">{offer.subtitle}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Discount;
