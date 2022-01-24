// const things = require("/index.js")
const planner = []
let globalId = 1


module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                           "Cool shirt!",
                           "Your Javascript skills are stellar.",
        ];

        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
},
    getFortune: (req, res) => {
        const fortunes = ["A faithful friend is a strong defense", "A golden egg of opportunity will fall into your lap this month",
                    "It's a good time to finish old tasks", "A pleasant surprise is waiting for you", "Adventure can be real happiness", "All your hard work will soon pay off"
    ];

    let indexRandom = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[indexRandom];

    res.status(200).send(randomFortune);
},
    addTask: (req, res) => {
        const {name, priority} = req.body

        let newTask = {
            name,
            priority,
            id: globalId
        }
        globalId++
        planner.push(newTask)
        res.status(200).send(planner)

    },
    deleteTask: (req,res) =>{
        const {id} = req.params

        const index = planner.findIndex(elem => +elem.id === +id)

        planner.splice(index, 1)

        res.status(200).send(planner)

    },
    editTask: (req,res) => { 
       let reqId = req.params.id
       const index = planner.findIndex(elem => +elem.id === +reqId);
       planner[index] = {
        ...planner[index],
        name: req.body.name,
       }
        res.status(200).send(planner)
    }// end of edit func
}
