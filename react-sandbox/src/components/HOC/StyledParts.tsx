type WithStylesProps<P> = P & {
  style: React.CSSProperties;
};
function withStyles<P>(Component: React.FC<WithStylesProps<P>>) {
  return (props: P) => {
    const style = { padding: "0.2rem", margin: "1rem" };
    return <Component style={style} {...props} />;
  };
}

const Button = () => <button>Click me!</button>;
const Text = () => <p style={{ color: "black" }}>Hello world!</p>;

export const StyledButton = withStyles(Button);
export const StyledText = withStyles(Text);
