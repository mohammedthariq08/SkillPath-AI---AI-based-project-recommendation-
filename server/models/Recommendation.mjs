import mongoose from 'mongoose';

const roadmapSchema = mongoose.Schema(
    {
        week:{
            type: Number,
            required: true 
        },
        tasks:[{
            title:{
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            },
            completedAt: {
                type: Date,
                default: null
            }
        }]
    }, {_id: false}
);

const projectSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true 
        },
        description:{
            type: String,
            required: true 
        },
        techstack: [
            {
                type: String,
                required: true 
            }
        ],
        difficulty: {
            type: String,
            enum: ['Beginner','Intermediate','Advanced'],
            required: true  
        },
        features:[
            {
                type: String,
                required: true 
            }
        ],
        roadmap: [roadmapSchema]
    },
    {_id: false}
);

const recommendationSchema = mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true 
        },
        inputs:{
            skills:[
                {
                    type: String,
                    required: true 
                }
            ],
            level:{
                type: String,
                required: true 
            },
            goal: {
                type: String,
                required: true 
            }
        },
        analysis:{
            currentSkills: [
                {
                    type: String 
                }
            ],
            missingSkills: [
                {
                    type: String 
                }
            ]
        },
        projects:[projectSchema]
    },{timestamps: true }
);

const Recommendation = mongoose.model('Recommendation',recommendationSchema);
export default Recommendation;