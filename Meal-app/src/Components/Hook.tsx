import React, { useState, useCallback, useMemo } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0); 
  const increment = useCallback(() => setCount((prevCount) => prevCount + 1), []);
  const decrement = useCallback(() => setCount((prevCount) => prevCount - 1), []);
  
  const multiplication = useMemo(() => {
    console.log('Multiplication');
    let i=0;
    while(i<2000000000) i++;
    return count * 1000; 
  }, [count]);  

  return (
    <div>
      <h1>Counter: {count}</h1>
      
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <div>
        <h2>MUltiplication Result:</h2>
        <p>{multiplication}</p>
      </div>
    </div>
  );
};

export default Counter;
