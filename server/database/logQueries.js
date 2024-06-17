import { initialize, close } from '../config/mySqlConfig.js';

export async function getLogsFromView() {
  let conn;
  try {
    conn = await initialize();
    const [results] = await conn.query("SELECT * FROM vista_logs");

    if (!Array.isArray(results)) {
      throw new TypeError('Expected results to be an array');
    }

    const rows = results.length > 0 ? results : [];
    return rows;
  } catch (error) {
    console.error('Error al obtener los logs desde la vista:', error);
    throw error;
  } finally {
    if (conn) {
      await close(conn);
    }
  }
}
