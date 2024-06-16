import React, { useState } from 'react';
import Headers from './Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleStockChange = (e) => setStock(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productName, description, price, category, stock, image)
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('image', image);
    formData.append('isAdmin', localStorage.getItem('admin'));

    const token = localStorage.getItem('auth');

    try {
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'x-auth-token': token
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Product added:', data);
        toast.success("Product added successfull!!")
        // Reset form fields
        setProductName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setStock(0);
        setImage(null);
      } else {
        toast.error("Error adding product!!")
        console.error('Error adding product:', data);
      }
    } catch (err) {
      toast.error("Internal Server Error!!")
      console.error('Error:', err);
    }
  };


  return (
    <>
      <Headers />
      <div className="container mt-5">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              value={stock}
              onChange={handleStockChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default AddProductForm;
