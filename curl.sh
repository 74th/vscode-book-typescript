curl http://localhost:8080/api/tasks -X GET -H "Content-Type: application/json"
curl http://localhost:8080/api/tasks -X POST -H "Content-Type: application/json" -d '{"key": "value"}'
curl http://localhost:8080/api/tasks -X GET -H "Content-Type: application/json"
curl http://localhost:8080/api/tasks/4/done -X POST -H "Accept: application/json" -H "Content-type: application/json"
curl http://localhost:8080/api/tasks -X GET -H "Content-Type: application/json"
# curl http://localhost:8080/api/ -X GET -H "Content-Type: application/json"