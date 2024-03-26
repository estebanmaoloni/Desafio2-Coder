// const fs = require("fs")
// const crypto = require("crypto")

import fs from"fs"
import crypto from"crypto"

class ProductManagerFs {

  constructor() {
    this.path = "./data/fs/files/products.json"
    this.init()
  }

  init() {
    const exist = fs.existsSync(this.path)
    if (!exist) {
      const productData = JSON.stringify([], null, 2)
      fs.writeFileSync(this.path, productData)
      console.log("¡Archivo fue creado!")
    } else {
      console.log("El archivo ya fue creado y contiene datos")
    }
  }

  async create(data) {
    try {
      if (!data.title || !data.price) {
        const error = new Error("El campo titulo y precio son obligatorios") //Forma de manejo de errores
        throw error //Forma de manejo de errores
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "https://us.123rf.com/450wm/belopoppa/belopoppa1809/belopoppa180900002/109693900-imagen-de-marcador-de-posici%C3%B3n-de-perfil-silueta-gris-sin-foto-de-una-persona-en-el-avatar-la.jpg",
          category: data.category || "to do",
          price: data.price,
          stock: data.stock || 0
        };
        let readData = await fs.promises.readFile(this.path, "utf-8")
        readData = JSON.parse(readData)
        readData.push(product)
        readData = JSON.stringify(readData, null, 2)
        await fs.promises.writeFile(this.path, readData)
        console.log("¡Producto creado con exito!")
      }
    } catch (error) {
      throw error
    }
  }

  async read(cat) {
    try {
      let readData = await fs.promises.readFile(this.path, "utf-8")
      readData = JSON.parse(readData)
      if (cat) {
        readData = readData.filter(each=>each.category === cat)
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
        console.log("Producto encontrado")
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

// async function productGenerator() {

//   try {

//     const gestorDeProductos = new ProductManagerFs()

//     //await gestorDeProductos.read()
//     //await gestorDeProductos.readOne("") //Colocar el ID del producto que quiere buscar
//     //await gestorDeProductos.destroy("") //Colocar el ID del producto que quiere eliminar

//     //Producto 1
//     await gestorDeProductos.create({
//       title: "Zapatilla",
//       photo: "",
//       category: "Calzado",
//       price: 100,
//       stock: ""

//     })

//     // //Producto 2 (Prueba de error)
//     // await gestorDeProductos.create({
//     //   title: "Botines",
//     //   category: "Calzado",
//     //   price: "",
//     //   stock: 300

//     // })

//     //Producto 3
//     await gestorDeProductos.create({
//       title: "Pantalon",
//       category: "Prendas",
//       price: 45,
//       stock: 200

//     })

//     //Producto 4
//     await gestorDeProductos.create({
//       title: "Remera",
//       photo: "",
//       category: "Prendas",
//       price: 50,
//       stock: 100

//     })

//     // //Producto 5 (Prueba de error)
//     // await gestorDeProductos.create({
//     //   title: "",
//     //   category: "Prendas",
//     //   price: 25,
//     //   stock: 40

//     // })

//     //Producto 6
//     await gestorDeProductos.create({
//       title: "Medias",
//       photo: "",
//       category: "Prendas",
//       price: 10,
//       stock: 500

//     })

//     //Producto 7
//     await gestorDeProductos.create({
//       title: "Boxers",
//       photo: "",
//       category: "Ropa interior",
//       price: 18,
//       stock: 300

//     })

//     //Producto 8
//     await gestorDeProductos.create({
//       title: "Aros",
//       photo: "",
//       category: "Joyeria",
//       price: 150,
//       stock: 10

//     })

//     //Producto 9
//     await gestorDeProductos.create({
//       title: "Reloj",
//       category: "Joyeria",
//       price: 500,
//       stock: 5

//     })

//     //Producto 10
//     await gestorDeProductos.create({
//       title: "Anillos",
//       photo: "",
//       category: "Joyeria",
//       price: 220,
//       stock: 8

//     })
//   } catch (error) {
//     throw error
//   }
// }


// productGenerator()

const productManager = new ProductManagerFs()
export default productManager