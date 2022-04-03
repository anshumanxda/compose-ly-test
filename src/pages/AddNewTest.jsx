import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AddNewTest = () => {
  const [dataForTest, setDataForTest] = useState({
    test_name: "",
    test_code: "",
    topic: "",
    total_hrs: "",
    question_marks: 4,
    negative_marks: 1,
    plan: 1,
    paid_series: true,
    is_published: false,
  });
  const [authToken, setAuthToken] = useState("");
  const [someError, setSomeError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token"))
      setAuthToken(localStorage.getItem("auth-token"));
  }, []);

  const handleChange = (e) => {
    setDataForTest({ ...dataForTest, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setSomeError("");
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "http://api.nyayashastraacademy.com/v1/tests/admin-list/",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: dataForTest,
      });
      navigate("/home");
    } catch (e) {
      setSomeError(e.response.data.message);
    }
  };

  return (
    <div className="add-test">
      {someError && (
        <div style={{ backgroundColor: "red", color: "white" }}>
          {someError}
        </div>
      )}

      <form>
        <div>
          <label>Test name</label>
          <input type="text" name="test_name" onChange={handleChange} />
        </div>
        <div>
          <label>Test code</label>
          <input type="text" name="test_code" onChange={handleChange} />
        </div>
        <div>
          <label>Topic</label>
          <input type="text" name="topic" onChange={handleChange} />
        </div>
        <div>
          <label>Total hrs</label>
          <input type="text" name="total_hrs" onChange={handleChange} />
        </div>

        <button onClick={onSubmit}>ADD</button>
      </form>
    </div>
  );
};

export default AddNewTest;
