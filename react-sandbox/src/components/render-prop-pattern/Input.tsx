import React from "react";

/**
 * render-propで解決しようとした問題の大部分は、hookによって置き換えられました。
 * 再利用性とデータ共有の仕組みをコンポーネントに追加する方法を変えたことで、多くの場合
 * hookはrender-propパターンを置き換えることができるのです
 * ref: https://zenn.dev/morinokami/books/learning-patterns-1/viewer/render-props-pattern
 */
function Input(props: { render: (value: number) => React.ReactNode }) {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        placeholder="Temp in C"
      />
      {props.render(value)}
    </>
  );
}
export default Input;
