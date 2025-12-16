import React, { useEffect, useRef, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
  createStudent,
  getStudent,
  saveDraftStep,
  publishStudent,
} from "../API/studentAPI";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    step1: {},
    step2: {},
    step3: {},
  });
  const [step, setStep] = useState(1);
  const [id, setId] = useState(null);
  const createdRef = useRef(false);

  useEffect(() => {
    if (createdRef.current) return;

    createdRef.current = true;

    createStudent().then((res) => {
      setId(res.data._id);
    });
  }, []);

  const next = async () => {
    await saveDraftStep(id, `step${step}`, data[`step${step}`]);
    setStep(step + 1);
  };
  const publish = async () => {
    await saveDraftStep(id, "step3", data.step3);
    await publishStudent(id);
    alert("Published successfully");
    navigate('/');
  };
  return (
    <div className="App bg-slate-800 min-h-screen text-slate-200 p-6">
      <header className="flex justify-end">
        <button onClick={() => navigate("/")}>Home</button>
      </header>
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 data={data} setData={setData} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
      </form>
      <div className="flex gap-2 justify-end p-3">
        {step < 3 && (
          <button
            type="button"
            onClick={next}
            disabled={!id}
            className={`px-4 py-2 rounded text-white
    ${id ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Save & Next
          </button>
        )}
        {step === 3 && (
          <button
            type="button"
            onClick={publish}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
