type SearchBoxProps = {
  text: string; // el valor que viene del padre
  onTextChange: (text: string) => void; // una función: recibe un texto y no devuelve nada
};

export function SearchBox({ text, onTextChange }: SearchBoxProps) {
  return (
    <div>
      <label htmlFor="search">Buscar curso</label>
      <input
        id="search"
        type="search"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />
    </div>
  );
}
