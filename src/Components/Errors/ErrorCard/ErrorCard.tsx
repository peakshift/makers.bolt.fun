import { useToggle } from "@react-hookz/web";
import { FallbackProps } from "react-error-boundary";
import { RiErrorWarningFill } from "react-icons/ri";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";

export default function ErrorCard() {
  const [showDetails, toggleDetails] = useToggle(false);

  const error = useRouteError();

  let title = "Something went wrong...";
  let desc =
    "Please make sure that your internet connection is working properly & then try refreshing the page";
  let errObj: Error | undefined = undefined;

  if (isRouteErrorResponse(error)) {
    errObj = error.error;

    if (error.status === 400) {
      title = "Bad Request...";
      desc =
        "The server wasn't able to process this request correctly, please try again & let us know if the problem still exists";
    }

    if (error.status === 401) {
      title = "Not authenticated...";
      desc = "The resource you're trying to access requires authorization";
    }

    if (error.status === 403) {
      title = "Not authorized...";
      desc = "You don't have the right permissions to access this resource";
    }

    if (error.status === 404) {
      title = "Not Found...";
      desc =
        "The resource you're looking for no longer exist here, maybe the URL changed or it got removed for some reason.";
    }

    if (error.status === 410) {
      title = "Resource no longer available...";
      desc =
        "The resource you're looking for no longer exist here, maybe the URL changed or it got removed for some reason";
    }

    if (error.status === 500) {
      title = "Something wrong happened with our server";
      desc =
        "Please try again in a few minutes & let us know if you are still facing this issue";
    }

    if (error.status === 503) {
      title = "Our API is not responding...";
      desc =
        "Please try again in a few minutes & let us know if you are still facing this issue";
    }
  }

  return (
    <Card className="!border-red-500">
      <div className="max-w-[60ch] mx-auto flex flex-col justify-center items-center gap-24">
        <div className="text-h1 text-red-400 ">
          <RiErrorWarningFill />
        </div>
        <h2 className="text-h3">{title}</h2>
        <p className="text-body4 text-center text-gray-600">{desc}</p>
        <div className="flex flex-col gap-12">
          <Button onClick={() => window.location.reload()} color="black">
            Refresh Page
          </Button>
          <a href="/" color="gray" className="">
            Back to homepage
          </a>
        </div>

        {errObj && (
          <div className="self-start">
            <button
              className="text-gray-400 text-body5 underline"
              onClick={() => toggleDetails()}
            >
              {showDetails ? "Hide" : "Show"} error details
            </button>
            {showDetails && (
              <div className="mt-16 text-gray-600">
                <p className="text-body3 text-gray-800">{errObj.name}</p>
                <p className="text-body4">{errObj.message}</p>
                <p className="text-body4 whitespace-pre-line">{errObj.stack}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
