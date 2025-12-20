import React from "react";

function Step3({ data, setData }) {
  return (
    <div className="flex justify-center flex-col p-3 gap-3">
      <h1 className="text-center uppercase text-3xl">Step-3</h1>
      <input
        type="email"
        className="border p-2 rounded text-black"
        placeholder="Enter your email"
        name="email"
        value={data.step3.email}
        onChange={(e) => setData({ ...data, step3: { email: e.target.value } })}
      />
    </div>
  );
}

export default Step3;
