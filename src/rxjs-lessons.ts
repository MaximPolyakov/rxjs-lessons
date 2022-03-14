import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, takeUntil } from "rxjs";

// const search$ = new Observable<Event>(observer => {
//     const search = document.getElementById('search');
//     const stop = document.getElementById('stop');

//     if (!search || !stop) {
//         observer.error('Element does not exist on the page');
//         return; 
//     }

//     const onSearch = (event: any) => {
//         console.log(123);
//         checkSubscription();
//         observer.next(event);
        
//     };

//     const onStop = (event: any) => {
//         checkSubscription();
//         observer.complete();
//         clear();
//     }

//     // @ts-ignore: Object is possibly 'null'.
//     search.addEventListener('input', onSearch);
//     stop.addEventListener('click', onStop);

//     const checkSubscription = () => {
//         if (observer.closed) {
//             clear();
//         }
//     }

//     const clear = () => {
//         search.removeEventListener('input', onSearch);
//         stop.removeEventListener('click', onStop);
//     }
// });

const search = document.getElementById('search') as HTMLButtonElement;
const stop = document.getElementById('stop') as HTMLButtonElement;

const search$: Observable<Event> = fromEvent<Event>(search, 'input');
const stop$: Observable<Event> = fromEvent<Event>(stop, 'click');



const searchSubscription = search$
    .pipe(map(event => {
        return (event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''), 
    distinctUntilChanged(),
    takeUntil(stop$),
    ).subscribe(value => {
        console.log(value);
});
