import { fromEvent, map, pairwise, switchMap, takeUntil } from "rxjs";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const cx = canvas.getContext('2d'); 
// @ts-ignore: Object is possibly 'null'.
cx.lineWidth = 4;

interface Position {
    x: number;
    y: number;
}
function drawLine([prev, next]: Position[]) {
    // @ts-ignore: Object is possibly 'null'.
    cx.beginPath();

    // @ts-ignore: Object is possibly 'null'.
    cx.moveTo(prev.x, prev.y);
    
    // @ts-ignore: Object is possibly 'null'.
    cx.lineTo(next.x, next.y);
    
    // @ts-ignore: Object is possibly 'null'.
    cx.stroke();

}

const mousemove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
const mousedown$ = fromEvent<MouseEvent>(canvas, 'mousedown');
const mouseup$ = fromEvent<MouseEvent>(canvas, 'mouseup');
const mouseout$ = fromEvent<MouseEvent>(canvas, 'mouseout');

const points$ = mousemove$.pipe(
    map<MouseEvent, Position>(({clientX, clientY}) => {
        const {top, left} = canvas.getBoundingClientRect();
        return {
            x: clientX - left,
            y: clientY - top
        }
    }),
    pairwise<Position>()
)

mousedown$.pipe(
    switchMap(() => points$.pipe(
        takeUntil(mouseout$),
        takeUntil(mouseup$)
    ))
).subscribe(drawLine);