import { bannerRepository } from '../infrastructure/banner.repository';
import type { Banner } from '../domain/banner.types';

export async function getBanners(): Promise<Banner[]> {
  const response = await bannerRepository.findAll();

  //  Only return active banners, sorted by order
  return response.banners
    .filter((banner) => banner.active)
    .sort((a, b) => a.order - b.order);
}