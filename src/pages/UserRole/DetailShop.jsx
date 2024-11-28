import React, { useState, useEffect } from "react";
import { Card, Col, List, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import shopApi from "../../hooks/useShopApi"; // Import shopApi

const { Title, Text } = Typography;

export default function DetailShop() {
  const { id: shopId } = useParams(); // Lấy shopId từ URL
  const [shopDetail, setShopDetail] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
console.log(shopId);
  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        const response = await shopApi.getDetailShop(shopId); // Gọi API
        const { shop, bestSellers } = response.data; // Lấy dữ liệu từ response
        setShopDetail(shop); // Lưu thông tin shop
        setBestSellers(bestSellers); // Lưu danh sách sản phẩm best seller
      } catch (error) {
        console.error("Error fetching shop detail:", error);
      }
    };

    fetchShopDetail();
  }, [shopId]);

  // Nếu chưa có dữ liệu, hiển thị Loading
  if (!shopDetail) {
    return <div>Loading...</div>;
  }

  const { shopName, shopEmail, shopAddress, phoneNumber, images } = shopDetail;

  return (
    <section className="bg-gray-100 p-5 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <Row gutter={[16, 16]}>
          {/* Shop Details */}
          <Col xs={24} md={8} lg={8}>
            <Card className="text-center mb-4 h-auto">
              <img
                src={images[0] || "https://via.placeholder.com/150"} // Hiển thị ảnh đầu tiên
                alt="Shop"
                className="rounded mx-auto mb-5"
                width={150}
              />
              <Title level={4}>{shopName}</Title>
              <Text type="secondary">Address: {shopAddress}</Text>
              <br />
              <Text type="secondary">Email: {shopEmail}</Text>
              <br />
              <Text type="secondary">Phone Number: {phoneNumber}</Text>
            </Card>
          </Col>

          {/* Best Sellers */}
          <Col xs={24} md={16} lg={16}>
            <Card className="mb-4 h-auto">
              <Title level={5}>Top 5 Best Sellers</Title>
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={bestSellers}
                renderItem={(product) => (
                  <List.Item>
                    <Card
                      cover={
                        <img
                          alt={product.name}
                          src={product.image || "https://via.placeholder.com/150"}
                        />
                      }
                    >
                      <Title level={5}>{product.name}</Title>
                      <Text>Sales: {product.salesNumber}</Text>
                      <Text>Price: {product.price}</Text>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
