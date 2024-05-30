function Fahrenheit({ value }: { value: number }) {
  return <div>{(value * 9) / 5 + 32}F</div>;
}
export default Fahrenheit;
