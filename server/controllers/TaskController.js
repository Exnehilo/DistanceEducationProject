const APIErrors = require('../errors/APIErrors');
const { Task, Course, Test } = require('../models/models');

class TaskController {
	async getAllTasksByLesson(req, res, next) {
		try {
			const course = await Course.findByPk(req.params.courseId, {
				attributes: ['groupId'],
			})
			if (!course) return next(APIErrors.badRequest('Такого курса не существует'))
			return res.json(await Task.findAll({
				where: { lessonId: req.params.lessonId },
			}))
		} catch (error) {
			return next(error)
		}
	}

	async createTasks(req, res, next) {
		try {
			if (!Array.isArray(req.body.tasks)) return next(APIErrors.badRequest("Неверный формат данных для задач"))
			const createdTasks = [];
			for (const taskData of req.body.tasks) {
				const candidate = {
					title: taskData.title,
					task_type: taskData.task_type,
					description: taskData.description,
					lessonId: req.params.lessonId,
					answerTypeId: taskData.answerTypeId
				}
				if (!candidate.title || !candidate.task_type || !candidate.lessonId || !candidate.answerTypeId) return next(APIErrors.badRequest("Неверный формат данных"))
				const existingTask = await Task.findOne({
					where: { title: candidate.title, lessonId: candidate.lessonId }
				})
				if (existingTask) return next(APIErrors.badRequest("Такая задача в данном уроке уже существует"))
				const createdTask = await Task.create({
					title: candidate.title,
					task_type: candidate.task_type,
					description: candidate.description,
					lessonId: Number(candidate.lessonId),
					answerTypeId: candidate.answerTypeId
				})
				// if (candidate.task_type === "test") {
				// 	const testDetails = taskData.testDetails || {};
				// 	const createdTest = await Test.create({
				// 		title: testDetails.testTitle || `Тест для ${createdTask.title}`,
				// 		description: testDetails.testDescription || `Описание теста для ${createdTask.title}`
				// 	});
				// 	await Test.create(createdTest);
				// }
				createdTasks.push(createdTask)
			}
			return res.status(201).json({ createdTasks })
		} catch (error) {
			console.log(error)
			return next(error)
		}
	}
}

module.exports = new TaskController();
