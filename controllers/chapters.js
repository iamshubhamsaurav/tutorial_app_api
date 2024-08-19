const Chapter = require('../models/Chapter')
const asyncHandler = require('../utils/asyncHandler')

exports.getChapters = asyncHandler(async(req, res, next) => {

        const chapters = await Chapter.find()
        
        res.status(200).json({
            success: true,
            count: chapters.length,
            chapters
        })
})

exports.createChapter = asyncHandler(async(req, res, next) => {
        const chapter = await Category.create(req.body)
        
        res.status(201).json({
            success: true,
            chapter
        })
})


exports.getChapter = asyncHandler(async(req, res, next) => {
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
    
})

exports.updateChapter = asyncHandler(async(req, res, next) => {
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
        
})

exports.deleteChapter = asyncHandler(async(req, res, next) => {
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
})