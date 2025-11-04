const LevelIndicator = () => {
  const levels = ['Tidak Mahir', 'Cukup Mahir', 'Mahir', 'Sangat Mahir'];
  return (
    <div className="flex justify-between text-sm text-gray-500 mb-2 ml-48">
      {levels.map((text, i) => (
        <div key={i} className={`flex-1 text-center`}>
          {text}
        </div>
      ))}
    </div>
  );
}

export default LevelIndicator;
