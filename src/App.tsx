import React, { useState, useEffect } from 'react';

export function App() {

  const [regularReact, setRegularReact] = useState(null);
  const [stringReact, setStringReact] = useState(null);

  function createRegularReact(items: number) {
    let svg = null;
    let strategy = 1;

    console.time("create");
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
      svg = <g>{svg}</g>;
    }
    console.timeEnd("create");
    console.time("render");
    return svg;
  }

  function createStringReact(items: number) {
    let svg = null;
    let strategy = 0;

    console.time("create");
    if (strategy === 0) {
      svg = `<g>${new Array(items).fill(0).map((_, i) => {
        const size = Math.abs(400 - i * 2);
        return `<rect
          x="${i}" y="${i}"
          width="${size}" height="${size}"
          fill="blue" stroke="black" strokeWidth="1"
          transform="rotate(${i} 200 200)"
        />`;
      })}</g>`;
    }
    console.timeEnd("create");
    console.time("render");
    return svg;
  }

  useEffect(() => {
    console.timeEnd("render");
  })

  return (
    <div>
      <div>
        <h1>regular react</h1>
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {regularReact}
        </svg>
        <div>
          <button onClick={() => setRegularReact(null)}>clear</button>
          <button onClick={() => {
            setRegularReact(createRegularReact(5000))
            setTimeout(() => setRegularReact(createRegularReact(2500)), 2000);
          }}>create</button>
        </div>
      </div>
      <div>
        <h1>string react (dangerouslySetInnerHTML)</h1>
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: stringReact }}
        >
        </svg>
        <div>
          <button onClick={() => setStringReact(null)}>clear</button>
          <button onClick={() => {
            setStringReact(createStringReact(5000))
            setTimeout(() => setStringReact(createStringReact(2500)), 2000);
          }}>create</button>
        </div>
      </div>
    </div>
  );
}
