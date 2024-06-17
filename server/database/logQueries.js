import { initialize, close } from '../config/mySqlConfig.js';

export async function getLogsFromView() {
  let conn;
  try {
    conn = await initialize();
    const [results, fields] = await conn.query("SELECT * FROM vista_logs");

    console.log('Resultados de la consulta:', results);
    console.log('Campos de la consulta:', fields);

    if (!Array.isArray(results)) {
      throw new TypeError('Expected results to be an array');
    }

    return results;
  } catch (error) {
    console.error('Error al obtener los logs desde la vista:', error);
    throw error;
  } finally {
    if (conn) {
      await close(conn);
    }
  }
}
