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

module.exports = {getNovedades, insertNovedades} 