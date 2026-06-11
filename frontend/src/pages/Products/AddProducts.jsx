import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import { categories } from '../../data/categories';
import api from '../../api/axios'
import showProductAddedAlert from '../../components/alert/product.js'

const initialForm = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  brand: '',
  slug: '',
  originalPrice: '',
  rating: '',
  reviewCount: '',
  colors: '',
  sizes: '',
  status: 'active',
  isTrending: 'false',
  isBestSeller: 'false',
  isFlashSale: 'false',
};

const token = localStorage.getItem('token'); 

function AddProducts() {
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if(file) setSelectedImage(file);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toList = (value) =>
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      rating: form.rating ? Number(form.rating) : 0,
      reviewCount: form.reviewCount ? Number(form.reviewCount) : 0,
      colors: toList(form.colors),
      sizes: toList(form.sizes),
      isTrending: form.isTrending === 'true',
      isBestSeller: form.isBestSeller === 'true',
      isFlashSale: form.isFlashSale === 'true',
      image: selectedImage,
      category: form.category || categories[0]?.id || '',
    };

    let formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (Array.isArray(productData[key])) {
        productData[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, productData[key]);
      }
    });
  //  formData = {...productData}
    try {       
        const res = await api.post('/products', formData, { headers:{"Content-Type": "multipart/form-data" }});
    } catch (error) {
        console.log(error.response);      
    }
    showProductAddedAlert(form.name)
    setForm(initialForm);
    setSelectedImage();
    navigate('/admin/products');
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase mb-2 tracking-[0.25em] text-indigo-500">Admin</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Product</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill in the product details below to create a new item for your store.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/products')}>
          Back to Products
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <Input
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Headphones"
          required
        />

        <Input
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="e.g. TechNova"
          required
        />

        <Input
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="e.g. wireless-headphones"
        />

        <Input
          label="Price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />

        <Input
          label="Stock"
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={handleChange}
          placeholder="0"
          required
        />

        <Input
          label="Original Price"
          name="originalPrice"
          type="number"
          min="0"
          step="0.01"
          value={form.originalPrice}
          onChange={handleChange}
          placeholder="0.00"
        />

        <Input
          label="Rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          placeholder="4.5"
        />

        <Input
          label="Review Count"
          name="reviewCount"
          type="number"
          min="0"
          value={form.reviewCount}
          onChange={handleChange}
          placeholder="0"
        />

        <Input
          label="Colors (comma separated)"
          name="colors"
          value={form.colors}
          onChange={handleChange}
          placeholder="Black, Silver"
        />

        <Input
          label="Sizes (comma separated)"
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
          placeholder="S, M, L"
        />

        <Select label="Category" name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select label="Status" name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>

        <Select label="Trending" name="isTrending" value={form.isTrending} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <Select label="Best Seller" name="isBestSeller" value={form.isBestSeller} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <Select label="Flash Sale" name="isFlashSale" value={form.isFlashSale} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <div className="md:col-span-2">
          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter a short product description"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            required
            onChange={handleImageChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:file:bg-slate-800 dark:file:text-indigo-300 dark:hover:file:bg-slate-700"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Select one or more image files from your computer for the product gallery.
          </p>

          {selectedImage && (
            <div className="mt-4 flex flex-wrap gap-3">
                <div  className="rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800"
                >
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt={selectedImage.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <p className="mt-2 max-w-20 truncate text-xs text-slate-600 dark:text-slate-300">
                    {selectedImage.name}
                  </p>
                </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;