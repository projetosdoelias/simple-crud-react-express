const Teacher = require('../models/teacher.model')

findAll = (req, res) => {
    Teacher.findAll((err, teacher) => {
        if (err)
            res.status(400).send(err);

        res.send(teacher)
    });
};

create = (req, res) => {

    console.log(req.body);
    console.log(req);
    const newTeacher = new Teacher(req.body);

    Teacher.create(newTeacher, (err, teacher) => {
        if (err)
            res.status(400).send(err);

        res.json({ error: false, message: "Professor adicionado com sucesso!", data: teacher });
    });

}

deleta = (req, res) => {
    Teacher.delete(req.params.id, function (err, teacher) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Professor deletado com sucesso' });
    });
};


update = function (req, res) {
    
    Teacher.update(req.params.id, new Teacher(req.body), function (err, teacher) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Professor editado com sucesso' });
    });

};

module.exports = {
    create,
    findAll,
    deleta,
    update
}