import API from "../API/api";

function Projectcard({project}){
    return(
        <>
            <h3>Title: {project.title}</h3>
            <p>Description: {project.description}</p>

            <strong>Tech Stack:</strong>
            {project.techstack.map((t,i)=>(
                <span key={i}>{t}</span>
            ))}

            <strong>Difficulty: </strong>
            <span>{project.difficulty}</span>

            <strong>Features: </strong>
            <ul>
                {project.features.map((f,i)=>(
                    <li key={i}>{f}</li>
                ))}
            </ul>

            <h3>Roadmap</h3>

            {project.roadmap.map((r,i)=>(
                <div key={i}>
                    <strong>Week: {r.week}</strong>
                    <ul>
                        {r.tasks.map((t,i)=>(
                            <li key={i}>{t.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

export default Projectcard;