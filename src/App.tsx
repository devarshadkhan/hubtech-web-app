import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProductTable from './components/ProductTable';
import CompareProducts from './components/CompareProducts';
import type { Product } from './types';

function App() {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ProductTable
                compareProducts={compareProducts}
                setCompareProducts={setCompareProducts}
              />
            }
          />
          <Route
            path="/compare"
            element={
              <CompareProducts
                products={compareProducts}
                setProducts={setCompareProducts}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;