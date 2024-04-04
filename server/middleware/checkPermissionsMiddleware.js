const { Course, UserRole, Group } = require('../models/models');

module.exports = function (allowedRoles) {
	return async function (req, res, next) {
		try {
			const group = await Course.findOne({
				where: { id: req.params.courseId },
				include: {
					model: Group,
					attributes: ['group_name']
				}
			});
			console.log("group" + JSON.stringify(group))
			const roleTitle = req.user.title
			console.log(roleTitle)
			if (!(allowedRoles.includes(roleTitle))) {
				return res.status(403).json({ message: "Нет доступа" });
			}

			next()
		} catch (error) {
			console.log(error)
			res.status(401).json({ message: "Не авторизован" })
		}
	}
}
