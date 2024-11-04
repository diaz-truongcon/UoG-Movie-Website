import React from 'react';
import {  Typography, List, Avatar, Badge } from 'antd';
import { FireOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
function ListTop({data,type}) {
    return (
        <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item style={{ borderBottom: "1px solid white" }}>
                <List.Item.Meta
                    avatar={<Avatar shape="square" size={64} src={item.imgUrl} />}
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
                                {item.nameMovie}
                            </Typography.Title>
                            <Badge
                                count={item.duration}
                                style={{
                                    backgroundColor: '#d4380d',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            />
                        </div>
                    }
                    description={
                        <>
                            <Typography.Text style={{ margin: 0, color: 'white' }}>{item.describe.length > 40 ? `${item.describe.substring(0, 40)}...` : item.describe}</Typography.Text>
                            <div>
                                <Typography.Text type="secondary" style={{ margin: 0, color: 'white' }}>
                                    {type == "views" ? (<><FireOutlined /> {item.views} Lượt xem </>) : (<><HeartOutlined /> {item.likeCount} Lượt thích </>)}
                                    
                                </Typography.Text>
                            </div>
                        </>
                    }
                />
            </List.Item>
        )}
    />
    );
}

export default ListTop;