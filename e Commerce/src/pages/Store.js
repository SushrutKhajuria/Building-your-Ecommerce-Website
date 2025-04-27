import { Link } from 'react-router-dom';

function Store() {
  const products = [
    {
      id: 1,
      name: "Cool Shirt",
      images: ["/img1.jpg", "/img2.jpg"],
      reviews: ["Great shirt!", "Loved the material."]
    },
    {
      id: 2,
      name: "Stylish Jeans",
      images: ["/jeans1.jpg", "/jeans2.jpg"],
      reviews: ["Fits well!", "Good quality."]
    },
  ];

  return (
    <div className="store">
      {products.map((product) => (
        <div key={product.id} className="product-card">

          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
            <img src={product.images[0]} alt={product.name} width="200" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Store;
