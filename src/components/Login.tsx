import {Button, Form, Input, Card} from "antd";
import Title from "antd/lib/typography/Title";
import {Link, useNavigate} from "react-router-dom";
import API from "../utils/axios.ts";
import React from "react";
import {toast} from "react-toastify";

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: { username: string; password: string }) => {
        try {
            const res = await API.post('/auth/login', values);
            if (res.data.success) {
                localStorage.setItem('avatar', res.data.data.avatar);
                localStorage.setItem('name', res.data.data.name);
                navigate('/chat');
                toast.success("Đăng nhập thành công")
            } else {
                toast.error(res.data.error || "Có lỗi sảy ra")
            }
        } catch (e) {
            console.log(e);
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
                <Card>
                    <Title level={3} className="text-center">Đăng Nhập</Title>
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                    >
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
                            rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                        <div className="text-center">
                            Chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký</Link>
                        </div>
                    </Form>
                </Card>
            </Card>
        </div>
    );
};