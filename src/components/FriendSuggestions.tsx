import React, {useEffect, useState} from "react";
import {Button, Form, type FormProps, Input, Skeleton} from "antd";
import API from "../utils/axios.ts";
import {toast} from "react-toastify";
import {Profile} from "./Profile.tsx";
import socket from "../utils/socket.ts";

const FriendSuggestions: React.FC<{type: string}> = ({ type }) => {

    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState<any>(null)
    const [isLoadingListFriend, setIsLoadingListFriend] = useState<boolean>(true)
    const [isLoadingShowFriend, setIsLoadingShowFriend] = useState<boolean>(true)

    const addFriendAudio = new Audio("/sounds/add_friend_audio.mp3");
    const acceptFriendAudio = new Audio("/sounds/quacquac.mp3");

    const onFinish: FormProps['onFinish'] = (values) => {
        getFriends(values, type)
    };

    const getCurrentUser = async () => {
        try {
            const res = await API.get('/auth/me');
            const userId = res.data.user.id || null;
            localStorage.setItem('current', userId);

            if (userId) {
                socket.connect();
                socket.emit('register_user', userId);
            }
        } catch (e) {
            console.log(e);
        }
    };


    const getFriends = async (values?: any, type?: string) => {
        setIsLoadingListFriend(true);
        try {
            const params = values ? new URLSearchParams(values).toString() : '';
            let res;
            if (type === 'friend') {
                res = await API.get(`/friends${params ? `?${params}` : ''}`);
            } else {
                res = await API.get(`/friends/request${params ? `?${params}` : ''}`);
            }
            if (res.data.success) {
                setFriends(res.data.friends);
            } else {
                toast.error(res.data.errors || 'Có lỗi sảy ra, vui lòng thử lại !');
            }
        } catch (e) {
            toast.error((e as Error).message || 'Có lỗi từ server !');
        } finally {
            setIsLoadingListFriend(false);
        }
    }

    const getFriend = async (id: number) => {
        try {
            const res = await API.get(`/friends/${id}`);
            if (res.data.success) {
                setFriend(res.data.friend)
            } else {
                toast.error(res.data.errors || 'Có lỗi sảy ra, vui lòng thử lại !')
            }
        } catch (e) {
            toast.error((e as Error).message || 'Có lỗi từ server !')
        } finally {
            setIsLoadingShowFriend(false);
        }
    }

    const addFriend = async (id: number) => {
        try {
            const res = await API.post(`/friends/${id}`);
            if (res.data.success) {
                socket.emit('add_friend', id)
                toast.success(res.data.message || "Đã gửi lời mời kết bạn thành công")
            } else {
                toast.error(res.data.errors || 'Có lỗi sảy ra, vui lòng thử lại !')
            }
        } catch (e) {
            toast.error((e as Error).message || 'Có lỗi từ server !')
        }
    }

    const acceptFriend = async (id: number) => {
        try {
            const res = await API.post(`/friends/accept/${id}`);
            if (res.data.success) {
                socket.emit('accept_friend', localStorage.getItem("current"))
                toast.success(res.data.message || "Đã chấp nhận lời mời kết bạn !")
            } else {
                toast.error(res.data.errors || 'Có lỗi sảy ra, vui lòng thử lại !')
            }
        } catch (e) {
            toast.error((e as Error).message || 'Có lỗi từ server !')
        }
    }

    useEffect(() => {
        getCurrentUser();
        getFriends('', type);
    }, [type]);

    useEffect(() => {

        socket.on('received_add_friend_request', () => {
            getFriends('', 'friendRequest');
            addFriendAudio.play();
        });

        socket.on('has_been_accept_friend_request', () => {
            getFriends('', 'friendRequest');
            acceptFriendAudio.play();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                className="flex items-center gap-2 sticky top-0 bg-white z-1000"
            >
                <Form.Item
                    name="name"
                    className={`w-[600px]`}
                >
                    <Input allowClear placeholder={'Nhập tên người bạn'}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
            <div className={`flex gap-3 mt-4`}>
                {
                    isLoadingListFriend ? (
                        <Skeleton/>
                    ) : (
                        type === 'friend' ? (
                            <div className="max-w-[330px]">
                                <ul className="list-none">
                                    {friends.map((friend: any) => (
                                        <li key={friend.id}
                                            className="flex items-center bg-gray-100 rounded-md px-3 py-4 mb-2 border border-gray-200">
                                            <img
                                                src={friend.avatar}
                                                alt={friend.name}
                                                className="w-12 h-12 rounded-full mr-3"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{friend.name}</div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => addFriend(friend.id)}
                                                            className="mt-1 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600">
                                                        Kết bạn
                                                    </button>
                                                    <button onClick={() => getFriend(friend.id)}
                                                            className="mt-1 px-3 py-1 rounded bg-gray-300 text-black text-sm hover:bg-gray-400">
                                                        Xem thông tin
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="max-w-[330px]">
                                <ul className="list-none">
                                    {friends.map((friend: any) => (
                                        <li key={friend.sender.id}
                                            className="flex items-center bg-gray-100 rounded-md px-3 py-4 mb-2 border border-gray-200">
                                            <img
                                                src={friend.sender.avatar}
                                                alt={friend.sender.name}
                                                className="w-12 h-12 rounded-full mr-3"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{friend.sender.name}</div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => acceptFriend(friend.id)}
                                                            className="mt-1 px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600">
                                                        Chấp nhập
                                                    </button>
                                                    <button onClick={() => getFriend(friend.sender.id)}
                                                            className="mt-1 px-3 py-1 rounded bg-gray-300 text-black text-sm hover:bg-gray-400">
                                                        Thông tin
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )
                }
                {
                    isLoadingShowFriend ? (
                        <Skeleton style={{width: "385px"}}/>
                    ) : (
                        friend && (
                            <Profile friend={friend} type={type} action={ type === 'friend' ? addFriend : acceptFriend}/>
                        )
                    )
                }
            </div>
        </>
    );
};

export default FriendSuggestions;