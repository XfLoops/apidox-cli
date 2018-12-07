# Group Question

Resources related to questions in the API.


## List All Questions [GET /questions]

+ Response 200 (application/json)

   <!-- include(data/questions.json) -->


## View a Questions Detail [GET /questions/{question_id}/detail]

+ Parameters
    + question_id (string) - The question id

+ Response 200 (application/json)

    <!-- include(data/question.json) -->


## Create a New Question [POST /question/create]

You may create your own question using this action. It takes a JSON object containing a question and a collection of answers in the form of choices.

+ Request (application/json)
    {
        "question": "Favourite programming language?",
        "choices": [
            "Swift",
            "Python",
            "Objective-C",
            "Ruby"
        ]
    }

+ Response 201 (application/json)

