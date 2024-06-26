import axios from "axios";

const API_URL = "https://zoommer-api.lemon.do/v1/Products/v3?CategoryId=21";

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

export const fetchProducts = async (
  page: number,
  limit = 12,
  sortBy?: string | null,
  specificationIds?: string[],
  minPrice?: number,
  maxPrice?: number
): Promise<Product[]> => {
  try {
    let url = `${API_URL}&Page=${page}&Limit=${limit}`;
    if (sortBy) {
      url += `&SortBy=${sortBy}`;
    }
    if (specificationIds && specificationIds.length > 0) {
      url += `&SpecificationIds=${specificationIds.join(",")}`;
    }
    if (minPrice !== undefined) {
      url += `&MinPrice=${minPrice}`; 
    }
    if (maxPrice !== undefined) {
      url += `&MaxPrice=${maxPrice}`; 
    }
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data.products;
    } else {
      throw new Error(`Failed to fetch products (status: ${response.status})`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
