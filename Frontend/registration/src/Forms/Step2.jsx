import React from "react";

function Step2({ data, setData }) {
  return (
    <div className="flex justify-center flex-col p-3 gap-3">
      <h1 className="text-center uppercase text-3xl">Step-2</h1>
      <input
        type="text"
        className="border p-2 rounded text-black"
        placeholder="Enter your contact number (Active)"
        name="number"
        value={data.step2.number}
        onChange={(e) =>
          setData({ ...data, step2: { number: e.target.value } })
        }
      />
    </div>
  );
}

export default Step2;
