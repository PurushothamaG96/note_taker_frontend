import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import "./home.css"
import { useNavigate } from 'react-router-dom';
function Home(props) {
    const [arr, setArr] = useState([])
    const navigate = useNavigate()
    const token=JSON.parse(localStorage.getItem("notToken"))
    let month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"]
    useEffect(()=>{
        handleData()
    }, [])

    function handleData(){
        fetch("https://clean-headscarf-calf.cyclic.app/v1/post", {
            method:"get",
            headers: {
                "Authorization":token
                }
            
        }).then((res)=>res.json())
        .then((data)=>{
            setArr(data)
        }).catch((e)=>{
            console.log(e)
        })
    }
    return (
        <>
        <Nav handleData={handleData}/>
            <div className='home-container'>
                {
                    arr.map((val, i)=>{
                        let times = val.createdAt.split("T")
                        let m = parseInt(times[0].split("-")[1])
                        console.log(m)
                        return(
                            <div className='cards'>
                                <div className='time'>
                                    <p >
                                    <span style={{marginRight:"10px",fontWeight:700}}>{month[m-1]}</span>
                                    <span style={{marginRight:"10px",fontWeight:700}}>{times[0]}</span>
                                    <span>{times[1]}</span>
                                    </p>
                                </div>
                                <h1>{val.title}</h1>
                                <p>{val.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
        
    );
}

export default Home;
