const async = require('hbs/lib/async');
var pool = require ('./db');


/*Listar*/
async function getNovedades(){
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;

}

/*insertar*/
async function insertNovedades(obj){
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


/*eliminar*/
async function deleteNovedadesById(id){
  
        var query = "delete from novedades where id = ?";
        var rows = await pool.query(query, [id]);
        return rows;
    } 


    /*para modificar > traer una novedad por id*/

async function getNovedadesById(id){
    var query = 'select * from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

/*para modificar UPDATE de los datos*/

async function modificarNovedadesById(obj, id) {
    try{
        var query = 'update novedades set ? whare id = ?';
        var rows = await pool.query( query, [obj, id]);
        return rows;
   } catch (error){
       throw error;
   }
}


/*para modificar => traer la novedad por id*/
async function getNovedadesById (id) {
    var query = 'select * from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];         
    }

/*para modificar UPDATE de los datos*/

async function modificarNovedadesById(obj, id){
    try {
        var query = 'update novedades set ? where id=?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}


module.exports = {getNovedades, insertNovedades, deleteNovedadesById, getNovedadesById, modificarNovedadesById} 