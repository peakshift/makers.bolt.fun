import { MdLocalFireDepartment } from 'react-icons/md'
import Button from 'src/Components/Button/Button'
import { useAppSelector, usePressHolder } from 'src/utils/hooks'
import _throttle from 'lodash.throttle'
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
    initVotes: number
    onVote: (Vote: number) => void
} & Omit<ComponentProps<typeof Button>, 'children'>

export default function VoteButton({ initVotes, onVote = () => { }, ...props }: Props) {
    const [voteCnt, setVoteCnt] = useState(0)
    const voteCntRef = useRef(0);
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
                scale: random(1.2, 1.8)
            }))

            // if on mobile screen, reduce number of sparks particles to 60%
            setSparks(oldSparks => [...oldSparks, ...newSparks])
            setTimeout(() => {
                setSparks(s => {
                    return s.filter(spark => !newSparks.some(newSpark => newSpark.id === spark.id))
                })

            }, 2 * 1000)
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
        <Button
            onMouseDown={handlePressDown}
            onMouseUp={handlePressUp}
            onMouseLeave={handlePressUp}
            onTouchStart={handlePressDown}
            onTouchEnd={handlePressUp}
            size='md'
            color='none'
            className={`text-gray-600 !border-0 bg-gray-25 hover:bg-gray-50  relative  noselect`}
            {...props}
        >
            <div
                className={styles.color_overlay}
                style={{
                    "--increments": incrementsCount,
                    "--offset": `${(incrementsCount ? (incrementsCount % 5 === 0 ? 5 : incrementsCount % 5) : 0) * 20}%`
                } as any}
            >
            </div>
            <div className={`relative z-10 ${incrementsCount ? "text-red-600" : "text-gray-600"}`}>
                <MdLocalFireDepartment className='' /><span className="align-middle"> {initVotes + voteCnt}</span>
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
        </Button>

    )
}
