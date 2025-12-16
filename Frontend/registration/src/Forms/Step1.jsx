import React from "react";

function Step1({ data, setData }) {
  return (
    <div className="flex justify-center flex-col p-3 gap-3">
      <h1 className="text-center uppercase text-3xl">Step-1</h1>
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Enter your name"
        value={data.step1.name}
        name="name"
        onChange={(e)=>setData({ ...data, step1: { name: e.target.value } })}
      />
    </div>
  );
}

export default Step1;
