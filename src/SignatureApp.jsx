import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const SignatureApp = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); 
  const [eraser, setEraser] = useState(false);

  const startDrawing = (e) => {
    setDrawing(true);
    draw(e); 
  };

  const endDrawing = () => {
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.strokeStyle = eraser ? '#ffffff' : color;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    html2canvas(canvas).then(function (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg');
      link.download = 'signature.jpg';
      link.click();
    });
  };

  return (
    //  
    <div className= " bg-gray-500 flex flex-col items-center justify-center h-screen" >
      <canvas 
        ref={canvasRef}
        className=" bg-white border border-gray-400"
        width={1000}
        height={600}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
      />
      <div className="mt-4">
        <button
          className="mr-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={() => setColor('#000000')}
        >
          Black
        </button>
        <button
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setColor('#ff0000')}
        >
          Red
        </button>
        <button
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setColor('#00ff00')}
        >
          Green
        </button>
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setColor('#0000ff')}
        >
          Blue
        </button>
        <button
          className="mr-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-gray-600"
          onClick={() => setEraser(true)}
        >
          Eraser
        </button>
        <button
          className="mr-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-gray-600"
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={downloadSignature}
        >
          Download as JPG
        </button>
      </div>
    </div>
  );
};

export default SignatureApp;
