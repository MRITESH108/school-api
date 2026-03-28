const db = require("../config/db");
const getDistance = require("../utils/getDistance");


// add school
const addSchool = (req, res) => {
    try {
        let { name, address, latitude, longitude } = req.body;

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ 
                error: "All fields are required and must be valid" 
            });
        }

        const query = `
            INSERT INTO schools (name, address, latitude, longitude) 
            VALUES (?, ?, ?, ?)
        `;

        db.query(query, [name, address, latitude, longitude], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Not able to save school" });
            }

            res.status(201).json({
                message: "School added successfully",
                id: result.insertId,
            });
        });

    } catch (error) {
        console.error("Something went wrong:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// list school
const listSchool = (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({
                error: "Invalid latitude and longitude",
            });
        }

        db.query("SELECT * FROM schools", (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const schoolsWithDistance = results.map((school) => {
                const distance = getDistance(
                    userLat,
                    userLon,
                    school.latitude,
                    school.longitude
                );

                return { ...school, distance };
            });

            schoolsWithDistance.sort((a, b) => a.distance - b.distance);

            res.json({
                count: schoolsWithDistance.length,
                data: schoolsWithDistance,
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    addSchool,
    listSchool
};