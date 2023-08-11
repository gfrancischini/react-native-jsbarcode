import JsBarcode from 'jsbarcode';

function clearCanvas() {
  var canvas = document.getElementById('canvasId');
  // @ts-ignore
  canvas?.getContext('2d').clear();
}

export function drawBarcode(value: string, options: any) {
  clearCanvas();
  //   JsBarcode('#barcode', value, {
  //     format: 'UPC',
  //   });
  JsBarcode('#barcode', value, options);
}

if (typeof window !== 'undefined') {
  // @ts-expect-error
  window.drawBarcode = drawBarcode;
}
