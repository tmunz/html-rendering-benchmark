import React, { useState, useEffect } from 'react';

export function App() {

  const [regularReact, setRegularReact] = useState(null);

  function createRegularReact() {
    let svg = null;
    let strategy = 1;
    const items = 5000;

    console.time("regularReact create");
    if (strategy === 0) {
      svg = <g>{new Array(items).fill(0).map((_, i) => <rect
        key={i}
        x={i} y={i}
        width={Math.abs(400 - i * 2)} height={Math.abs(400 - i * 2)}
        fill="blue" stroke="black" strokeWidth="1"
        transform={`rotate(${i} 200 200)`}
      />)}</g>;
    } else {
      svg = [];
      for (var i = 0; i < items; i++) {
        svg.push(<rect
          key={i}
          x={i} y={i}
          width={Math.abs(400 - i * 2)} height={Math.abs(400 - i * 2)}
          fill="blue" stroke="black" strokeWidth="1"
          transform={`rotate(${i} 200 200)`}
        />);
      }
      // svg = <g>{svg}</g>;
    }
    console.timeEnd("regularReact create");
    console.time("regularReact render");
    return svg;
  }

  useEffect(() => {
    console.timeEnd("regularReact render");
  })

  return (
    <div>
      <h1>regular react</h1>
      <button onClick={() => setRegularReact(null)}>clear</button>
      <button onClick={() => setRegularReact(createRegularReact())}>create</button>
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {regularReact}
      </svg>
    </div>
  );
}
