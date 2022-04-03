import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const [authToken, setAuthToken] = useState("");
  const [listOfTest, setListOfTest] = useState([]);

  useEffect(() => {
    let token;
    if (localStorage.getItem("auth-token")) {
      token = localStorage.getItem("auth-token");
      setAuthToken(localStorage.getItem("auth-token"));
    }

    axios({
      method: "get",
      url: "http://api.nyayashastraacademy.com/v1/tests/admin-list/",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res.data.details);
        setListOfTest(res.data.details);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <div>
        <div className="home-header">
          <h1>List of all the Test paper</h1>
          <Link to="/add-new-test">
            <p>Add new</p>
          </Link>
        </div>
        <div>
          <table>
            <tr>
              <th>Test name</th>
              <th>Test code</th>
              <th>Topic</th>
              <th>Totol hours</th>
              <th>Created at</th>
            </tr>
            {listOfTest?.map((test, index) => (
              <tr key={index}>
                <td>{test.test_name}</td>
                <td>{test.test_code}</td>
                <td>{test.topic}</td>
                <td>{test.total_hrs}</td>
                <td>{moment(test.created_at).format("MMM Do YY")}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
