import API from '../API/api'
import { useState } from 'react';

function Historycard({ recommendation, onUpdate }){
    const [ rec, setRec ] = useState(recommendation);

    const toggleCompleted = async (projectIdx,wIdx,tIdx)=>{
        try{
        let res = await API.post(`/recommend/history/tasks/${rec._id}/${projectIdx}/${wIdx}/${tIdx}`);
        setRec(res.data)
        if(onUpdate) onUpdate(res.data)
        }
        catch(err){
            console.err('Failed to update task', err) 
        }
    }

    return(
        <>
        <div className='history-card'>
            <h4>Skills: {rec.inputs.skills.join(', ')}</h4>
            <h4>Level: {rec.inputs.level}</h4>
            <h4>Goal: {rec.inputs.goal}</h4>

            {rec.projects.map((project,pIdx)=>(
                <div key={pIdx} className='project-block'>
                    <h4>Title: {project.title}</h4>
                    <p>Description: {project.description}</p>
                    <strong>Tech Stack: {project.techstack.map((t,i)=>(
                        <span key={i}>{t}</span>
                    ))}</strong>
                    <strong>Difficulty:</strong>
                    <p>{project.difficulty}</p>
                    <strong>Features:</strong>
                    <ul>
                        {project.features.map((f,fIdx)=>(
                            <li key={fIdx}>{f}</li>
                        ))}
                    </ul>
                    <h4>Roadmap:</h4>
                    {project.roadmap.map((r,rIdx)=>(
                        <div key={rIdx}>
                            <strong>Week {r.week}</strong>
                            <ul>
                                {r.tasks.map((t,tIdx)=>(
                                    <li key={tIdx}>
                                        <span style={{textDecoration: t.completed? 'line-through':'none'}}>{t.title}</span>
                                        <input type='checkbox' checked={t.completed} onChange={()=>toggleCompleted(pIdx,rIdx,tIdx)}></input>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
    )
        
}

export default Historycard;