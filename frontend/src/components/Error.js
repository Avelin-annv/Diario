import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <>
      <h1>Oops something went wrong</h1>
      <h1>{err.status}</h1>
      <h1>{err.statusText}</h1>
    </>
  );
};
export default Error;
