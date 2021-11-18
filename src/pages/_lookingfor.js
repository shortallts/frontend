import React from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
class Lookingfor extends React.Component {
    render() { 
        return (
        <div>
            <Card>
                            <Card.Header as="h5">Wishlist</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    Add To your Wishlist
                                </Card.Title>
                               <Form>
                               <Row>
                                   <Col>
                                    <Form.Group className="mb-3" controlId="wishlistAddName">
                                        <Form.Label>Card Name</Form.Label>
                                        <Form.Control type="string" placeholder="Enter card name" />
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>
                                   </Col>
                                   <Col>
                                    <Form.Group className="mb-3" controlId="wishlistAddQuantity">
                                        <Form.Label>Quantity Needed</Form.Label>
                                        <Form.Control type="number" placeholder="Quantity" />
                                    </Form.Group>
                                   </Col>
                                 
                                
                                </Row>                

                                <Card.Title>Rarity</Card.Title>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Common"
                                        name="Common"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Rare"
                                        name="Rare"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Super Rare"
                                        name="Super Rare"
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Ultra Rare"
                                        name="Ultra Rare"
                                        type={type}
                                        id={`inline-${type}-4`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Secret Rare"
                                        name="Secret Rare"
                                        type={type}
                                        id={`inline-${type}-5`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Ultimate Rare"
                                        name="Ultimate Rare"
                                        type={type}
                                        id={`inline-${type}-6`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Starfoil Rare"
                                        name="Starfoil Rare"
                                        type={type}
                                        id={`inline-${type}-7`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Gold Rare"
                                        name="Gold Rare"
                                        type={type}
                                        id={`inline-${type}-8`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Mosaic Rare"
                                        name="Mosaic Rare"
                                        type={type}
                                        id={`inline-${type}-9`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Prismatic Secret Rare"
                                        name="Prismatic Secret Rare"
                                        type={type}
                                        id={`inline-${type}-10`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Gold Secret Rare"
                                        name="Gold Secret Rare"
                                        type={type}
                                        id={`inline-${type}-11`}
                                    /> 
                                    <Form.Check
                                        inline
                                        label="Shatterfoil Rare"
                                        name="Shatterfoil Rare"
                                        type={type}
                                        id={`inline-${type}-12`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Premium Gold Rare"
                                        name="Premium Gold Rare"
                                        type={type}
                                        id={`inline-${type}-13`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Collector's Rare"
                                        name="Collector's Rare"
                                        type={type}
                                        id={`inline-${type}-14`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Parallel Rare"
                                        name="Parallel Rare"
                                        type={type}
                                        id={`inline-${type}-15`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Platinum Rare"
                                        name="Platinum Rare"
                                        type={type}
                                        id={`inline-${type}-16`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Ghost Rare"
                                        name="Ghost Rare"
                                        type={type}
                                        id={`inline-${type}-17`}
                                    />
                                    <Form.Check
                                        inline
                                        label="Starlight Rare"
                                        name="Starlight Rare"
                                        type={type}
                                        id={`inline-${type}-18`}
                                    />
                                     <Form.Check
                                        inline
                                        label="Secret Pharaoh's Rare"
                                        name="Secret Pharaoh's Rare"
                                        type={type}
                                        id={`inline-${type}-19`}
                                    />
                                     <Form.Check
                                        inline
                                        label="Ultra Pharaoh's Rare"
                                        name="Ultra Pharaoh's Rare"
                                        type={type}
                                        id={`inline-${type}-20`}
                                    />
                                     <Form.Check
                                        inline
                                        label="10000 Secret Rare"
                                        name="10000 Secret Rare"
                                        type={type}
                                        id={`inline-${type}-21`}
                                    />

                                    </div>
                                ))}
                                <Card.Title>Edition</Card.Title>
                                {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="1st Edition"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Unlimited"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />

                                </div>
                            ))}
                            <Card.Title>Acceptable Conditions</Card.Title>
                                {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Mint"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Near Mint"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    inline
                                    label="Lightly Played"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Moderately Played"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    inline
                                    label="Heavily Played"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Damaged"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />

                                </div>
                            ))}
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                </Form>
                            </Card.Body>
                        </Card>
        </div>
        )
    }
}
 
export default Lookingfor;