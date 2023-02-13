const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    lien: {
        type: String,
        required: [true, 'Pas de prénom'],
    },
    lienGithub: {
        type: String,
        required: [true, 'Pas de lien github'],
    },
    image: {
        type: String,
        required: [true, "Pas d'image"],
    },

})

const ProjectModel = mongoose.model('projects', projectSchema);

module.exports = ProjectModel