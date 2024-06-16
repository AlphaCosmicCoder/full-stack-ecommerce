import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Headers from './Headers'
import './ProductDetails.css'
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/features/cartSlice'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        // Define an async function to fetch data
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/${id}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setProduct(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductDetails()
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    const addToCartHandler = (product) => {
        console.log('=>', product)
        dispatch(addToCart(product));
        toast.success("Item added to your Cart");
    };

    const token = localStorage.getItem('auth');

    const handleProductDelete = (id) => {
        fetch(`http://localhost:4000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            // You can include a body if your server expects it for DELETE requests
            // body: JSON.stringify({ id: id }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle successful deletion here, if needed
                toast.success(`Product with id ${id} deleted successfully`);
                navigate('/');
            })
            .catch(error => {
                // Handle errors here
                toast.error('There has been a problem with your fetch operation');
            });
    }

    const handleProductEdit = () => {

    }

    return (
        <>
            <Headers />
            <div className="container product-container mt-2">
                <div className="row">
                    <div className="col-md-6">
                        <img src={'http://localhost:4000/' + product.image} alt={product.name} className="img-fluid product-image" />
                    </div>
                    <div className="col-md-6">
                        <div className="product-details">
                            <h1 className="product-name">{product.name}</h1>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">Price: ${product.price}</p>
                            {/* Add more fields as necessary */}

                            <div className="last_data d-flex justify-content-between align-items-center">
                                <Button style={{ width: "100%", background: "#ff3054db", border: "none" }} variant='outline-light'
                                    className='mt-2 mb-2'
                                    onClick={() => addToCartHandler(product)}
                                >Add TO Cart</Button>
                            </div>
                            <div className="last_data d-flex gap-1 justify-content-between align-items-center">
                                <Link to={`/product/edit/${product._id}`} style={{ width: "100%", background: "green", border: "none" }} variant='outline-light'
                                    className='mt-2 mb-2 btn-success p-2 rounded text-center'
                                    onClick={() => handleProductEdit(id)}
                                >Edit</Link>
                                <Button style={{ width: "100%", background: "#ff3054db", border: "none" }} variant='outline-light'
                                    className='mt-2 mb-2 p-2'
                                    onClick={() => handleProductDelete(product._id)}
                                >Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
