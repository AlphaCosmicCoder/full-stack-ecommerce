import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Headers = () => {
    const { carts } = useSelector((state) => state.allCart);


    return (
        <>
            <Navbar style={{ height: "60px", background: "black", color: "white" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-2">
                        <h3 className='text-light'>Ecommerce</h3>
                    </NavLink>
                    <NavLink to="/cart" className="text-decoration-none d-flex align-items-center text-light mx-2">
                        <div id='ex4'>
                            <span className='p1 fa-stack fa-2x has-badge' data-count={carts.length}>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </span>
                        </div>
                        <Link to={'/logout'} className='btn-danger p-1 rounded' >Logout</Link>
                    </NavLink>
                </Container>
            </Navbar>
        </>
    )
}

export default Headers