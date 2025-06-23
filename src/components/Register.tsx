import {Button, Form, Input, Card} from "antd";
import React from "react";
import Title from "antd/lib/typography/Title";
import {Link, useNavigate} from "react-router-dom";
import API from "../utils/axios.ts";
import {toast} from "react-toastify";

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: { user: string; email: string; password: string }) => {
        try {
            const res = await API.post('/auth/register', values);
            if (res.data.success) {
                navigate('/login');
                toast.success("Đăng ký thành công")
            } else {
                toast.error(res.data.error || "Có lỗi sảy ra")
            }
        } catch (e) {
            toast.error((e as Error).message || "Có lỗi sảy ra")
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <Card style={{
                width: 400,
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                borderRadius: '16px'
            }}>
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <Card className="w-full max-w-md p-6 shadow-lg">
                        <Title level={3} className="text-center">Đăng Ký</Title>
                        <Form
                            name="register"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Tên người dùng"
                                name="name"
                                rules={[{required: true, message: 'Vui lòng nhập tên của bạn!'}]}
                            >
                                <Input placeholder="Nhập tên của bạn"/>
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập email!'},
                                    {type: 'email', message: 'Email không hợp lệ!'},
                                ]}
                            >
                                <Input placeholder="Nhập email"/>
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {required: true, message: 'Vui lòng nhập mật khẩu!'},
                                    {min: 8, message: 'Mật khẩu phải nhiều hơn 8 kí tự'}
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">
                                    Đăng Ký
                                </Button>
                            </Form.Item>
                            <div className="text-center">
                                Đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link>
                            </div>
                        </Form>
                    </Card>
                </div>
            </Card>
        </div>
    );
};