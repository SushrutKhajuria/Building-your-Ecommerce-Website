import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Card } from 'react-bootstrap';

const productData = [
  {
    id: 1,
    title: 'Colors',
    price: 100,
    description: 'An amazing collection of colorful music albums.',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png'
    ],
    reviews: [
      { user: 'John Doe', comment: 'Loved the album! Very vibrant.' },
      { user: 'Jane Smith', comment: 'Amazing music. Great quality!' }
    ]
  },
  {
    id: 2,
    title: 'Black and White Colors',
    price: 50,
    description: 'Elegant black and white themed albums.',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png'
    ],
    reviews: [
      { user: 'Alice', comment: 'Very aesthetic and beautiful!' }
    ]
  },
  {
    id: 3,
    title: 'Yellow and Black Colors',
    price: 70,
    description: 'Bold and striking yellow-black albums.',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png'
    ],
    reviews: [
      { user: 'Bob', comment: 'Awesome beats and rhythm.' }
    ]
  },
  {
    id: 4,
    title: 'Blue Color',
    price: 100,
    description: 'Cool blue-themed musical albums.',
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png'
    ],
    reviews: [
      { user: 'Eve', comment: 'Very soothing music.' }
    ]
  }
];

const ProductPage = () => {
  const { productId } = useParams();
  const product = productData.find(item => item.id === parseInt(productId));

  if (!product) {
    return <Container className="text-center my-5"><h2>Product not found</h2></Container>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          {/* Zoomable Main Image */}
          <Image 
            src={product.images[0]} 
            alt={product.title}
            fluid
            style={{ cursor: 'zoom-in', maxHeight: '500px', objectFit: 'cover' }}
          />
          {/* Other images */}
          <div className="d-flex mt-3">
            {product.images.map((img, idx) => (
              <Image 
                key={idx} 
                src={img} 
                alt={`product-img-${idx}`}
                width="100"
                height="100"
                className="me-2 border"
                style={{ objectFit: 'cover' }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-success">${product.price}</h4>
          <p className="mt-3">{product.description}</p>

          <Card className="mt-4">
            <Card.Header>Reviews</Card.Header>
            <ListGroup variant="flush">
              {product.reviews.map((review, index) => (
                <ListGroup.Item key={index}>
                  <strong>{review.user}:</strong> {review.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
