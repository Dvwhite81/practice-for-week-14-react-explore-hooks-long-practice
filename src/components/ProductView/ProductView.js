import React, { useState, useEffect } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";

function ProductView({ products }) {
  // Get local storage - side panel
  const getSavedPanel = localStorage.getItem('sideOpen');
  const savedPanel = getSavedPanel === 'false' ? false: true;
  const [sideOpen, setSideOpen] = useState(savedPanel);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    if (selectedProduct) setSideOpen(true);
  }, [selectedProduct]);

  useEffect(() => {
    // Set local storage
    localStorage.setItem('sideOpen', sideOpen);
    if (!sideOpen) setSelectedProduct();
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={
                selectedProduct ? selectedProduct.id === item.id : false
              }
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div
            className="product-side-panel-toggle"
            onClick={() => setSideOpen(!sideOpen)}
          >
            {sideOpen ? ">" : "<"}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductView;
