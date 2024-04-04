const { Sequelize } = require('../db');
const APIErrors = require('../errors/APIErrors');
const { Test } = require('../models/models');
const { Question, TestAnswer } = require('../models/models');

class TestController {
	async createTest(req, res, next) {
		try {
			// моделька разная, дропну схему и все норм будет
			const candidate = { title: req.body.title, description: req.body.description, lessonId: req.params.lessonId }
			return res.json(await Test.create(candidate))
		} catch (error) {
			console.log(error)
			next(error)
		}
	}

	async addQuestionsAndAnswers(req, res, next) {
		const { questions } = req.body;

		try {
			const createdQuestions = await Promise.all(questions.map(async (questionData) => {
				const createdQuestion = await Question.create({
					difficultyLevel: questionData.difficultyLevel,
					title: questionData.title,
					time_limit: questionData.time_limit,
					testId: req.params.testId
				});

				const createdAnswers = await Promise.all(questionData.answers.map(async (answerData) => {
					return TestAnswer.create({
						answer_text: answerData.answer_text,
						is_correct: answerData.is_correct,
						questionId: createdQuestion.id,
					});
				}));

				return {
					question: createdQuestion,
					answers: createdAnswers,
				};
			}));

			res.status(201).json({ createdQuestions });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}

module.exports = new TestController()