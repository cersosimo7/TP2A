const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

client.connect((err, result) =>{
    if(!err){
        console.log(chalk.blue('Cliente conectado'));
        // Trae la colección de inventores
        let collection = result.db("sample_betp2").collection("inventors");
        
        // No sé si había que modificar esto, de por sí find() trae los 20 primeros, tengo entendido.
        collection.find().limit(20).toArray((err, result) => {
            console.log(result);
            crud(collection);
        });
    } else {
        console.log(chalk.red(err));
    }
});

// Insertar
function insertInventor(collection){
    return new Promise((resolve)=>{
        const nuevoInventor = {
                    first: "Brian",
                    last: "Cersosimo",
                    year: 1995
                }
        resolve(collection.insertOne(nuevoInventor));
    });
}

// Actualizar
function updateInventor(collection){
    return new Promise((resolve)=>{
        resolve(collection.updateOne({last: "Cersosimo"}, {$set: {year: 2000}}))
    });
}

// Eliminar
function deleteInventor(collection){
    return new Promise((resolve)=>{
        resolve(collection.deleteOne({last: "Cersosimo"}))
    });
}

/**
 * 
 * @param {*} collection Colección de inventores
 */
// Función asincrónica con métodos que retornan promesas o mensajes de error.
async function crud(collection){

    await insertInventor(collection)
        .then( () => {console.log(chalk.yellow("Inventor insertado correctamente"))
        })
        .catch(error => {
            console.log("Error al insertar", error)
        });

    await updateInventor(collection)
        .then( () => {
            console.log(chalk.yellow("Inventor actualizado correctamente"))
        })
        .catch(error => {
            console.log("Error al actualizar", error)
        });

    await deleteInventor(collection)
        .then( () => {
            console.log(chalk.yellow("Inventor eliminado correctamente"))
        })
        .catch(error => {
            console.log("Error al eliminar", error)
        });

}