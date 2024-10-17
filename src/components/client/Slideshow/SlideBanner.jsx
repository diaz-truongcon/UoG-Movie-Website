import React, { useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const SlideBanner = () => {
  const [items, setItems] = useState([
    {
      name: "Switzerland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      backgroundImage: "https://image.bnews.vn/MediaUpload/Org/2023/10/16/acs-20231016075842.jpg",
    },
    {
      name: "Finland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      backgroundImage: "https://blog.masterkorean.vn/storage/photos/3/V%C4%82N%20H%C3%93A/TOP%2010%20PHIM%20%C4%90I%E1%BB%86N%20%E1%BA%A2NH%20H%C3%80N%20QU%E1%BB%90C%20HAY%20NH%E1%BA%A4T%20T%E1%BB%AA%20TR%C6%AF%E1%BB%9AC%20%C4%90%E1%BA%BEN%20NAY/2.jpeg",
    },
    {
      name: "Iceland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      backgroundImage: "https://kenh14cdn.com/203336854389633024/2024/9/5/ngangcopy22dc93b1a-d6eb-41fe-8dd0-ef09b8f1308d-17255346307681573016334-1725541754201-1725541755300561730611.jpg",
    },
    {
      name: "Australia",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      backgroundImage: "https://icdn.24h.com.vn/upload/1-2021/images/2021-03-17/Phim-dien-anh-co-trang-Kieu-quyet-dinh-khoi-chieu-som-hon-du-dinh-160478179_304601597665696_5876061954509923781_o-1615968747-956-width2048height1476.jpg",
    },
    {
      name: "Netherland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      backgroundImage: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/1/5/1135018/Poster_1920X1080_1_.jpg",
    },
    {
      name: "Ireland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      backgroundImage: "https://www.elle.vn/wp-content/uploads/2023/01/20/513311/Phim-dien-anh-dang-mong-cho-nhat-nam-2023.jpg",
    },
  ]);

  const handleNext = () => {
    let items = document.querySelectorAll('.slide-banner .item')
    document.querySelector('.slide').appendChild(items[0])
  };

  const handlePrev = () => {
    let items = document.querySelectorAll('.slide-banner .item')
    document.querySelector('.slide').prepend(items[items.length - 1])
  };

  return (
    <div className="slide-banner">
    <div className="container">
      <div className="slide">
        {items.map((item, index) => (
          <div
            key={index}
            className="item animate__animated animate__backInDown"
            style={{
              backgroundImage: `url(${item.backgroundImage})`,
            }}
          >
            <div className="content">
              <div className="name">{item.name}</div>
              <div className="des">{item.des}</div>
              <Button type="primary">See More</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="button">
        <Button
          className="prev"
          onClick={handlePrev}
          icon={<LeftOutlined />}
        />
        <Button
          className="next"
          onClick={handleNext}
          icon={<RightOutlined />}
        />
      </div>
    </div>
    </div>
  );
};

export default SlideBanner;
