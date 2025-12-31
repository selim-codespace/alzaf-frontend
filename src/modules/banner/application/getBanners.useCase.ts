import { bannerRepository } from '../infrastructure/banner.repository';
import type { Banner } from '../domain/banner.types';

export async function getBanners(): Promise<Banner[]> {
  const response = await bannerRepository.findAll();

  return response.banners
    .filter((banner) => banner.active)
    .sort((a, b) => a.order - b.order)
    .map((banner) => {
      let link = banner.link;


      if (link.startsWith('/products?')) {
        link = link.replace('/products?', '/?');
      } else if (link.startsWith('/category/')) {
        link = link.replace('/category/', '/?category=');
      }

      // Add scroll to products section
      if (!link.includes('#products')) {
        link = `${link}#products`;
      }

      return { ...banner, link };
    });
}
