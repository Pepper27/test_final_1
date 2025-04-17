import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import left_sec1 from '../image/left_sec1.png';
import sp_sec1 from '../image/sp_sec1.png';
import { FaPlay } from "react-icons/fa";
import sec2 from '../image/sec2.png';
import sec3 from '../image/sec3.png';
import { ref, onValue } from "firebase/database";
import { db } from '../db';


export const Bottom = () => {
    //section_1
    const arraytopSong = [];
    const topSong = ref(db, 'songs');
    onValue(topSong, (items) => {
        items.forEach(item => {
            const data = item.val();//noi dung ben trong
            const key = item.key;// khoa cua noi dung
            if (arraytopSong.length < 3) {
                const Id = data.singerId[0];
                const singer = ref(db, `singers/${Id}`);
                onValue(singer, (item) => {
                    const datasinger = item.val();//noi dung ben trong
                    arraytopSong.push(
                        {
                            id: key,
                            image: data.image,
                            title: data.title,
                            singer: datasinger.title,
                            listen: data.listen
                        }
                    )
                })
            }

        });
    })
    //end_section_1
    //section_2
    const arrayType = [];
    const Typesong = ref(db, 'categories');
    onValue(Typesong, (items) => {
        items.forEach(item => {
            const dataType = item.val();//noi dung ben trong
            const key = item.key;// khoa cua noi dung
            if (arrayType.length < 5) {
                arrayType.push(
                    {
                        id: key,
                        image: dataType.image,
                        title: dataType.title,
                        description: dataType.description
                    }
                )
            }

        });
    })
    //end_section_2
    //secton_3
    const arraySinger = [];
    const dataSinger = ref(db, 'singers');
    onValue(dataSinger, (items) => {
        items.forEach(element => {
            const dataSinger = element.val();
            const key = element.key;
            if(arraySinger.length < 5){
                arraySinger.push(
                    {
                        id:key,
                        image:dataSinger.image,
                        title:dataSinger.title,
                        description:dataSinger.description
                    }
                )
            }
        });
    })
    //end section_3
    return (
        <>
            <section className='section_1'>
                <div className="container">
                    <div className="inner-wrap">
                        <div className='left'>
                            <div className='image'>
                                <img src={left_sec1} />
                            </div>
                        </div>
                        <div className='right'>
                            <h1 >Nghe Nhiều</h1>
                            <div className='listbox'>
                                {
                                    arraytopSong.map(item => (
                                        <div className='box1'>
                                            <div className='box_left'>
                                                <img src={item.image} />
                                            </div>
                                            <div className='box_mid'>
                                                <h2>{item.title}</h2>
                                                <h3>{item.singer}</h3>
                                                <p>{item.listen.toLocaleString()} lượt nghe</p>
                                            </div>
                                            <div className='button'>
                                                <button className='box_right'>
                                                    <FaPlay />
                                                </button>
                                                <button className='box_right'>
                                                    <FaRegHeart />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section_2' >
                <h1 >Danh Mục Nổi Bật</h1>
                <div className="container">
                    <div className='inner-wrap'>
                        {
                            arrayType.map(item => (
                                <div className='box'>
                                    <img src={item.image} />
                                    <h3 >{item.title}</h3>
                                    <p >{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className='section_3' >
                <h1 >Ca Sĩ Nổi Bật</h1>
                <div className="container">
                    <div className='inner-wrap'>
                        {
                            arraySinger.map(item => (
                                <div className='box'>
                                    <img src={item.image} />
                                    <h3 >{item.title}</h3>
                                    <p >{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default Bottom;
