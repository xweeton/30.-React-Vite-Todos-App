import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function Addtodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-3">Add Todo</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault(); //prevent auto refresh
          setTodos([
            ...todos,
            { id: Date.now(), title, description, completed },
          ]);
          navigate("/");
        }}
      >
        <Form.Group className="mb-3" controlId="todos-title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            placeholder="Get software developer job"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="todos-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            rows={3}
            value={description}
            placeholder={
              "1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview"
            }
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="todos-checkbox">
          <Form.Check
            type="checkbox"
            id="completed"
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
