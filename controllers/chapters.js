const Chapter = require('../models/Chapter')

exports.getChapters = async(req, res, next) => {
    try {
        const chapters = await Chapter.find()
        
        res.status(200).json({
            success: true,
            count: chapters.length,
            chapters
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

exports.createChapter = async(req, res, next) => {
    try {
        const chapter = await Category.create(req.body)
        
        res.status(201).json({
            success: true,
            chapter
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}


exports.getChapter = async(req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.id)
        
        if(!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
                error
            })
        }

        res.status(200).json({
            success: true,
            chapter
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }    
}

exports.updateChapter = async(req, res, next) => {
    try {
        let chapter = await Chapter.findById(req.params.id)
        
        if(!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
                error
            })
        }

        chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            message: "Chapter Updated!",
            chapter
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}

exports.deleteChapter = async(req, res, next) => {
    try {
        let chapter = await Chapter.findById(req.params.id)
        
        if(!chapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found",
                error
            })
        }

        chapter = await Chapter.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Chapter Deleted",
            chapter
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
}