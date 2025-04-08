const LedIndicator = ({ label, isOn }) => {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            isOn ? "bg-green-500 border-green-700" : "bg-gray-400 border-gray-500"
          }`}
          title={label}
        />
        <span className="text-sm">{label}</span>
      </div>
    );
  };
  
  export default LedIndicator;
  