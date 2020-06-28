const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
    
})

server.get("/", function(req, res) {  //req = request  res = response
    const about = {
        logo_url: "https://scontent.ffln4-1.fna.fbcdn.net/v/t1.0-9/104169738_687672685112542_1468337677738709328_n.png?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=bEpYvUGdhmwAX84vBlb&_nc_ht=scontent.ffln4-1.fna&oh=42865f744bc76dd27f654157a3b4f830&oe=5F106F73",
        name: "Rocketseat",
        description: 'Ensinamos as melhores tecnologias em programação direto ao ponto e do jeito certo. </br> Não perca mais tempo, venha codar essas tecnologias com a gente.',
        listas: [
            { name: "ReactJS"},
            { name: "React Native"},
            { name: "NodeJS"},
            { name: "JavaScript"}            
        ]
    }

    return res.render("about", {about: about}) //Primeira rota que é a padrao
})

server.get("/courses", function(req, res) {  //req = request  res = response
    
    return res.render("courses", {items: courses}) //Segunda rota
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id;

    const course = courses.find(function (course) {
        return course.id == id
    })

    if(!course) {
        return res.send("Curso Not Found")
    }
        return res.render("course", { course })
})

server.use(function(req, res) {
    res.status(404).render("not-found");// Pagina 404
})


server.listen(5000, function () {  //inicia o servidor
    console.log("server is running")
})

