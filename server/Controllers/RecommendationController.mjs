import { generateProjects } from "../Service/Service.mjs";
import Recommendation from "../models/Recommendation.mjs";

export const recommendedProjects = async(req,res)=>{
    try{
        const inputs = req.body;
        if(!inputs.skills || !inputs.level || !inputs.goal){
            return res.status(400).json({message: 'Invalid Input'});
        }
        if(!req.user?.id){
            return res.status(400).json({message: 'Unauthorized'});
        }
        const aiData = await generateProjects(inputs);
        console.log(JSON.stringify(aiData, null, 2));
        const formattedProjects = aiData.projects.map((project)=>(
            {
                ...project,
                roadmap: project.roadmap.map((week)=>(
                    {
                        ...week,
                        tasks: week.tasks.map(task=>(
                            {
                                title: task.title,
                                completed: false,
                                completedAt: null
                            }
                        ))
                    }
                ))
            }
        ))
        const saved = await Recommendation.create({
            userId: req.user.id,
            inputs,
            analysis: aiData.analysis,
            projects: formattedProjects
        });
        res.status(200).json(saved);
    }
    catch(err){
        console.error('recommended projects error:',err)
        res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
}
export const projectHistory = async(req,res)=>{
    try{
        if(!req.user?.id){
            return res.status(400).json({message: 'Unauthorized'});
        }
        let data = await Recommendation.find({
            userId: req.user.id 
        }).sort({createdAt: -1});
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const updateTask = async(req,res)=>{
    try{
        const {recId, projectIdx, weekIdx, taskIdx} = req.params;

        let rec = await Recommendation.findById(recId);

        if(!rec){
            return res.status(404).json({message:"Recommendation not found"});
        }
        if(rec.userId.toString() !== req.user.id){
            return res.status(403).json({message:'Forbidden'})
        }

        let task = rec.projects[projectIdx].roadmap[weekIdx].tasks[taskIdx];

        if(!task){
            return res.status(400).json({message:"Invalid task reference"})
        }

        task.completed = !task.completed ;
        task.completedAt =  task.completed? new Date() : null;
        await rec.save();
        res.status(200).json(rec);
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
}