import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Addtodo from "./pages/AddTodo";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import EditTodo from "./pages/EditTodo";

function Layout() {
  return (
    <>
      <Navbar bg="warning" variant="warning">
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link href="/addtodo">AddTodo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/addtodo" element={<Addtodo />} />
            <Route path="/edittodo/:id" element={<EditTodo />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}
