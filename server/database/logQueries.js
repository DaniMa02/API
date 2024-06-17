import { initialize } from '../config/mySqlConfig.js';

export async function getLogsFromView() {
  try {
    const connection = await initialize();
    const [rows] = await connection.execute('SELECT * FROM tu_vista_de_logs');
    await connection.end();
    return rows;
  } catch (error) {
    console.error('Error al obtener los logs desde la vista:', error);
    throw error;
  }
}
