import { query } from '../../../lib/db';  // импортируем функции для работы с базой данных

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const result = await query('SELECT * FROM courses WHERE id = ?', [id]);
    if (result.length > 0) {
      res.status(200).json(result[0]);  // возвращаем первый найденный курс
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
}
