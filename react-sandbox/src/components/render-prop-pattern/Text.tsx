const Title = (props: {
  renderFirstComponent: () => React.ReactNode;
  renderSecondComponent: () => React.ReactNode;
  renderThirdComponent: () => React.ReactNode;
}) => (
  <>
    {props.renderFirstComponent()}
    {props.renderSecondComponent()}
    {props.renderThirdComponent()}
  </>
);
export default Title;
