const { Pool } = require('pg')
const { database, password } = require('pg/lib/defaults')

const DbConfig = {
    user: 'lmadyusr',
    host: 'bubble.db.elephantsql.com',
    database: 'lmadyusr',
    password: 'cZsrzEY-Q30WAWZxcVrnuMEEDeibzjIN',
    port: 5432
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)

    } catch (error) {
        console.log('Erro ao executar SQL', + error)
    }

}