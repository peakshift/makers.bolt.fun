import { usePopperTooltip } from "react-popper-tooltip";

interface Props {
    src: string;
    alt?: string;
    width?: number | string;
    className?: string
    renderTooltip?: () => JSX.Element
}

export default function Avatar({ src, alt, className, width = 40, renderTooltip }: Props) {

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();

    return (
        <>
            <img ref={setTriggerRef} src={src} className={`shrink-0 rounded-full object-cover border-2 bg-white border-gray-100 ${className}`} style={{
                width: width,
                aspectRatio: '1/1'
            }} alt={alt ?? "avatar"} />
            {
                (renderTooltip && visible) && (
                    <div
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: 'tooltip-container' })}
                    >
                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                        {renderTooltip()}
                    </div>
                )
            }
        </>
    )
}
