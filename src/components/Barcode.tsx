import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export function Barcode({ value, compact = false }: { value: string; compact?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { if (ref.current) JsBarcode(ref.current, value, { format: 'CODE128', displayValue: !compact, height: compact ? 34 : 48, width: compact ? 1 : 1.5, margin: 0, fontSize: 10 }); }, [value, compact]);
  return <svg ref={ref} aria-label={`Código de barras ${value}`} />;
}
