const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const users = [
{
	id: 1, // user id 
	name: "Jordan Smith",
	StudentId: 957632,
	Major: "Computer Science",
	GPA: 3.2
},
{
	id: 2, // user id 
	name: "River Doe",
	StudentId: 913659,
	Major: "Computer Science",
	GPA: 3.6
},
{
	id: 3, // user id 
	name: "Taylor Johnson" ,
	StudentId: 987516,
	Major: "Information Technology",
	GPA: 3.45
}
]

express()
	.use(express.static(path.join(__dirname, 'public')))
	.use (express.json())
	.use(express.urlencoded({extended: false}))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/emr/', (req, res) => res.send(users))
	.post('/emr/', (req, res) => {
		const user = {
			id: users.length + 1,
			name: req.body.name,
			StudentId: req.body.StudentId,
			Major: req.body.Major,
			GPA: req.body.GPA
		};
		users.push(user);
		res.send(user);
	})
	.get('/emr/:id', (req, res) => {
		const user = users.find(c => c.id === parseInt(req.params.id))
		if(!user) res.status(404).send("User ID not found")
		res.send(user)
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  