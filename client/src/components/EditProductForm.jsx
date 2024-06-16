import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const EditProductForm = () => {
    const { id } = useParams();
    
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: 0,
        image: null
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data); // Assuming data structure matches product state
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error("Error fetching product details!!");
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleProductNameChange = (e) => setProduct({ ...product, name: e.target.value });
    const handleDescriptionChange = (e) => setProduct({ ...product, description: e.target.value });
    const handlePriceChange = (e) => setProduct({ ...product, price: e.target.value });
    const handleCategoryChange = (e) => setProduct({ ...product, category: e.target.value });
    const handleStockChange = (e) => setProduct({ ...product, stock: e.target.value });
    const handleImageChange = (e) => setProduct({ ...product, image: e.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', product);
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('stock', product.stock);
        formData.append('image', product.image);
        formData.append('isAdmin', localStorage.getItem('admin'));

        const token = localStorage.getItem('auth');

        try {
            const response = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: 'PUT', // Use PUT method for update
                headers: {
                    'x-auth-token': token
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Product updated:', data);
                toast.success("Product updated successfully!!");
            } else {
                toast.error("Error updating product!!");
                console.error('Error updating product:', data);
            }
        } catch (err) {
            toast.error("Internal Server Error!!");
            console.error('Error:', err);
        }
    };

    return (
        <>
            <Headers />
            <div className="container mt-5">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={product.name}
                            onChange={handleProductNameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={product.description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            value={product.price}
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
                            value={product.category}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            value={product.stock}
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
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>
        </>
    );
};

export default EditProductForm;
