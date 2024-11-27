import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Input,
    List,
    Progress,
    Row,
    Typography,
    Radio,
} from "antd";
import {
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function UserProfile() {
    const [userInfo, setUserInfo] = useState({
        fullName: "Johnatan Smith",
        gender: "Male",
        email: "example@example.com",
        phone: "(097) 234-5678",
        mobile: "(098) 765-4321",
        address: "Bay Area, San Francisco, CA",
    });

    const handleInputChange = (key, value) => {
        setUserInfo({ ...userInfo, [key]: value });
    };

    return (
        <section className="bg-gray-100 p-5 sm:p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8} lg={8}>
                        <Card className="text-center mb-4 h-80">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="Avatar"
                                width={150}
                                className="rounded-full mx-auto mb-5"
                            />
                            <Title level={4}>{userInfo.fullName}</Title>
                            <Text type="secondary">Full Stack Developer</Text>
                            <br />
                            <Text type="secondary" >{userInfo.address}</Text>
                        </Card>

                        <Card className="h-auto">
                            <List
                                className="text-right text-xl"
                                itemLayout="horizontal"
                                dataSource={[
                                    {
                                        icon: <FacebookOutlined className="text-blue-700" />,
                                        text: "mdbootstrap",
                                    },
                                    {
                                        icon: <InstagramOutlined className="text-pink-600" />,
                                        text: "mdbootstrap",
                                    },
                                    {
                                        icon: <TwitterOutlined className="text-blue-400" />,
                                        text: "mdbootstrap",
                                    },
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta avatar={item.icon} title={item.text} />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={16} lg={16}>
                        <Card className="mb-4 h-80">
                            <Row gutter={[16, 16]} className="mb-8 mt-4">
                                <Col xs={24} sm={8} className="my-px">
                                    <Text strong>Full Name:</Text>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Input
                                        value={userInfo.fullName}
                                        onChange={(e) =>
                                            handleInputChange("fullName", e.target.value)
                                        }
                                    />
                                </Col>

                                <Col xs={24} sm={8} className="my-px">
                                    <Text strong>Gender:</Text>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Radio.Group
                                        value={userInfo.gender}
                                        onChange={(e) => handleInputChange("gender", e.target.value)}
                                    >
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>
                                        <Radio value="Other">Other</Radio>
                                    </Radio.Group>
                                </Col>

                                <Col xs={24} sm={8} className="my-px">
                                    <Text strong>Email:</Text>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Input
                                        value={userInfo.email}
                                        onChange={(e) =>
                                            handleInputChange("email", e.target.value)
                                        }
                                    />
                                </Col>

                                <Col xs={24} sm={8} className="my-px">
                                    <Text strong>Phone:</Text>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Input
                                        value={userInfo.phone}
                                        onChange={(e) =>
                                            handleInputChange("phone", e.target.value)
                                        }
                                    />
                                </Col>

                                <Col xs={24} sm={8} className="my-px">
                                    <Text strong>Address:</Text>
                                </Col>
                                <Col xs={24} sm={16}>
                                    <Input
                                        value={userInfo.address}
                                        onChange={(e) =>
                                            handleInputChange("address", e.target.value)
                                        }
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Card className="mt-4 h-52">
                            <Title level={5}>
                                <span className="text-blue-500 text-3xl">Achievements 🏆</span>
                            </Title>
                            <Text strong className="text-base">Expenditure 🤑</Text>
                            <Progress percent={80} />
                            <Text strong className="text-base">Orders</Text>
                            <Progress percent={72} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
}
