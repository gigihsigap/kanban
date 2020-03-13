# kanban

# fancy-todo

Fancy Todo is a simple web-app to manage your to do list.

Fitur:

1. Add todo list in your main page.
2. Show all of your todo list.
3. Update your todo list by mark as completed.
4. Delete your todo list.
5. Give you a random quote to motivate your day.

 Here's the documentation:

## User

- **/register**

| Method | Header | Params | Data                                                      |
| ------ | ------ | ------ | --------------------------------------------------------- |
| `POST` | `none` | `none` | name: `string`<br>email: `string` <br> password: `string` |

| Success Response                                           | Error Response                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{_id, name, email, password}` | Status: `400` <br> Content: `{"error": ["email already registered","not a valid email" ]}` |


- **/login**

| Method | Header | Params | Data                                    |
| ------ | ------ | ------ | --------------------------------------- |
| `POST` | `none` | `none` | email: `string` <br> password: `string` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"message": "Wrong email/password!"}` |


- **/google-login**

| Method | Header                            | Params | Data   |
| ------ | --------------------------------- | ------ | ------ |
| `POST` | Google `id_token`,`name`, `email` | `none` | `none` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"message": "The verifyIdToken method requires an ID Token"}` |


## Kanban Card

This end point need authentication (sometimes authorization as well) from verified user.

- **/kanban/**
  Get all kanban cards from authenticated user.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `array of objects` | Status: `403` <br> Content: `{"message": "Jwt must be provided"}` |

- **/kanban/**
  Create a card for authenticated user.

| Method | Header | Params | Data                                    |
| ------ | ------ | ------ | --------------------------------------- |
| `POST` | `token` | `none` | title: `string` <br> subtitle: `string` <br> status: `string` <br> deadline: `date` |

| Success Response                             | Error Response                                               |
| -------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `object of todo` | Status: `403` <br> Content: `{"error": "Task name cannot be empty!"}` |

- **/kanban/:id**
  Update card's data.  This end point need authorization from verified user.

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `PUT`  | `token` | id: `string` | title: `string` <br> subtitle: `string` <br> status: `string` <br> deadline: `date` |

| Success Response                                      | Error Response                                     |
| ----------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of updated data}` | Status: `400` <br> Content: `{"message": "error"}` |


- **/kanban/:id**
  Delete a `kanban` card. This end point need authorization from verified user.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                     | Error Response                                     |
| ---------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of deleted data` | Status: `404` <br> Content: `{"message": "error"}` |

## Deploy

Server goes here: https://arcane-thicket-63347.herokuapp.com/ 
Client goes here: https://kanban-app-a9784.firebaseapp.com/
