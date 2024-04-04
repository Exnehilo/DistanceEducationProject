const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING, allowNull: false },
	lastname: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	phoneNumber: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

const UserRole = sequelize.define('user_role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

const QuestionType = sequelize.define('question_type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	type_name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

const AnswerType = sequelize.define('answer_type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	type_name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

const Lesson = sequelize.define('lesson', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	lesson_name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

const Group = sequelize.define('group', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	group_name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false })

const Test = sequelize.define('test', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING }
}, { timestamps: false })

const Task = sequelize.define('task', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	task_type: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING }
}, { timestamps: false })

const StudentGrades = sequelize.define('student_grades', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	grade_value: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 2, max: 5 } }
}, { timestamps: false })

const Question = sequelize.define('question', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	difficultyLevel: { type: DataTypes.INTEGER, allowNull: false, validate: { isIn: [[1, 2, 3]] } },
	title: { type: DataTypes.STRING, allowNull: false },
	time_limit: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: false })

const StudentResponse = sequelize.define('student_response', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	response_text: { type: DataTypes.STRING, allowNull: true },
	response_filepath: { type: DataTypes.STRING, allowNull: true },
	response_date: { type: DataTypes.DATE }
}, { timestamps: false })

const TestAnswer = sequelize.define('test_answer', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	answer_text: { type: DataTypes.STRING, allowNull: true },
	is_correct: { type: DataTypes.BOOLEAN, allowNull: false }
}, { timestamps: false })

const TestResult = sequelize.define('test_result', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	result_value: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false })

const Course = sequelize.define('course', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: true },
}, { timestamps: false })

const StudentParents = sequelize.define('student_parents', {

}, { timestamps: false })

User.hasOne(StudentParents)
StudentParents.belongsTo(User, { foreignKey: 'student_id' })

User.hasOne(StudentParents)
StudentParents.belongsTo(User, { foreignKey: 'parent_id' })

User.hasMany(StudentGrades)
StudentGrades.belongsTo(User)

Lesson.hasMany(StudentGrades)
StudentGrades.belongsTo(Lesson)

Group.hasMany(User)
User.belongsTo(Group)

Group.hasMany(Course)
Course.belongsTo(Group)

User.hasMany(Course, { foreignKey: 'teacher_id' });
Course.belongsTo(User, { foreignKey: 'teacher_id' });

UserRole.hasMany(User)
User.belongsTo(UserRole)

Course.hasMany(Lesson)
Lesson.belongsTo(Course)

Lesson.hasMany(Task)
Task.belongsTo(Lesson)

AnswerType.hasMany(Task)
Task.belongsTo(AnswerType)

Test.hasMany(Question)
Question.belongsTo(Test)

QuestionType.hasMany(Question)
Question.belongsTo(QuestionType)

Task.hasMany(StudentResponse)
StudentResponse.belongsTo(Task)

Lesson.hasMany(StudentResponse)
StudentResponse.belongsTo(Lesson)

User.hasMany(StudentResponse)
StudentResponse.belongsTo(User)

Question.hasMany(TestAnswer)
TestAnswer.belongsTo(Question)

User.hasMany(TestResult)
TestResult.belongsTo(User)

Test.hasMany(TestResult)
TestResult.belongsTo(Test)

Lesson.hasOne(Test)
Test.belongsTo(Lesson)

module.exports = {
	User,
	UserRole,
	QuestionType,
	AnswerType,
	Lesson,
	Group,
	Test,
	Task,
	Question,
	StudentResponse,
	TestAnswer,
	TestResult,
	Course,
	StudentGrades,
	StudentParents,
	sequelize
}

