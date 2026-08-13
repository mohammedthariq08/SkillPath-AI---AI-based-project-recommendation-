import { useState,useEffect } from 'react';
import API from '../API/api';
import Historycard from '../Components/Historycard';

function History(){
    const [ data, setData ] = useState(null);
    const [ error,setError ] = useState(null);

    const fetchData = async()=>{
        try{
        let res = await API.get('/recommend/history');
        setData(res.data);
        }
        catch(err){
            setError('Failed to load history')
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const handleChange = (updatedRec) => {
        setData((prev)=> prev.map((r)=> (r._id === updatedRec._id ? updatedRec : r)))
    }

    if(error) return <p>{error}</p>
    if(!data) return <p>Loading...</p>
    if(data.length===0) return <p>No history yet.</p>

    return(
        <>
        {data?
        (data.map((rec)=>(
            <Historycard key={rec._id} recommendation={rec} onUpdate={handleChange}/>
        )))
        : 
        (<p>Loading...</p>)
        }
        </>
    )
}
export default History;