// const fs = require("fs")
// const crypto = require("crypto")

import fs from"fs"
import crypto from"crypto"

class UserManagerFs {

  constructor() {
    this.path = "./data/fs/files/users.json"
    this.init()
  }

  init() {
    const exist = fs.existsSync(this.path)
    if (!exist) {
      const userData = JSON.stringify([], null, 2)
      fs.writeFileSync(this.path, userData)
      console.log("¡Archivo fue creado!")
    } else {
      console.log("El archivo ya fue creado y contiene datos")
    }
  }

  async create(data) {
    try {
      if (!data.email) {
        const error = new Error("El campo email es obligatorio") //Forma de manejo de errores
        throw error //Forma de manejo de errores
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          foto: data.foto || "https://us.123rf.com/450wm/belopoppa/belopoppa1809/belopoppa180900002/109693900-imagen-de-marcador-de-posici%C3%B3n-de-perfil-silueta-gris-sin-foto-de-una-persona-en-el-avatar-la.jpg",
          email: data.email,
          password: data.password,
          role: data.role || 0
        };
        let readData = await fs.promises.readFile(this.path, "utf-8")
        readData = JSON.parse(readData)
        readData.push(user)
        readData = JSON.stringify(readData, null, 2)
        await fs.promises.writeFile(this.path, readData)
        console.log("¡Usuario creado con exito!")
      }
    } catch (error) {
      throw error
    }
  }


  async read(rol) {
    try {
      let readData = await fs.promises.readFile(this.path, "utf-8")
      readData = JSON.parse(readData)
      if (rol) {
        readData = readData.filter(each=>each.role === rol)
      }
      console.log(readData)
      return readData
    } catch (error) {
      throw (error)
    }
  }

  async readOne(id) {
    try {
      let readData = await fs.promises.readFile(this.path, "utf-8")
      readData = JSON.parse(readData)
      let one = readData.find((each) => each.id === id)
      if (!one) {
        throw new Error("Id no encontrado")
      } else {
        console.log(one)
        console.log("Usuario encontrado")
        return one
      }
    } catch (error) {
      throw (error)
    }
  }

  async destroy(id) {
    try {
      let readData = await fs.promises.readFile(this.path, "utf-8")
      readData = JSON.parse(readData)
      let one = readData.find((each) => each.id === id)
      if (!one) {
        throw new Error("Id no encontrado")
      } else {
        let filtered = readData.filter((each) => each.id !== id)
        filtered = JSON.stringify(filtered, null, 2)
        await fs.promises.writeFile(this.path, filtered)
        console.log(one)
        return one
      }
    } catch (error) {
      throw (error)
    }
  }
}


// async function usersGenerator() {

//   try {
//     const gestorDeUsuarios = new UserManagerFs()

//     //await gestorDeUsuarios.read()
//     //await gestorDeUsuarios.readOne("") //Colocar el ID del producto que quiere buscar
//     //await gestorDeUsuarios.destroy("") //Colocar el ID del producto que quiere eliminar

//     //Usuario 1
//     await gestorDeUsuarios.create({
//       email: "lautaro@gmail.com",
//       password: "lau12345",
//       role: "Usuario"
//     })

//     //Usuario 2
//     await gestorDeUsuarios.create({
      
//       email: "matias@gmail.com",
//       password: "mati12345",
//       role: "Administrador"
//     })

//     //Usuario 3 
//     await gestorDeUsuarios.create({
//       foto: "https://img.freepik.com/foto-gratis/apuesto-joven-brazos-cruzados-sobre-fondo-blanco_23-2148222620.jpg",
//       email: "jorge@gmail.com",
//       password: "jorge12345",
//       role: "Administrador"
//     })

//     // //Usuario 4 (Prueba de error)
//     // await gestorDeUsuarios.create({
//     //   foto: "https://img.freepik.com/foto-gratis/retrato-sonriente-joven-feliz-aislado-blanco_186202-6708.jpg",
//     //   email: "",
//     //   password: "agustin12345",
//     //   role: "Administrador"
//     // })

//     //Usuario 5 
//     await gestorDeUsuarios.create({
      
//       email: "alberto@gmail.com",
//       password: "agustin12345",
//       role: "Usuario"
//     })

//     //Usuario 6
//     await gestorDeUsuarios.create({
//       foto: "https://img.freepik.com/foto-gratis/retrato-hombre-guapo-sonriente_329181-1660.jpg",
//       email: "juan@gmail.com",
//       password: "agustin12345",
//       role: "Usuario"
//     })

//     //Usuario 7
//     await gestorDeUsuarios.create({
//       foto: "",
//       email: "alan@gmail.com.jpg",
//       password: "agustin12345",
//       role: "Usuario"
//     })

//   } catch (error) {
//     throw error
//   }

// }

// usersGenerator()

const userManager = new UserManagerFs()
export default userManager