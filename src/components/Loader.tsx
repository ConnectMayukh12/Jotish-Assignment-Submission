interface LoaderProps {
  /** Wrap the loader in a full-screen centred gradient backdrop */
  fullScreen?: boolean;
}

function Loader({ fullScreen = false }: LoaderProps) {
  const markup = (
    <div className="loader">
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__ball" />
    </div>
  );

  if (!fullScreen) return markup;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#ffe6c7_0%,#cfe0ff_55%,#b6f3e3_100%)]">
      {markup}
    </div>
  );
}

export default Loader;
