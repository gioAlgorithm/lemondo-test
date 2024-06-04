import axios from 'axios';

const API_URL = 'https://zoommer-api.lemon.do/v1/Products/v3?CategoryId=21&Page=1&Limit=60';

export interface Product {
  id: number;
  name: string;
  barCode: string;
  price: number;
  categoryId: number;
  parentCategoryName: string;
  categoryName: string;
  subCategoryId: number;
  imageUrl: string;
  shopId: number;
  route: string;
  brandName: string | null;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);

    if (response.status === 200) {
      return response.data.products; // Access the products array directly
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};