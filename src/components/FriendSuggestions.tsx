import React from "react";
import {UserAddOutlined} from "@ant-design/icons";
import {Button, Form, type FormProps, Input} from "antd";

const mockFriends = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 2,
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
];

const FriendSuggestions: React.FC = () => {

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="flex items-center gap-2 sticky top-0 bg-white z-1000"
            >
                <Form.Item<FieldType>
                    name="username"
                    className={`w-[600px]`}
                    rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
                >
                    <Input placeholder={'Nhập tên người bạn'}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
            <div className={`flex gap-3 mt-4`}>
                <div className="max-w-[330px]">
                    <ul className="list-none">
                        {mockFriends.map((friend) => (
                            <li key={friend.id} className="flex items-center bg-gray-100 rounded-md px-3 py-4 mb-2 border border-gray-200">
                                <img
                                    src={friend.avatar}
                                    alt={friend.name}
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">{friend.name}</div>
                                    <div className="flex gap-1">
                                        <button className="mt-1 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600">
                                            Kết bạn
                                        </button>
                                        <button className="mt-1 px-3 py-1 rounded bg-gray-300 text-black text-sm hover:bg-gray-400">
                                            Xem thông tin
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="max-w-[385px] w-full bg-gray-100 p-3 rounded-md border border-gray-200">
                    <div className="relative h-60 bg-gray-300 rounded-lg overflow-hidden">
                        <img
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />

                        {/* Avatar */}
                        <div className="absolute left-1 bottom-1">
                            <img
                                src="https://randomuser.me/api/portraits/men/65.jpg"
                                alt="Avatar"
                                className="w-28 h-28 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>

                    <div className="mt-2 bg-white rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Nguyễn Văn A</h1>
                            <p className="text-gray-500">Lập trình viên | Sống tại Hà Nội</p>
                        </div>

                        <div className="flex gap-2 mt-4 md:mt-0">
                            <Button
                                type="primary"
                                icon={<UserAddOutlined />}
                                className="bg-blue-500"
                            >
                                Thêm bạn bè
                            </Button>
                        </div>
                    </div>

                    <div className="mt-2 p-4 bg-white rounded-md">
                        <p>Giới thiệu bản thân, bài viết, hình ảnh, v.v.v</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendSuggestions; 