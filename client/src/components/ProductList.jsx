import React, { useEffect, useState } from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Headers from './Headers';
import { IoIosAdd } from "react-icons/io";
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const productsData = await response.json();
            console.log(productsData)
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Handle error if needed
        }
    };

    // add to cart 
    const addToCartHandler = (product) => {
        console.log('=>', product)
        dispatch(addToCart(product));
        toast.success("Item added to your Cart");
    };

    return (
        <>
            <Headers />
            <section className='item_section mt-4 container'>
                {
                    localStorage.getItem('admin') === 'true' ?
                        <Link className='btn-danger p-2 rounded' to={'/add-product'}>
                            <IoIosAdd />
                            <span>Add</span>
                        </Link> : ''
                }
                <br />
                <br />
                <div className='row mt-2 d-flex justify-content-around align-items-center'>
                    {products.map((product, index) => (
                        <Card key={product._id} style={{ width: "22rem", border: "none" }} className='hover mb-4'>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to={`/product/${product._id}`}>
                                <Card.Img variant='top' className='cd' src={'http://localhost:4000/' + product.image} />
                            </Link>
                            <div className="card_body">
                                <div className="upper_data d-flex justify-content-between align-items-center">
                                    <h4 className='mt-2'>{product.name}</h4>
                                </div>

                                <div className="lower_data">
                                    <div className='d-flex justify-content-between'>
                                        <h4>{product.stock}</h4>
                                        <h4>₹ {product.price}</h4>
                                    </div>
                                    <h5>{product.description}</h5>
                                </div>

                                <div className="last_data d-flex justify-content-between align-items-center">
                                    <Button style={{ width: "100%", background: "#ff3054db", border: "none" }} variant='outline-light'
                                        className='mt-2 mb-2'
                                        onClick={() => addToCartHandler(product)}
                                    >Add TO Cart</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section >
        </>
    );
};

export default ProductList;
