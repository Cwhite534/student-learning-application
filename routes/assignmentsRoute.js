const { Assignment } = require('../models/assignment')
const { WarningMessage, SuccessMessage } = require('../middleware/message')

/**
 * @api {get} /api/assignment/:id Get Assignment Information
 * @apiVersion 0.9.0
 * @apiName GetAssignment
 * @apiGroup Assignment
 *
 * @apiParam {Number} id Assignment ObjectId
 *
 * @apiSuccess {String} assignment Assignment object with [videos], [letters],
 *    [words], _id, name. Words is populated
 *
 * @apiSuccessExample Success-Response:
 *    {
 *      "assignment": {
 *        "videos": [],
 *        "letters": [
 *          "a",
 *          "b",
 *          "c"
 *        ],
 *        "words": [
 *          {
 *            "_id": "<id>",
 *            "text": "cab",
 *            "picture": "<url>",
 *            "__v": 0
 *          }
 *        ],
 *        "_id": "<id>",
 *        "name": "Assignment 1",
 *        "__v": 0
 *      }
 *    }
 *
 * @apiError (404) IdNotFound The id of that Assignment was not found
 *
 * @apiErrorExample
 *    {
 *      "error": "Assignment with that id of (<id>) could not be found"
 *    }
 *
 */
let getAssignmentById = async (req, res) => {
  let assignmentId = req.params.id

  let assignment = await Assignment.findById(assignmentId).populate('words')

  if (!assignment) {
    const err = `Assignment with that id of (${assignmentId}) could not be found`
    WarningMessage(err)
    return res.status(404).send({ error: err })
  }

  SuccessMessage(`Assignment with id of (${assignmentId}) was found`)
  res.send({ assignment })
}

module.exports = { getAssignmentById }
