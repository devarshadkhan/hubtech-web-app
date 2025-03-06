// import React from 'react';
// import { Button, Card, Modal, Table } from 'antd';
// import { X } from 'lucide-react';
// import type { Product } from '../types';

// interface CompareProductsProps {
//   products: Product[];
//   setProducts: (products: Product[]) => void;
//   showModal: boolean;
//   setShowModal: (show: boolean) => void;
// }

// const CompareProducts: React.FC<CompareProductsProps> = ({
//   products,
//   setProducts,
//   showModal,
//   setShowModal,
// }) => {
//   const removeProduct = (productId: number) => {
//     setProducts(products.filter((p) => p.id !== productId));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Compare Products</h1>
//         <Button
//           type="primary"
//           onClick={() => setShowModal(true)}
//           disabled={products.length >= 4}
//         >
//           Add More Products
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <Card
//             key={product.id}
//             cover={
//               <div className="relative">
//                 <img
//                   alt={product.title}
//                   src={product.thumbnail}
//                   className="w-full h-48 object-cover"
//                 />
//                 <Button
//                   type="text"
//                   icon={<X className="h-4 w-4" />}
//                   className="absolute top-2 right-2"
//                   onClick={() => removeProduct(product.id)}
//                 />
//               </div>
//             }
//           >
//             <Card.Meta
//               title={product.title}
//               description={
//                 <div className="space-y-2">
//                   <p><strong>Brand:</strong> {product.brand}</p>
//                   <p><strong>Category:</strong> {product.category}</p>
//                   <p><strong>Price:</strong> ${product.price}</p>
//                   <p><strong>Discount:</strong> {product.discountPercentage}%</p>
//                   <p className="text-sm">{product.description}</p>
//                 </div>
//               }
//             />
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CompareProducts;
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Table, Empty } from 'antd';
import { X } from 'lucide-react';
import { Product } from '../types';

interface CompareProductsProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const CompareProducts: React.FC<CompareProductsProps> = ({
  products,
  setProducts,
  showModal,
  setShowModal,
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const data = await response.json();
        setAllProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    if (showModal) {
      fetchProducts();
    }
  }, [showModal]);

  const removeProduct = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Product) => (
        <div className="flex items-center space-x-3">
          <img
            src={record.thumbnail}
            alt={text}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Product) => (
        <Button
          type="primary"
          disabled={products.some((p) => p.id === record.id) || products.length >= 4}
          onClick={() => {
            setProducts([...products, record]);
            setShowModal(false);
          }}
        >
          Add to Compare
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Compare Products</h1>
        <Button
          type="primary"
          onClick={() => setShowModal(true)}
          disabled={products.length >= 4}
        >
          Add More Products
        </Button>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              cover={
                <div className="relative">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    type="text"
                    icon={<X className="h-4 w-4" />}
                    className="absolute top-2 right-2"
                    onClick={() => removeProduct(product.id)}
                  />
                </div>
              }
            >
              <Card.Meta
                title={product.title}
                description={
                  <div className="space-y-2">
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Discount:</strong> {product.discountPercentage}%</p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Empty description="No products found" />
        </div>
      )}

      <Modal
        title="Add Products to Compare"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={1000}
      >
        {allProducts.length > 0 ? (
          <Table
            columns={columns}
            dataSource={allProducts}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 5,
              position: ['bottomCenter'],
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-40">
            <Empty description="No products available" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompareProducts;
