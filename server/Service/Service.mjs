import OpenAI from 'openai';

let openai;
function getClient(){
    if(!openai){
        openai = new OpenAI({
        apiKey: process.env.GROK_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1'
        });
    }
    return openai;
}

export const generateProjects = async(input)=>{
    try{
    let prompt = `
You are a career mentor AI. Based on the user's current skills, level, and goal, do two things:
1. Identify missing skills needed to reach the goal.
2. Suggest exactly 3 project ideas suited to their level.

User skills: ${input.skills}
User level: ${input.level}
User goal: ${input.goal}

Return ONLY valid JSON. No markdown, no code fences, no explanation text before or after.
Match this EXACT structure and field names:

{
  "analysis": {
    "currentSkills": ["string"],
    "missingSkills": ["string"]
  },
  "projects": [
    {
      "title": "string",
      "description": "string",
      "techstack": ["string"],
      "difficulty": "Beginner",
      "features": ["string"],
      "roadmap": [
        {
          "week": 1,
          "tasks": [
            { "title": "string" },
            { "title": "string" }
          ]
        },
        {
          "week": 2,
          "tasks": [
            { "title": "string" }
          ]
        }
      ]
    }
  ]
}

STRICT RULES:
- "techstack" field must be lowercase "techstack", not "techStack"
- "difficulty" must be EXACTLY one of these three strings: "Beginner", "Intermediate", "Advanced" — never "Easy", "Medium", or "Hard"
- "roadmap" MUST be an array of objects, never an object with week1/week2 keys
- Each roadmap entry needs a numeric "week" field and a "tasks" array
- Each task must be an object with a "title" string field, not a plain string
- Generate exactly 3 projects
- Do not add, rename, or omit any fields shown above
`;
    
    const response = await getClient().chat.completions.create({
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: prompt}]
    });
    return JSON.parse(response.choices[0].message.content);
    }
    catch(err){
        console.error('generate projects error:',err)
        throw err;
    }
}