import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function HomePage() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    const getProducts = () => {
        try {
            fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(productData => {
                setProducts(productData);
              },
              (error) => {
                console.log('error', error);
              }
            );
        } catch(err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    const setOrderedProduct = (evt) => {
        let productId = evt.target.value;
        let selectedProduct = products.filter(product => product.productId === productId);
        setProduct(selectedProduct);
    }

    const orderProduct = () => {
        fetch('http://localhost:8080/product', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
      });
    }

    return (
        <Container>
             <Row className="px-4 my-5">
                <Col sm={5}>
                    <h1 className="font-weight-light">Products App</h1>
                    <hr />

                    <section className="mt-4">
                        <h2>Shipping Information</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="" />
                            </Form.Group>

                            <h2>Products</h2>
                            <section onChange={setOrderedProduct}>
                            {
                                products.map((product, indx) => {
                                    return (
                                        <Col className="px-2 my-2" key={indx}>
                                            <p>
                                                <input
                                                    type="radio"
                                                    name="productSelect"
                                                    value={product.productId}
                                                    id={product.productId}
                                                />
                                                <label htmlFor={product.productId}>&nbsp;<b>{product.name}</b></label>
                                                <br />{product.description}
                                                <br />${product.price}
                                            </p>
                                        </Col>
                                    )
                                })
                            }
                            </section>

                            <hr />
                            <Button variant="primary" type="button" onClick={orderProduct}>Submit Order &gt;&gt;</Button>&nbsp;                        
                        </Form>
                    </section>
                </Col>
             </Row>
        </Container>
    )
}

export default HomePage;