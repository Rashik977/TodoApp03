Running it on your own machine:

1. pull the docker image using: docker pull rashik977/todo:3.0
2. run the image using your own .env file (contents of the env are in .env.example), run command : docker run --env-file .env -p 3000:3000 rashik977/todo:3.0
3. use Postman(or your choice of HTTP client) to use the API.

Executing:
1. There is a super user with email: super@super.com and password: 1234 . Log in from route auth/login
2. Use the access token returned to run CRUD on users. note: for now only superusers can create users.
3. log in to your created user from auth/login, and use the access token to run CRUD on only those user-specific tasks.
4. Error handling classes have been added, status codes have been added, and loggers have been added.
