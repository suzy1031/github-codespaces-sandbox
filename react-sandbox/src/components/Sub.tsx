type Props = {
  useResponsive?: boolean;
  visibleFooter?: boolean;
};

interface RenderStrategy {
  render: () => JSX.Element;
}

class ResponsiveVisibleFooter implements RenderStrategy {
  private useResponsive: boolean;
  private visibleFooter: boolean;

  constructor(useResponsive?: boolean, visibleFooter?: boolean) {
    this.useResponsive = useResponsive ?? false;
    this.visibleFooter = visibleFooter ?? false;
  }

  private isResponsiveVisibleFooter() {
    return (
      this.useResponsive &&
      (this.visibleFooter || typeof this.visibleFooter === "undefined")
    );
  }

  render() {
    return this.isResponsiveVisibleFooter() ? (
      <div>useResponsive is true!! visibleFooter is true or undefined!!</div>
    ) : (
      <></>
    );
  }
}

class ResponsiveHiddenFooter implements RenderStrategy {
  private useResponsive: boolean;
  private visibleFooter: boolean;

  constructor(useResponsive?: boolean, visibleFooter?: boolean) {
    this.useResponsive = useResponsive ?? false;
    this.visibleFooter = visibleFooter ?? false;
  }

  private isResponsiveHiddenFooter() {
    return this.useResponsive && this.visibleFooter === false;
  }
  render() {
    return this.isResponsiveHiddenFooter() ? (
      <div>useResponsive is true!! visibleFooter is false</div>
    ) : (
      <></>
    );
  }
}

class NotResponsive implements RenderStrategy {
  private useResponsive: boolean;

  constructor(useResponsive?: boolean) {
    this.useResponsive = useResponsive ?? false;
  }
  render() {
    return !this.useResponsive ? <div>useResponsive false!!</div> : <></>;
  }
}

class Context {
  private renderStrategy: RenderStrategy;

  constructor(renderStrategy: RenderStrategy) {
    this.renderStrategy = renderStrategy;
  }

  render() {
    return this.renderStrategy.render();
  }
}

export const Sub: React.FC<Props> = ({ useResponsive, visibleFooter }) => {
  const isResponsiveVisibleFooter = new Context(
    new ResponsiveVisibleFooter(useResponsive, visibleFooter)
  );
  const isResponsiveHiddenFooter = new Context(
    new ResponsiveHiddenFooter(useResponsive, visibleFooter)
  );
  const isNotResponsive = new Context(new NotResponsive(useResponsive));

  return (
    <>
      {isResponsiveHiddenFooter.render()}
      {isResponsiveVisibleFooter.render()}
      {isNotResponsive.render()}
    </>
  );
};
