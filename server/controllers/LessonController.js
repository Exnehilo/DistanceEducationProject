const APIErrors = require("../errors/APIErrors");
const { Lesson, Task } = require('../models/models');
const sequelize = require('../db')

class LessonController {
	async getLessonsByCourse(req, res, next) {
		try {
			if (!req.params.courseId) return next(APIErrors.badRequest('Не указан идентификатор курса'))
			const lessons = await Lesson.findAll({
				where: { courseId: req.params.courseId },
				include: [{ model: Task, attributes: [], required: false }], // Добавляем связь с моделью Task
				attributes: [
					'id',
					'lesson_name',
					'courseId',
					[sequelize.fn('COUNT', sequelize.col('tasks.id')), 'tasksCount'] // Считаем количество заданий для каждого урока
				],
				group: ['lesson.id'] // Группируем по урокам, чтобы правильно подсчитать количество заданий
			});
			if (!lessons) return res.json({ message: 'Для данного курса нет уроков' })
			return res.json(lessons)
		} catch (error) {
			console.log(error)
			return next(error)
		}
	}

	async getAllResponsesByLesson(req, res, next) {
		try {
			const responsesWithUsers = await StudentResponse.findAll({
				attributes: ['id'],
				include: [
					{
						model: User,
						attributes: ['firstname', 'lastname'],
						where: { id: Sequelize.col('student_responses.userId') },
					},
				],
			})
			if (!responsesWithUsers) return res.json({ message: 'Для данного курса нет уроков' })

		} catch (error) {
			return next(error)
		}
	}

	async createLesson(req, res, next) {
		try {
			console.log("req.body.lesson_name: " + JSON.stringify(req.body.lesson_name))
			console.log("req.params.courseId: " + JSON.stringify(req.params.courseId))
			const existingLesson = await Lesson.findOne({
				where: { lesson_name: req.body.lesson_name }
			})
			if (existingLesson) {
				return next(APIErrors.badRequest("Такой урок уже существует"));
			}

			return res.json(await Lesson.create({
				lesson_name: req.body.lesson_name,
				courseId: req.params.courseId
			}))
		} catch (error) {
			console.log(error)
			return next(error)
		}
	}
}

module.exports = new LessonController();
