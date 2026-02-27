import type { Product } from '~~/types'

export default class ProductRepository {
  private fetch: ReturnType<typeof $fetch.create>

  constructor(fetch: ReturnType<typeof $fetch.create>) {
    this.fetch = fetch
  }

  async getProducts(params?: { limit?: number; skip?: number; q?: string }) {
    const endpoint = params?.q ? '/products/search' : '/products'

    return await this.fetch<{ products: Product[]; total: number }>(endpoint, {
      query: params,
    })
  }

  async getProductById(id: string | number) {
    return await this.fetch<Product>(`/products/${id}`)
  }

  async createProduct(product: Partial<Product>) {
    return await this.fetch<Product>('/products/add', {
      method: 'POST',
      body: product,
    })
  }

  async updateProduct(id: string | number, product: Partial<Product>) {
    return await this.fetch<Product>(`/products/${id}`, {
      method: 'PUT',
      body: product,
    })
  }

  async deleteProduct(id: string | number) {
    return await this.fetch(`/products/${id}`, {
      method: 'DELETE',
    })
  }
}
