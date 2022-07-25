import React, { useMemo, useState } from 'react';

function UseMemo_example(props) {

    const [number, setNumber] = useState(0);
    const [count , setCount] = useState(0);

    const findfectorial = (n) => {
        console.log("findfectorial");

        if (n > 1) {
            return (n* findfectorial(n-1))
        }else {
            return 1 
        }
    }

    // without memoized //
    // const result = findfectorial(number)

    // with memoized  //

    const result = useMemo((e) =>  findfectorial(number) ,[number])
    console.log(result);

    return (
        <div>
            <input type="text" placeholder='Place Enter Number' onChange={(e) => {setNumber(e.target.value)}}/>
            <button onClick={() =>{setCount(count+1)}}>Counter</button>

            <p>Enter ounter Number : {count}</p>
            <p>Answer findfectorial : {result} </p>
        </div>
    );
}

export default UseMemo_example;