import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Edittodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const navigate = useNavigate();
  const { id: stringId } = useParams(); //useParems to hook curremt URL parameter, "id" and renames it as "stringId."
  const id = parseInt(stringId, 10); //defined str id become int with base 10 decimal
  const todoToEdit = todos.find((todo) => todo.id === id);

  useEffect(() => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setDescription(todoToEdit.description);
      setCompleted(todoToEdit.completed);
    }
  }, [id, todos]);

  return (
    <Container>
      <h1 className="my-3">Edit Todo</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          // Find the index of the todo with the specified id

          if (todoToEdit) {
            const updatedTodos = todos.map((todo) => {
              if (todo.id === id) {
                return {
                  ...todo,
                  title,
                  description,
                  completed,
                };
              }
              return todo;
            });

            // Set the updated todos array in the context
            setTodos(updatedTodos);
            console.log("Updated todos:", updatedTodos);
          }

          // Navigate back to the main page
          navigate("/");
          console.log("ID from params:", id);
          console.log("Current todos:", todos);
          console.log("Title:", title);
          console.log("Description:", description);
          console.log("Completed:", completed);
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
