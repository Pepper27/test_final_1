import React, { useState, useEffect } from 'react';
import { FaPlay, FaRegHeart } from "react-icons/fa";
import { onValue, ref } from 'firebase/database';
import { Link, useParams } from 'react-router-dom';
import { db } from '../db';
import Bottom from "../image/bottom.png";

const DetailSong = (props) => {
  const { id } = useParams();
  const detailsong = { img: null, title: null, singer: null, lyric: null, category: null }
  const arrayDetailSong = [];
  const getData = ref(db, `songs/${id}`)
  onValue(getData, (item) => {
    const data = item.val();
    const key = item.key;
    detailsong.id = key;
    detailsong.image = data.image;
    detailsong.title = data.title;
    const singerRef = ref(db, `singers/${data.singerId[0]}`);
    onValue(singerRef, (item) => {
      detailsong.singer = item.val().title;
    })
    detailsong.lyric = data.lyric;
    detailsong.category = data.categoryId;
    const getDatatoo = ref(db, `songs`);
    onValue(getDatatoo, (items) => {
      items.forEach(item => {
        const songData = item.val();
        const keytoo = item.key;
        if (songData.categoryId == detailsong.category && arrayDetailSong < 1) {
          arrayDetailSong.push({
            id: keytoo,
            title: songData.title,
            image: songData.image,
            singerId: songData.singerId[0],
          });
        }
      });
    })
  })

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
              id: key,
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
    <div className='DetailSong'>
      <div className='container'>
        <section className='section_1' >
          {arrayDetailSong.map((item) => (
            <div className='inner-wrap' key={detailsong.id}>
              <div className='image'>
                <img src={detailsong.image} alt={item.title} />
              </div>
              <div className='content'>
                <h1>{detailsong.title}</h1>
                <p>{detailsong.singer}</p>
              </div>
            </div>
          ))
          }
        </section>
        <section className='section_2'>
          <div className='title'>
            <h1>Lời Bài Hát</h1>
          </div>
          {
            arrayDetailSong.map((item) => (
              <div className='lyrics'>
                <p>{detailsong.lyric}</p>
              </div>
            ))
          }
        </section>
        <section className='section_3'>
            <div className='title_a'>
              <p>Bài Hát Cùng Danh Mục</p>
            </div>
            <div className='list'>
              {
                arrayList.map((item) => (
                  <Link to = {`/detail_song/${item.id}`} className='box'>
                    <div className='left'>
                      <FaPlay />
                      <img src={item.image} alt="" />
                      <h2>{item.title}</h2>
                    </div>
                    <div className='mid'>
                      <p>{item.titlesinger}</p>
                    </div>
                    <div className='right'>
                      <p>4:32</p>
                      <FaRegHeart />
                    </div>
                  </Link>
                ))
              }
            </div>
          </section>
      </div>
    </div>
  );
};

export default DetailSong;

