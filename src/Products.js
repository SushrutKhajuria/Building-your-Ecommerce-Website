
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
 const products = [
  {
   title: 'Album1',
   price: 12.99,
   imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
   title: 'Album 2',
   price: 14.99,
   imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
   title: 'Album 3',
   price: 9.99,
   imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
   title: 'Album 4',
   price: 19.99,
   imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
 ];
 return (
  <Container>
   <h1 style={{textAlign: 'center', marginTop: '20px'}}>The Generics</h1>
   <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Music</h2>
   <Row>
    {products.map((product, index) => (
     <Col key={index} md={3} sm={6} xs={12}>
      <Card style={{marginBottom: '20px'}}>
       <Card.Img variant="top" src={product.imageUrl} />
       <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
       </Card.Body>
      </Card>
     </Col>
    ))}
   </Row>
  </Container>
 );
};

export default Products;