const APIErrors = require("../errors/APIErrors");
const { sequelize, StudentResponse, Course } = require('../models/models');

class ResponseController {
	async getAllResponsesByLesson(req, res, next) {
		try {
			const responseStatusQuery = `
			SELECT 
				users.id,
				users.firstname, 
				users.lastname, 
				COUNT(DISTINCT sr."taskId") AS responses_count,
				(SELECT COUNT(*) FROM tasks WHERE "lessonId" = ${req.params.lessonId}) AS total_tasks,
				CASE 
				WHEN COUNT(DISTINCT sr."taskId") > 0 THEN 'Have response' 
				ELSE 'No response' 
				END AS response_status
			FROM users
			LEFT JOIN student_responses sr ON users.id = sr."userId" AND sr."lessonId" = ${req.params.lessonId}
			WHERE users."groupId" = (SELECT "groupId" FROM courses WHERE id = ${req.params.courseId})
			GROUP BY users.id, users.firstname, users.lastname
			`;
			return res.json(await sequelize.query(responseStatusQuery, {
				type: sequelize.QueryTypes.SELECT
			}))
		} catch (error) {
			next(error);
		}
	}
	async getResponseByStudent(req, res, next) {
		try {
			const responseByStudentQuery = `
			SELECT 
				sr.response_text,
				sr.response_filepath,
				sr.response_date,
				t.description
			FROM student_responses sr
			JOIN tasks t ON t.id = sr."taskId"
			WHERE sr."lessonId" = ${req.params.lessonId} AND sr."userId" = ${req.params.userId} 
			`
			return res.json(await sequelize.query(responseByStudentQuery, {
				type: sequelize.QueryTypes.SELECT
			}))
		} catch (error) {
			next(error)
		}
	}

	async sendResponse(req, res, next) {
		try {
			existingResponse = await StudentResponse.findOne({
				where: { taskId: req.body.taskId, lessonId: req.params.lessonId, userId: req.user.id }
			})
			if (existingResponse) return next(APIErrors.badRequest("Есть ответ данного студента на задачу"))
			const allowedGroup = await Course.findByPk(req.params.courseId)
			if (allowedGroup.groupId != req.user.groupId) return next(APIErrors.badRequest("Нет доступа"))
			return res.json(await StudentResponse.create({
				responseText: req.body.responseText,
				response_filepath: req.body.response_filepath,
				response_date: Date.now(),
				taskId: req.body.taskId,
				lessonId: req.params.lessonId,
				userId: req.user.id
			}))
		} catch (error) {
			console.log(error)
			next(error)
		}
	}
}

module.exports = new ResponseController()
