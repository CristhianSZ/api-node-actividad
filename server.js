const express = require('express');
const morgan = require('morgan');//Morgan me permite ver por consola que petciones se estan haciendo identificando el verbo y la sintaxis
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON
app.use(morgan('tiny'));
// Repositorio de datos: un array de objetos en memoria.
let productos = [
    { id: 1, nombre: "Laptop", precio: 1200 },
    { id: 2, nombre: "Mouse", precio: 25 },
    { id: 3, nombre: "Teclado", precio: 75 }
];

// --- Endpoints de la API


// GET: Obtiene todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// POST: Crea un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// TAREA: Agregar un endpoint PUT para actualizar un producto.
// Deberá recibir el ID del producto y los nuevos datos en el body.
app.put('/productos/:id', (req, res) => {  
    const id = parseInt(req.params.id);  
    const datosActualizados = req.body;  
      
    const index = productos.findIndex(p => p.id === id);  
    if (index === -1) {  
        return res.status(404).json({ message: 'Producto no encontrado' });  
    }  
      
    productos[index] = { ...productos[index], ...datosActualizados };  
    res.status(200).json({  
        message: 'Producto actualizado con éxito',  
        data: productos[index]  
    });  
});

// TAREA: Agregar un endpoint DELETE para eliminar un producto.
// Deberá recibir el ID del producto en los parámetros de la URL.
app.delete('/productos/:id', (req, res) => {  
    const id = parseInt(req.params.id);  
      
    const index = productos.findIndex(p => p.id === id);  
    if (index === -1) {  
        return res.status(404).json({ message: 'Producto no encontrado' });  
    }  
      
    const productoEliminado = productos.splice(index, 1)[0];  
    res.status(200).json({  
        message: 'Producto eliminado con éxito',  
        data: productoEliminado  
    });  
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

//Para iniciar el servidor user npm run dev (se iniciara a ejecutar nodemon: libreria para reiniciar el servidor automaticamente tras cada guardado)
