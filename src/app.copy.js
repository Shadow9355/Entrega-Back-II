import cookieParser from "cookie-parser";
import express, { json } from "express";
import session from "express-session";
import router from "./routes/ApiRoutes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.use(cookieParser("cookieSecret"));
app.use(session());


// buscar usuario por query (endpoint del navegador)
app.get("/login", (req,res) => {
    const {user, password} = req.query

    if(user !== "pepe" || password !== "123"){
        res.send("Usuario o contraseña incorrectos")
    }
    else {
        req.session.user = user;
        req.session.role = "admin"; 
        res.send("<h3>OK</h3>")
    }
})
// buscar usuario por body (formulario o postman)
app.post("/login", (req,res) => {
    const {user, password} = req.body

    if(user !== "pepe" || password !== "123"){
        res.send("Usuario o contraseña incorrectos")
    }
    else {
        req.session.user = user;
        req.session.role = "admin"; 
        res.send("<h3>OK</h3>")
    }
})

// middleware de autenticacion
const auth = (req, res, next) => {
    if( req.session?.user === "pepe" && req.session?.role === "admin"){
        return next()
    }
    else{
        res.send("<h1>Sin autorizacion</h1>")
    }
}

app.get("/dashboard", auth, (req,res) => {
    res.send("<h4>Dashboard Admin</h4>")
})


// Borra la session
app.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if(!error){
            res.clearCookie("connect.sid");
            res.send("<h4> logout </h4>");
        }
        else{
            console.error({error});
            res.send("<h4>tenemos un error</h4>");
        }
    });
});


// crear una cookie
app.get("/setcookie", (req, res) => {
    const { name, email } = req.query;
    res.cookie("name", name, {maxAge: 10000});
    res.cookie("email", email, {maxAge: 10000});
    res.send("cookie creada");
});

// leer una cookie
app.get("/getcookie", (req, res) => {
    res.send(req.cookies);
});

// eliminar una cookie
app.get("/deletecookie", (req, res) => {
    res.clearCookie("name");
    res.clearCookie("email");
    res.send("cookie eliminada");
});


// practica con session

app.get("/session", (req, res) => {
    const { name } = req.query;
    res.cookie("name", name);
    if(req.session.count) {
        const contador = req.session.count ++;
        console.log(req.session)
        if(name){
            res.send(`${name}, usted visito la pagina ${contador} veces`)
        }
        res.send(`usted visito la pagina ${contador} veces`)
    }
    if(name){
        req.session.count = 1;
        res.send(`Bienvenido ${name}`)
    }
    else{
        req.session.count = 1;
        res.send("Bienvenido por primera vez usuario");
    }
});



app.use("/", router);

export default app;