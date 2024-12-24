const db = require('../db');

// Lấy câu hỏi và các lựa chọn
exports.getPollWithOptions = (req, res) => {
  const pollId = req.params.id;

  db.query('SELECT * FROM polls WHERE id = ?', [pollId], (err, polls) => {
    if (err) return res.status(500).send(err);

    db.query('SELECT * FROM options WHERE poll_id = ?', [pollId], (err, options) => {
      if (err) return res.status(500).send(err);
      res.json({ poll: polls[0], options });
    });
  });
};

// Cập nhật số phiếu bầu cho lựa chọn
exports.voteForOption = (req, res) => {
  const optionId = req.params.id;

  db.query('UPDATE options SET votes = votes + 1 WHERE id = ?', [optionId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Vote added successfully');
  });
};

// Lấy tất cả câu hỏi
exports.getAllPolls = (req, res) => {
  db.query('SELECT * FROM polls', (err, polls) => {
    if (err) return res.status(500).send(err);
    res.json(polls);
  });
};
