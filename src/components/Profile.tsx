import {Button} from "antd";
import {UserAddOutlined} from "@ant-design/icons";

interface ProfileProps {
    friend: any;
    action: any;
    type: string;
};

export const Profile: React.FC<ProfileProps> = ({friend, action, type}) => {
    return (
        <div className="max-w-[385px] w-full bg-gray-100 p-3 rounded-md border border-gray-200">
            <div className="relative h-60 bg-gray-300 rounded-lg overflow-hidden">
                <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Cover"
                    className="w-full h-full object-cover"
                />

                <div className="absolute left-1 bottom-1">
                    <img
                        src={friend.avatar}
                        alt="Avatar"
                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                    />
                </div>
            </div>

            <div
                className="mt-2 bg-white rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{friend.name}</h1>
                    <p className="text-gray-500">Lập trình viên | Sống tại Hà Nội</p>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                        type="primary"
                        icon={<UserAddOutlined/>}
                        className="bg-blue-500"
                        onClick={() => action(friend.id)}
                    >
                        { type === 'friend' ? 'Thêm bạn bè' : 'Chấp nhận' }
                    </Button>
                </div>
            </div>

            <div className="mt-2 p-4 bg-white rounded-md">
                <p>email: {friend.email}</p>
                <p>username: {friend.username}</p>
                <p>Giới thiệu bản thân, bài viết, hình ảnh, v.v.v</p>
            </div>
        </div>
    )
}