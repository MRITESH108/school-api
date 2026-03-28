const express = require("express");
const { addSchool, listSchool } = require("../controllers/schoolController");

const schoolRouter = express.Router();


schoolRouter.post('/addSchool',addSchool);
schoolRouter.get('/listSchools',listSchool);

module.exports = {
    schoolRouter
}