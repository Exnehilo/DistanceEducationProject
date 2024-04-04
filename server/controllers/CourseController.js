const { Course, UserRole, User, Lesson, Group } = require("../models/models")
const APIErrors = require("../errors/APIErrors")
const sequelize = require('../db')

class CourseController {
	async getAll(req, res, next) {
		try {
			switch (req.user.title) {
				case 'student':
					const query = `
						SELECT
							c.id,
							c.title,
							u.firstname || ' ' || u.lastname AS teacher_info,
							COUNT(l.id) AS lesson_count
						FROM
							courses c
							JOIN users u ON c.teacher_id = u.id
							LEFT JOIN lessons l ON l."courseId" = c.id
							JOIN groups g ON c."groupId" = g.id
						WHERE
							g.group_name = '${req.user.group_name}'
						GROUP BY
							c.id, u.id;
					`;
					sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
						.then(results => {
							res.json(results);
						});
					break;
				case 'admin':
					const select = `
						SELECT
							c.id,
							c.title,
							u.firstname || ' ' || u.lastname AS teacher_info,
							COUNT(l.id) AS lesson_count
						FROM
							courses c
							JOIN users u ON c.teacher_id = u.id
							LEFT JOIN lessons l ON l."courseId" = c.id
						GROUP BY
							c.id, u.id;
					`;
					sequelize.query(select, { type: sequelize.QueryTypes.SELECT })
						.then(results => {
							res.json(results);
						});
					break;
				case 'teacher':
					res.json(await Course.findAll({
						where: { teacher_id: req.user.id }
					}));
					break;
			}
		} catch (error) {
			console.log(error)
			return next(error)
		}
	}


	async createCourse(req, res, next) {
		console.log(req.body.teacherId)
		try {
			if (!req.body.title || !req.body.groupId || !req.body.teacher_id) return next(APIErrors.badRequest("Введены не все данные для создания курса"));
			const existingCourse = await Course.findOne({
				where: { title: req.body.title, groupId: req.body.groupId }
			})
			if (existingCourse) {
				console.log("существует")
				return next(APIErrors.badRequest("Такой курс уже существует"))
			} else {
				return res.json(await Course.create({
					title: req.body.title,
					groupId: req.body.groupId,
					teacher_id: req.body.teacher_id
				}))
			}
		} catch (error) {
			console.log(error)
			return next(error)
		}
	}
}

module.exports = new CourseController()
