import React, { useState } from "react";

const ChangePinModal = ({ 
  isOpen, 
  onClose, 
  onPinSubmit,
  error,
  onClearError
}) => {
  const [currentPin, setCurrentPin] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  const handlePinChange = (index, value, type) => {
    if (!/^[0-9]*$/.test(value)) return;

    if (type === 'current') {
      const updatedPin = [...currentPin];
      updatedPin[index] = value;
      setCurrentPin(updatedPin);
    } else if (type === 'new') {
      const updatedPin = [...newPin];
      updatedPin[index] = value;
      setNewPin(updatedPin);
    } else {
      const updatedPin = [...confirmPin];
      updatedPin[index] = value;
      setConfirmPin(updatedPin);
    }

    // Auto-focus to the next input
    if (value && index < 3) {
      let nextId;
      if (type === 'current') {
        nextId = `current-pin-input-${index + 1}`;
      } else if (type === 'new') {
        nextId = `new-pin-input-${index + 1}`;
      } else {
        nextId = `confirm-pin-input-${index + 1}`;
      }
      document.getElementById(nextId)?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClearError();
    
    const fullCurrentPin = currentPin.join("");
    const fullNewPin = newPin.join("");
    const fullConfirmPin = confirmPin.join("");

    // Validate all fields are filled
    if (fullCurrentPin.length !== 4 || fullNewPin.length !== 4 || fullConfirmPin.length !== 4) {
      onPinSubmit({ error: "Please fill all PIN fields" });
      return;
    }

    if (fullNewPin !== fullConfirmPin) {
      onPinSubmit({ error: "New PINs don't match" });
      return;
    }

    if (fullNewPin === fullCurrentPin) {
      onPinSubmit({ error: "New PIN cannot be same as current PIN" });
      return;
    }

    onPinSubmit({
      oldPin: fullCurrentPin,
      newPin: fullNewPin
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto h-auto max-h-[80vh] overflow-y-auto flex flex-col gap-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center">Change Your PIN</h2>
        
        <p className="text-gray-600 text-center text-sm sm:text-base">
          Enter your current and new 4-digit PIN
        </p>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Current PIN</label>
            <div className="flex justify-center gap-3 sm:gap-4">
              {currentPin.map((digit, index) => (
                <input
                  key={`current-${index}`}
                  id={`current-pin-input-${index}`}
                  type="password"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value, 'current')}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">New PIN</label>
            <div className="flex justify-center gap-3 sm:gap-4">
              {newPin.map((digit, index) => (
                <input
                  key={`new-${index}`}
                  id={`new-pin-input-${index}`}
                  type="password"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value, 'new')}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Confirm New PIN</label>
            <div className="flex justify-center gap-3 sm:gap-4">
              {confirmPin.map((digit, index) => (
                <input
                  key={`confirm-${index}`}
                  id={`confirm-pin-input-${index}`}
                  type="password"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value, 'confirm')}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-lg"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow  text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
          >
            CHANGE PIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePinModal;