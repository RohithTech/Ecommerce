import { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FlashSale, { TrendingProducts, BestSellers } from '../components/home/FlashSale';
import api from '../api/axios';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    api
      .get('/products')
      .then((res) => {
        if (isMounted) {
          setProducts(Array.isArray(res.data) ? res.data : []);
        }
      })
      .catch(() => {
        if (isMounted) setProducts([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts products={products} />
      <BestSellers products={products} />
      <FlashSale products={products} />
      {/* <Testimonials /> */}
    </>
  );
}
