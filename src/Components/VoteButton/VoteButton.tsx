import { MdLocalFireDepartment } from 'react-icons/md'
import Button from 'src/Components/Button/Button'
import { useAppSelector, usePressHolder } from 'src/utils/hooks'
import { ComponentProps, useRef, useState } from 'react'
import styles from './styles.module.css'
import { random, randomItem } from 'src/utils/helperFunctions'
import { useDebouncedCallback, useThrottledCallback } from '@react-hookz/web'


interface Particle {
    id: string,
    offsetX: number,
    offsetY: number,
    color: string
    animation: 'fly-spark-1' | 'fly-spark-2',
    animationSpeed: 1 | 2 | 3,
    scale: number
}

type Props = {
    initVotes: number,
    onVote: (Vote: number) => void,
    fillType: 'leftRight' | 'upDown' | "background" | 'radial'
    disableCounter?: boolean
    disableShake?: boolean
} & Omit<ComponentProps<typeof Button>, 'children'>

export default function VoteButton({
    disableCounter = false,
    fillType = 'leftRight',
    initVotes,
    onVote = () => { },
    ...props }: Props) {
    const [voteCnt, setVoteCnt] = useState(0)
    const voteCntRef = useRef(0);
    const btnContainerRef = useRef<HTMLDivElement>(null!!)
    const [sparks, setSparks] = useState<Particle[]>([]);
    const [wasActive, setWasActive] = useState(false);
    const [incrementsCount, setIncrementsCount] = useState(0);
    const incrementsCountRef = useRef(0);
    const [increments, setIncrements] = useState<Array<{ id: string, value: number }>>([])

    const isMobileScreen = useAppSelector(s => s.ui.isMobileScreen);


    const doVote = useDebouncedCallback(() => {
        onVote(voteCntRef.current);
        voteCntRef.current = 0;
        console.log("VOTED");

    }, [], 2000)

    const clickIncrement = () => {

        const _incStep = Math.ceil((incrementsCountRef.current + 1) / 5);
        incrementsCountRef.current += 1;
        setIncrementsCount(v => incrementsCountRef.current);

        if (!disableCounter)
            setIncrements(v => {
                const genId = Math.random().toString();
                setTimeout(() => {
                    setIncrements(v => v.filter(e => e.id !== genId))
                }, 500)
                return [...v, { id: genId, value: _incStep }]
            });

        setVoteCnt(s => {
            const newValue = s + _incStep;
            voteCntRef.current = newValue;
            return newValue;
        })

        if (incrementsCountRef.current && incrementsCountRef.current % 5 === 0) {
            const newSparks = Array(5).fill(0).map((_, idx) => ({
                id: (Math.random() + 1).toString(),
                offsetX: random(-10, 99),
                offsetY: random(40, 90),
                animation: randomItem(styles.fly_spark_1, styles.fly_spark_1),
                animationSpeed: randomItem(1, 1.5, 2),
                color: `hsl(0deg 86% ${random(50, 63)}%)`,
                scale: random(1, 1.5)
            }))

            // if on mobile screen, reduce number of sparks particles to 60%
            setSparks(oldSparks => [...oldSparks, ...newSparks])
            setTimeout(() => {
                setSparks(s => {
                    return s.filter(spark => !newSparks.some(newSpark => newSpark.id === spark.id))
                })

            }, 2 * 1000)
        }

        const btn = btnContainerRef.current;
        if (btn.classList.contains(styles.clicked_2)) {
            btn.classList.remove(styles.clicked_2)
            btn.classList.add(styles.clicked_1)
        } else {
            btn.classList.remove(styles.clicked_1)
            btn.classList.add(styles.clicked_2)
        }

        doVote();
    }

    const onHold = useThrottledCallback(clickIncrement, [], 150)

    const { onPressDown, onPressUp } = usePressHolder(onHold, 100);

    const handlePressDown = () => {
        setWasActive(true);
        onPressDown();
    }

    const handlePressUp = (event?: any) => {
        if (!wasActive) return;
        setWasActive(false);

        if (event?.preventDefault) event.preventDefault();

        onPressUp();
        onHold();
    }

    return (
        <button
            onMouseDown={handlePressDown}
            onMouseUp={handlePressUp}
            onMouseLeave={handlePressUp}
            onTouchStart={handlePressDown}
            onTouchEnd={handlePressUp}

            className={`${styles.vote_button} relative  noselect border-0`}
            style={{
                "--increments": incrementsCount,
                "--offset": `${(incrementsCount ? (incrementsCount % 5 === 0 ? 5 : incrementsCount % 5) : 0) * 20}%`,
                "--bg-color": fillType !== 'background' ?
                    'hsl(0deg 86% max(calc((93 - var(--increments) / 3) * 1%), 68%))'
                    :
                    "hsl(0deg 86% max(calc((100 - var(--increments) / 2) * 1%), 68%))",
            } as any}
            {...props}
        >

            <div
                ref={btnContainerRef}
                className={`
                ${styles.btn_content} 
                relative p-10 rounded-lg text-gray-600 bg-white hover:bg-gray-50 
                 ${incrementsCount && 'outline'} active:outline outline-1 outline-red-500  `}

            >
                <div
                    className={`
                ${styles.color_overlay}
                ${fillType === 'upDown' && styles.color_overlay__upDown}
                ${fillType === 'leftRight' && styles.color_overlay__leftRight}
                ${fillType === 'background' && styles.color_overlay__background}
                ${fillType === 'radial' && styles.color_overlay__radial}
                `}
                >
                </div>
                <div className={`relative z-10 ${incrementsCount ? "text-red-600" : "text-gray-600"}`}>
                    <MdLocalFireDepartment className='' /><span className="align-middle"> {initVotes + voteCnt}</span>
                </div>
            </div>
            {increments.map(increment => <span
                key={increment.id}
                className={styles.vote_counter}
            >+{increment.value}</span>)}
            {sparks.map(spark =>
                <div
                    key={spark.id}
                    className={styles.spark}
                    style={{
                        "--offsetX": spark.offsetX,
                        "--offsetY": spark.offsetY,
                        "--animationSpeed": spark.animationSpeed,
                        "--scale": spark.scale,
                        "animationName": spark.animation,
                        "color": spark.color
                    } as any}
                ><MdLocalFireDepartment className='' /></div>)
            }
        </button>

    )
}
