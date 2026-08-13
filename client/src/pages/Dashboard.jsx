import { useState } from 'react';
import API from '../API/api.js';
import Projectcard from '../Components/Projectcard.jsx';

function Dashboard(){
    const [ formdata, setFormdata ] = useState({
        skills: '',
        level: '',
        goal: ''
    });
    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const generateData = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            let res = await API.post('/recommend/generate',{
                skills: formdata.skills.split(',').map(s => s.trim()).filter(s => s.length>0),
                level: formdata.level,
                goal: formdata.goal
            });
            setData(res.data);
        }
        catch(err){
            setError(err.response?.data?.message || 'Failed to generate recommendation')
        }
        finally{
            setLoading(false)
        }
    }
    const handleChange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }
    
    return(
        <>
        <div className='inputform'>
            <form onSubmit={generateData}>
                <span>Skills: <input type='text' name='skills' placeholder='Skills (Comma Seperated)' onChange={handleChange} required></input></span>
                <p>Level: </p> 
                <select name='level' onChange={handleChange} required>
                    <option value=''>Select Level</option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Advanced'>Advanced</option>
                </select>
                <span>Goal: <input type='text' name='goal' onChange={handleChange} placeholder='Goal' required></input></span>
                <button type='submit' disabled={loading}>{loading? 'Generating...':'Generate'}</button>
                {error && <p className='error-text'>{error}</p>}
            </form>
        </div>
        <div className='generatedData'>
            {data && 
                <>
                  <h3>Current Skills:</h3>
                  {data.analysis.currentSkills.map((s,i)=>(
                    <p key={i}>{s}</p>
                  ))}

                  <h3>Missing Skills: </h3>
                  {data.analysis.missingSkills.map((s,i)=>(
                    <p key={i}>{s}</p>
                  ))}

                  <h3>Projects: </h3>  
                  {data.projects.map((p,i)=>(
                    <Projectcard key={i} project={p} ></Projectcard>
                  ))}
                </>
            }
        </div>
        </>
    )
}
export default Dashboard