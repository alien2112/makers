import { get } from '../utils/api';

/**
 * Get all categories
 */
export const getCategories = async () => {
  try {
    const response = await get('/products/categories/list');

    if (response.success && response.data) {
      const categories = response.data.categories || response.data || [];
      return categories.map(category => ({
        id: category._id || category.id,
        _id: category._id || category.id,
        name: category.name,
        slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
        productCount: category.productCount || 0,
        image: category.image || '/api/placeholder/400/300',
        description: category.description,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug) => {
  try {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};
