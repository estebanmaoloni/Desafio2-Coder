import express from "express"
import productManager from "./data/fs/ProductManager.fs.js"
import userManager from "./data/fs/UserManager.fs.js"

const server = express()
const port = 8080
const ready = () => console.log("Server redy on port: " + port)

server.listen(port, ready)

server.use(express.urlencoded({
    extended: true
}))

server.get("/", async (req, resp) => {
    try {
        return resp.status(200).json({
            resp: "API SUCCESS",
            success: true
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            resp: "API FAILED",
            success: false
        })
    }
})

//Products

server.get("/api/products/:title/:price", async(req, resp)=>{
    try {
        const { title, price } = req.params
        const data = {title, price}
        const one = await productManager.create(data)
        return resp.status(201).json({
            resp: data,
            success: true
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            resp: "ERROR",
            success: false
        })
    }
})

server.get("/api/products", async(req, resp)=>{
    try {
        const {category} = req.query
        const all = await productManager.read(category)
        return resp.status(201).json({
            resp: all,
            category,
            success: true
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            resp: "ERROR",
            success: false
        })
    }
})

server.get("/api/products/:pid", async(req, resp)=>{
    try {
        const {pid} = req.params
        const one = await productManager.readOne(pid)
        if (one) {
            return resp.status(200).json({
                resp: one,
                success: true
            })
        }else{
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error)
        return resp.status(error.statusCode).json({
            resp: "ERROR",
            success: false
        })
    }
})


//Users

server.get("/api/users/:email", async(req, resp)=>{
    try {
        const { email } = req.params
        const data = {email}
        const one = await userManager.create(data)
        return resp.status(201).json({
            resp: data,
            success: true
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            resp: "ERROR",
            success: false
        })
    }
})

server.get("/api/users", async(req, resp)=>{
    try {
        const {role} = req.query
        const all = await userManager.read(role)
        return resp.status(201).json({
            resp: all,
            role,
            success: true
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            resp: "ERROR",
            success: false
        })
    }
})

server.get("/api/users/:uid", async(req, resp)=>{
    try {
        const {uid} = req.params
        const one = await userManager.readOne(uid)
        if (one) {
            return resp.status(200).json({
                resp: one,
                success: true
            })
        }else{
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error)
        return resp.status(error.statusCode).json({
            resp: "ERROR",
            success: false
        })
    }
})