import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";

const AddProducts = () => (
    <section>
        <Container>
            <Row>
                <Col lg="12">
                    <h4>Add Product</h4>
                    <Form>
                        <FormGroup className="form__group">
                            <span>Product Title</span>
                            <input type="text" placeholder="Item" />
                        </FormGroup>
                        <FormGroup className="form__group">
                            <span>Description</span>
                            <input type="text" placeholder="Description" />
                        </FormGroup>
                        <div>
                            <FormGroup className="form__group">
                                <span>Price</span>
                                <input type="number" placeholder="Price" />
                            </FormGroup>
                            <FormGroup className="form__group">
                                <span>Category</span>
                                <select>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Food">Food</option>
                                    <option value="Gadget">Gadget</option>
                                    <option value="Miscellaneous">Miscellaneous</option>
                                </select>
                            </FormGroup>
                        </div>
                        <FormGroup className="form__group">
                            <span>Product Image</span>
                            <input type="file" />
                        </FormGroup>
                        <div></div>
                    </Form>
                </Col>
            </Row>
        </Container>
    </section>
);

export default AddProducts;
