// src/components/SelectModal.js
import React from "react";

const SelectModal = ({
  isOpen,
  onClose,
  onInstrumentSelect,
  onBpmSelect,
  onSubmit,
}) => {
  const [selectedInstrument, setSelectedInstrument] = React.useState("");
  const [selectedBpm, setSelectedBpm] = React.useState("90");

  const handleInstrumentSelect = (instrument) => {
    setSelectedInstrument(instrument);
    onInstrumentSelect(instrument);
  };

  const handleBpmSelect = (e) => {
    setSelectedBpm(e.target.value);
    onBpmSelect(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Select Order Status</h2>
        <div className="flex justify-around mb-4">
          <button
            onClick={() => handleInstrumentSelect("Guitar")}
            className="bg-gray-200 p-2 rounded"
          >
            Guitar
          </button>
          <button
            onClick={() => handleInstrumentSelect("Drum")}
            className="bg-gray-200 p-2 rounded"
          >
            Drum
          </button>
          <button
            onClick={() => handleInstrumentSelect("Bass")}
            className="bg-gray-200 p-2 rounded"
          >
            Bass
          </button>
          <button
            onClick={() => handleInstrumentSelect("etc")}
            className="bg-gray-200 p-2 rounded"
          >
            etc..
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="bpm" className="block mb-2">
            BPM
          </label>
          <select
            id="bpm"
            value={selectedBpm}
            onChange={handleBpmSelect}
            className="block w-full p-2 border rounded"
          >
            {Array.from({ length: 21 }, (_, i) => 60 + i * 5).map((bpm) => (
              <option key={bpm} value={bpm}>
                {bpm}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Let's Record
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SelectModal;
