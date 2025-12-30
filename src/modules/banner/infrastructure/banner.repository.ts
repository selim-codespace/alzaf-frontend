 
import { apiClient } from '@/src/shared/infrastructure/http/api-client';
import type { Banner } from '../domain/banner.types';

interface BannersResponse {
  banners: Banner[];
  total: number;
}

export const bannerRepository = {
  async findAll(): Promise<BannersResponse> {
    return apiClient.get<BannersResponse>('/banners');
  },
};