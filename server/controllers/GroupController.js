const APIErrors = require("../errors/APIErrors");
const { Group } = require('../models/models');

class GroupController {
	async createGroup(req, res, next) {
		try {
			const { group_name } = req.body;
			const existingGroup = await Group.findOne({
				where: { group_name }
			});

			if (existingGroup) throw APIErrors.badRequest("Группа с таким именем уже существует")
			const newGroup = await Group.create({
				group_name
			})
			res.json(newGroup);
		} catch (error) {
			return next(error)
		}
	}

	async getAll(req, res, next) {
		try {
			return res.json(await Group.findAll())
		} catch (error) {
			console.log(error)
		}
	}

}

module.exports = new GroupController();
