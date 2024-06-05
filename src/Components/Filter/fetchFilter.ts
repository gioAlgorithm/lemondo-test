import axios from 'axios';

const FILTER_API_URL = 'https://zoommer-api.lemon.do/v1/Content/filter?catId=21&specifications';

export interface FilterValue {
  id: number;
  value: string;
}

export interface FilterSpecification {
  name: string;
  values: FilterValue[];
}

export interface Filter {
  specifications: FilterSpecification[];
  minPrice: number;
  maxPrice: number;
  httpStatusCode: number;
  userMessage: string | null;
  developerMessage: string | null;
  success: boolean;
  errors: any[];
}

export async function fetchFilter(): Promise<Filter> {
  try {
    const response = await axios.get<Filter>(FILTER_API_URL );
    return response.data;
  } catch (error) {
    console.error('Error fetching filter data:', error);
    throw error;
  }
}