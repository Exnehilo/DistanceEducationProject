const { Sequelize } = require('sequelize')
const APIErrors = require('../errors/APIErrors');
const { StudentGrades } = require('../models/models');

class GradeController {
	async setGrade(req, res, next) {
		try {
			console.log(req.params)
			const gradeRecord = await StudentGrades.findOne({
				where: {
					userId: req.params.userId,
					lessonId: req.params.lessonId,
				},
			})
			if (gradeRecord) {
				return next(APIErrors.badRequest('Студент имеет оценку за данный урок'))
			}
			await StudentGrades.create({
				grade_value: req.body.grade_value,
				userId: req.params.userId,
				lessonId: req.params.lessonId
			})
			return res.status(200).json({ message: `Добавлена оценка студенту ${req.params.userId} за урок ${req.params.lessonId}` })
		} catch (error) {
			if (error instanceof Sequelize.ValidationError) {
				return next(APIErrors.badRequest(!req.params.userId ? "Не выбран студент для оценивания" : "Вставляемая оценка выходит за диапазон [2-5]"))
			}
			return next(error)
		}
	}
}

module.exports = new GradeController()