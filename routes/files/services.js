const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { MILESTONES_FIELD, MESSAGES, ALLOWED_FORMATS, GPT_PROPMTS } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { Milestone } = require('../../models/milestone');
const { File } = require('../../models/file');
const { FILES_FIELD } = require('../../models/file/constant');
const { UPLOAD, UPLOAD_BASE } = require('../../utils/fileUpload');
const PDFParser = require('pdf-parse');
const fs = require('fs');
const { cleanUploadedFile } = require('../../utils/cleanUploadedFile');
const { MINE_PAPER } = require('../../utils/paperMiner');
// const { useChatGPT } = require('../../utils/useChatGPT.mjs');

//add new paper
const addNewPaper = async (req, res) => {
    // const student = await User.findById(req.user._id)
    // const sups = await Supervisor.findById(req.user._id)
    // const user = student ?? sups

    const file = req.file
    if (!file) return res.status(400).json({ error: MESSAGES.NO_FILE });
    if (!ALLOWED_FORMATS.includes(file.mimetype)) return res.status(400).json({ error: MESSAGES.BAD_FORMAT });

    // const fileName = file.originalname
    // const fileFormat = fileName.split('.').pop()
    // const fileAlias = crypto.randomBytes(6).toString('hex')

    // const upload_res = await UPLOAD(file, fileAlias + '.' + fileFormat, 'papers', false)
    // if (!upload_res) return res.status(500).json({ error: MESSAGES.UPLOAD_FAILED });

    const newFile = new File(_.pick(req.body, FILES_FIELD))

    // newFile.name = req.body.name ?? fileName
    // newFile.url = UPLOAD_BASE + 'papers/' + fileAlias + '.' + fileFormat
    // newFile.alias = fileAlias
    // newFile.Initiator = user._id
    // newFile.size = file.size
    // newFile.format = fileFormat
    // newFile.type = 'paper'

    // await newFile.save()

    try {
        const pdf = await PDFParser(file.path, {});
        const textContent = pdf.text;
        const importantParts = MINE_PAPER(textContent)
        if (importantParts.length > 100) {
            import('../../utils/useChatGPT.mjs')
                .then(async ({ useChatGPT }) => {
                    const prompt = GPT_PROPMTS.MINE_PAPER_TAGS + importantParts
                    const response = await useChatGPT(prompt)
                    console.log(response)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    } catch (error) {
        console.error('Error reading PDF:', error);
    } finally {
        cleanUploadedFile(file)
    }

    res.send(_.pick(newFile, FILES_FIELD.INFO))
}

//get a file
const getFileInfo = async (req, res) => {
    const file = await File.findOne({
        $or: [
            { _id: req.params.id },
            { alias: req.params.id }
        ]
    })

    file.cited = file.cited + 1
    await file.save()

    res.send(_.pick(file, FILES_FIELD.INFO))
}

//get all papers
const getAllPapers = async (req, res) => {
    const files = await File.find({
        type: 'paper'
    })

    res.send(files)
}

module.exports = {
    addNewPaper,
    getFileInfo,
    getAllPapers,
}