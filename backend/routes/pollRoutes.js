const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // Lấy tất cả các câu hỏi
  router.get('/', (req, res) => {
    db.query('SELECT * FROM polls', (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  });

  // Lấy các lựa chọn cho một câu hỏi cụ thể
  router.get('/:pollId/choices', (req, res) => {
    const pollId = req.params.pollId;
    db.query('SELECT * FROM choices WHERE poll_id = ?', [pollId], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  });

  // Tăng số lượt bình chọn cho lựa chọn
  router.post('/:pollId/choices/:choiceId/vote', (req, res) => {
    const { pollId, choiceId } = req.params;
    db.query('UPDATE choices SET votes = votes + 1 WHERE id = ?', [choiceId], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Vote counted!' });
    });
  });

  return router;
};
