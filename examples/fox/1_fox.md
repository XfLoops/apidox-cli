# Group Gist Fox API

## Retrieve a Gist [GET /gist/{id}]

+ Parameters
    + id (string) - ID of the Gist in the form of a hash.

+ Response 200 (application/hal+json)

  {
      "_links": {
          "self": { "href": "/" },
          "gists": { "href": "/gists?{since}", "templated": true },
          "authorization": { "href": "/authorization"}
      }
  }


## Add a Gist [POST /gist/create]

To update a Gist send a JSON with updated value for one or more of the Gist resource attributes. 

+ Request (application/json)
        {
            "content": "Updated file contents"
        }

+ Response 201


## Edit a Gist [PATCH /gist/{id}]

To update a Gist send a JSON with updated value for one or more of the Gist resource attributes. 

+ Parameters
    + id (string) - ID of the Gist in the form of a hash.

+ Request (application/json)

        {
            "content": "Updated file contents"
        }

+ Response 200


## Delete a Gist [DELETE /gist/{id}]

+ Parameters
    + id (string) - ID of the Gist in the form of a hash.

+ Response 204
