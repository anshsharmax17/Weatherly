const Loader = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {[1, 2, 3].map((item) => <div key={item} className="glass h-40 animate-pulse rounded-3xl" />)}
  </div>
);

export default Loader;
