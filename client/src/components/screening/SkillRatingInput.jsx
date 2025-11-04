const SkillRatingInput = ({ name, label, value, onChange }) => (
  <div className="mb-6 flex">
      <label className="w-1/3 block text-sm font-medium mb-3">{label} *</label>
      <div className="flex items-center gap-2">
          {['Tidak Mahir', 'Cukup Mahir', 'Mahir', 'Sangat Mahir'].map((text, i) => {
              const level = i + 0;
              return (
                  <label key={level} className={`skill-rating-option flex-1 w-24 h-9 flex items-center justify-center border-2 rounded-lg cursor-pointer transition-all duration-200 ${value == level ? 'selected' : 'border-gray-200'}`}>
                      <input type="radio" name={name} value={level} checked={value == level} onChange={onChange(name)} required className="hidden" />
                      <div className="font-semibold">{level}</div>
                      {/* <div className="text-[10px] text-center items-center">{text}</div> */}
                  </label>
              )
          })}
      </div>
  </div>
);

export default SkillRatingInput;