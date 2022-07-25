import React, { useEffect } from 'react';

function PromisesExample(props) {

    const one = () => {
        return "One exicutes"
    }

    const two = () => {
       return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Two exicutes")
            }, 2000)
        })
    }

    const three = () => {
        return "Three exicutes"
    }

    const All = async() => {
        const o = one();
        console.log(o);

        const t = await two();
        console.log(t);

        const th = three();
        console.log(th);
    }

    useEffect(
        () => {
            All();
        })

    console.log(All);


    const display = (z) => {
        console.log(z)
    }

    const sum = (display) => {
       let x = 15, y = 5
        let z;
        z = x + y;
        display(z)
    }

    sum(display)

    return (
        <div>

        </div>
    );
}

export default PromisesExample;