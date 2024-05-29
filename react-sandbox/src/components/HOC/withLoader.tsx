import { useEffect, useState } from "react";

type WithLoaderProps<P> = P & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function withLoader<P>(
  Element: React.FC<WithLoaderProps<P>>,
  url: string
) {
  return (props: P) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
