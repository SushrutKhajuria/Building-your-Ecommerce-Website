import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const tours = [
    { date: 'JUL 16', place: 'DETROIT, MI', venue: 'DTE ENERGY MUSIC THEATRE' },
    { date: 'JUL 19', place: 'TORONTO, ON', venue: 'BUDWEISER STAGE' },
    { date: 'JUL 22', place: 'BRISTOW, VA', venue: 'JIGGY LUBE LIVE' },
    { date: 'JUL 29', place: 'PHOENIX, AZ', venue: 'AK-CHIN PAVILION' },
    { date: 'AUG 2', place: 'LAS VEGAS, NV', venue: 'T-MOBILE ARENA' },
    { date: 'AUG 7', place: 'CONCORD, CA', venue: 'CONCORD PAVILION' }
  ];

  return (
    <div className="home-page">
      <div className="hero-section text-center text-white">
        <Container>
          <h1 className="display-3 fw-bold mb-4">The Generics</h1>
          <Button 
            as={Link} 
            to="/store" 
            variant="outline-light" 
            size="lg"
            className="px-4"
          >
            Get Our Latest Album
          </Button>
        </Container>
      </div>

      <Container className="py-5 my-4">
        <h2 className="text-center mb-4">TOURS</h2>
        <div className="tours-table mx-auto">
          {tours.map((tour, index) => (
            <div key={index} className="tour-item d-flex justify-content-between py-3 border-bottom">
              <span className="fw-bold">{tour.date}</span>
              <span className="text-muted">{tour.place}</span>
              <span className="text-muted">{tour.venue}</span>
              <Button variant="primary" size="sm" disabled>BUY TICKETS</Button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;