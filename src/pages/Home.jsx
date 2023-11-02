import { useContext } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;
  const navigate = useNavigate(); // Add useNavigate

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    navigate(`/edittodo/${id}`); // Navigate to the edit page with the todo's id
  };

  return (
    <Container>
      <h1 className="my-3">Your todos</h1>
      <Row>
        <CardGroup
          todos={todos}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </Row>
    </Container>
  );
}

function CardGroup({ todos, handleDelete, handleEdit }) {
  return todos.map((todo) => {
    const completed = todo.completed;
    const bg = completed ? "success" : "danger";

    return (
      <Col md={4} key={todo.id}>
        <Card className="my-3">
          <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.description}</Card.Text>
            <Badge bg={bg}>{!completed && "Not"} Completed</Badge>
            <Button
              className="ms-2"
              variant="danger"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </Button>
            <Button
              className="ms-2"
              variant="primary"
              onClick={() => handleEdit(todo.id)}
            >
              Edit
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  });
}
