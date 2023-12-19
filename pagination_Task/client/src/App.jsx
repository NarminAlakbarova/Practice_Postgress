import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useEffect, useState } from "react";


const App = () => {
  const [allusers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState([]);
  const fetchData = async () => {
    const resp = await axios.get(`http://localhost:3000/?page=${page}`);
    setAllUsers(resp.data.users);
    setNumberOfPage(
      Array.from({ length: resp.data.totalUser }, (_, index) => index + 1)
    );
  };
  const goToNext = () =>
    setPage((page) => (page < numberOfPage.length ? page + 1 : page));
  const goToPrev = () => setPage((page) => (page > 1 ? page - 1 : 1));

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Users Table</h1>
      <table className="table table-striped mt-5 ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">username</th>
            <th scope="col">creat_at</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {allusers.map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <td>{item.username}</td>
              <td>{item.created_at}</td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example ">
        <ul className="pagination display-flex justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={goToPrev}>
              Previous
            </button>
          </li>
          {numberOfPage.map((item, index) => {
            return (
              <li className="page-item" key={index}>
                <button className="page-link" onClick={() => setPage(item)}>
                  {item}
                </button>
              </li>
            );
          })}

          <li className="page-item">
            <button className="page-link" onClick={goToNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
