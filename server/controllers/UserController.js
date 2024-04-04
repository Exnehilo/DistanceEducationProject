const APIErrors = require("../errors/APIErrors");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Group, UserRole } = require("../models/models")
const sequelize = require('../db')
const { Op } = require('sequelize');

const generateJwt = (id, email, phoneNumber, person_info, group_name, title) => {
	console.log(person_info)
	return jwt.sign(
		{ id, email, phoneNumber, person_info, group_name, title },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}

class UserController {
	async registration(req, res, next) {
		const { firstname, lastname, phoneNumber, email, password, userRoleId, groupId } = req.body
		if (!email || !password || !firstname || !lastname || !phoneNumber || !userRoleId || !groupId) {
			return next(APIErrors.badRequest('Введены не все данные'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(APIErrors.badRequest('Пользователь с таким email уже существует'))
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: hashPassword,
			phoneNumber: phoneNumber,
			groupId: groupId,
			userRoleId: userRoleId
		})
		return res.json({ message: "Успешно зарегистрирован " + JSON.stringify(user) })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({
			attributes: [
				['id', 'id'],
				['phoneNumber', 'phoneNumber'],
				'email',
				'password',
				[sequelize.literal(`"firstname" || ' ' || "lastname"`), 'person_info']
			],
			include: [
				{ model: Group, attributes: ['group_name'], required: true },
				{ model: UserRole, attributes: ['title'], required: true }
			],
			where: {
				email: email
			}
		});
		console.log(user)
		console.log(user.dataValues.person_info)
		if (!user) {
			return next(APIErrors.internalQuery('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(APIErrors.internalQuery('Указан неверный пароль'))
		}
		const token = generateJwt(user.id, user.email, user.phoneNumber, user.dataValues.person_info, user.group.group_name, user.user_role.title)
		return res.json({ token })
	}


	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.email, req.user.userRoleId)
		return res.json(token)
	}

	async changePassword(req, res, next) {
		const { oldPassword, newPassword } = req.body
		const password = await User.findByPk(req.user.id, {
			attributes: ['password'],
		})
		let comparePassword = bcrypt.compareSync(oldPassword, password.password)
		if (!comparePassword) {
			return next(APIErrors.internalQuery('Указан неверный старый пароль'))
		}
		const hashPassword = await bcrypt.hash(newPassword, 5)
		await User.update(
			{ password: hashPassword },
			{ where: { id: req.user.id } }
		)
		return res.status(200).json({ message: "Пароль обновлен" })
	}

	async getUserRoles(req, res, next) {
		try {
			return res.json(await UserRole.findAll())
		} catch (error) {
			return next(APIErrors.internalQuery("Ошибка при получении списка ролей"))
		}
	}

	async getUsersByRole(req, res, next) {
		const { role } = req.query;
		try {
			if (Array.isArray(role)) {
				const users = await User.findAll({
					include: {
						model: UserRole,
						attributes: [],
						where: { title: role }
					}
				});
				return res.json(users);
			} else {
				return res.status(400).json({ message: "Parameter 'roles' must be an array" });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}

}

module.exports = new UserController()