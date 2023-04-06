const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
require('./db')
app.use(express.json());
const notemodel = require('./model/notemodel');

app.use(cors())

app.post('/addnote', async (req, res) => {
    try {
        let title = req.body.title
        let desc = req.body.description
        const createnote = new notemodel({
            title: title,
            description: desc
        });
        if (!title && !desc) {
            res.status(401).json({ error: "Please fill all data" })
        } else {
            const result = await createnote.save();
            res.json({ success: result })
        }
    } catch (e) {
        console.log(e.message);
    }
});

app.get('/getnote', async (req, res) => {
    try {
        const getall = await notemodel.find();
        res.json({ allnote: getall })
    } catch (e) {
        console.log(e.message);
    }
});

app.delete('/deletenote/:id', async (req, res) => {
    try {
        const del = await notemodel.deleteOne({ _id: req.params.id })
        res.json({ delete: del })
    } catch (e) {
        console.log(e.message);
    }
});

app.put('/editnote/:id', async (req, res) => {
    try {
        let title = req.body.title;
        let desc = req.body.description;
        let id = req.params.id;
        const edit = await notemodel.updateMany({ _id: id }, { $set: { description: desc, title: title } });
        // const edit = await notemodel.updateMany({ _id: id }, req.body);
        res.json({ success: edit })
    } catch (e) {
        console.log(e.message);
    }
})

app.listen(port, () => {
    console.log(`Application Listening on port ${port}`);
});
