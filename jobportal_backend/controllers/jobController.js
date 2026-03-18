const db = require('../db/db');

// @ts-ignore
exports.postJob = async (req, res) => {
    const { posted_by, title, description, company, location, salary } = req.body;
    try {
        const sql = "INSERT INTO jobs (posted_by, title, description, company, location, salary) VALUES (?, ?, ?, ?, ?, ?)";
                await db.query(sql, [posted_by, title, description, company, location, salary]);
        res.status(201).json({ 
            message: "Job successfully post bhayo",
            job: { title, company } 
        });
    } catch (err) {
        console.error("Job Post Error:", err);
        res.status(500).json({ message: "Job post garna milena, database check garney suru ma ." });
    }
};
// @ts-ignore
exports.getAllJobs = async (req, res) => {
    try {
        const [jobs] = await db.query("SELECT * FROM jobs ORDER BY created_at DESC");
        res.status(200).json(jobs);
    } catch (err) {
        console.error("Fetch Jobs Error:", err);
        res.status(500).json({ message: "Jobs fetch garna sakina." });
    }
};