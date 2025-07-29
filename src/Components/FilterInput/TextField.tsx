import "./TextField.css";

export const TextField = () => {
  return (
    <div className="text-field">
      <input
        type="text"
        placeholder="Filter by name"
        className="text-field__input"
      />
    </div>
  );
};
