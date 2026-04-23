import { useState, useEffect } from "react";

const PinModal = ({ 
  isOpen, 
  onClose, 
  onPinSubmit, 
  mode = "create",
  title = "Set Up a PIN",
  description = "Enter your 4 digits pin"
}) => {
  const [pin, setPin] = useState(["", "", "", ""]); // Array to store each digit of the PIN

  // Reset pin when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPin(["", "", "", ""]);
    }
  }, [isOpen]);

  // Handle PIN input change
  const handlePinChange = (index, value) => {
    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus to the next input
    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPin = pin.join("");
    if (fullPin.length === 4) {
      onPinSubmit(fullPin);
    } else {
      onPinSubmit({ error: "Please enter a 4-digit PIN" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto h-auto max-h-[80vh] overflow-y-auto flex flex-col gap-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-center">{title}</h2>
        <p className="text-gray-600 text-center text-sm sm:text-base">
          {description}
        </p>

        {/* PIN Input Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(index, e.target.value)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-lg"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          {/* Verify Button */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-yellow-500 bg-yellow text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
            >
              {mode === "verify" ? "VERIFY PIN" : "CONFIRM PIN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PinModal; 
