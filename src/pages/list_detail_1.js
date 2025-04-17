import React from 'react';
import listdetail1 from '../image/listdetail1.png';
import { FaPlay, FaPause, FaRegHeart } from "react-icons/fa";
import Bottom from "../image/bottom.png";
import { Link } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { db } from '../db';
const ListDetail1 = () => {
  const arrayList = [];
  const dataList = ref(db, 'songs');
  onValue(dataList, (items) => {
    items.forEach(item => {
      const data = item.val();
      const key = item.key;
      if (arrayList.length < 8) {
        const Id = data.singerId[0];
        const singer = ref(db, `singers/${Id}`);
        onValue(singer, (item) => {
          const datasinger = item.val();
          arrayList.push(
            {
              id:key,
              image: data.image,
              title: data.title,
              titlesinger: datasinger.title
            }
          )
        })
      }
    });
  })


  return (
    <div className='ListDetail1'>
      <div className='container'>
        <div className='section_1'>
          <div className='inner-wrap'>
            <div className='image'>
              <img src={listdetail1} />
            </div>
            <div className='content'>
              <h1 >Nhạc Trẻ</h1>
              <p >Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ, được Zing MP3 tự động tổng hợp dựa trên thông tin số liệu lượt nghe và lượt chia sẻ của từng bài hát trên phiên bản web và phiên bản Mobile. Dữ liệu sẽ được lấy trong 30 ngày gần nhất và được cập nhật liên tục.</p>
            </div>
          </div>
        </div>
        <div className='section_2'>
          <div className='title_a'>
            <p >Danh Sách Bài Hát</p>
          </div>
          <div className='list'>
            {
              arrayList.map(item => (
                <Link to={`/detail_song/${item.id}`} className='box'>
                  <div className='left'>
                    <FaPlay />
                    <img src={item.image} />
                    <h2>{item.title}</h2>
                  </div>
                  <div className='mid'>
                    <p >{item.titlesinger}</p>
                  </div>
                  <div className='right'>
                    <p >4:32</p>
                    <FaRegHeart />
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default ListDetail1;