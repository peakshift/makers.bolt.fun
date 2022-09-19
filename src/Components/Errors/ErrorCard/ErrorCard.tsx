import { useToggle } from "@react-hookz/web";
import { FallbackProps } from "react-error-boundary";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "src/Components/Button/Button";
import Card from "src/Components/Card/Card";



export default function ErrorCard({ error, resetErrorBoundary }: FallbackProps) {

    const [showDetails, toggleDetails] = useToggle(false)



    return (
        <Card className="!border-red-500">
            <div className="max-w-[60ch] mx-auto flex flex-col justify-center items-center gap-24">
                <div className="text-h1 text-red-400 "><RiErrorWarningFill /></div>
                <p className="text-body4 text-center text-gray-600">Ooops... <br /> Looks like something unexpected went wrong, please check your internet connection & try again.</p>
                <div className="flex flex-col gap-12">
                    <Button onClick={() => resetErrorBoundary()} color='black'>Try Again</Button>
                    <Button href="/" color='gray' variant="text" size="sm" className="">Back to homepage</Button>
                </div>

                <div className="self-start">

                    <button className="text-gray-400 text-body5 underline" onClick={() => toggleDetails()}>{showDetails ? "Hide" : "Show"} error details</button>
                    {showDetails &&
                        <div className="mt-16 text-gray-600">
                            <p className="text-body3 text-gray-800">{error.name}</p>
                            <p className="text-body4">{error.message}</p>
                            <p className="text-body4 whitespace-pre-line">{error.stack}</p>
                        </div>
                    }
                </div>
            </div>
        </Card>

    )
}
