import type { LabelSettings, Product } from '../types';
import { Barcode } from './Barcode';
import { money } from '../data';

export function LabelPreview({ product, settings, test = false }: { product: Product; settings: LabelSettings; test?: boolean }) {
  return <div className="label-sheet" style={{ width: `${settings.width}mm`, minHeight: `${settings.height}mm` }}>
    {settings.showLogo && <div className="label-logo">folha <b>viva</b></div>}
    {settings.showName && <strong className="label-name">{test ? 'Produto Exemplo' : product.name}</strong>}
    {settings.showUnit && <span className="label-unit">{product.unit}</span>}
    {settings.showPrice && <strong className="label-price">{test ? 'R$ 19,90' : money(product.price)}</strong>}
    {settings.showBarcode && <div className="label-barcode"><Barcode value={test ? '7890000000000' : product.barcode} compact={!settings.showCode} /></div>}
    {settings.showCode && <small>{test ? '7890000000000' : product.barcode}</small>}
    {(settings.showBatch || settings.showExpiry) && <small className="label-meta">{settings.showBatch && `Lote ${product.batch}`} {settings.showExpiry && `Val. ${new Date(product.expiry).toLocaleDateString('pt-BR')}`}</small>}
  </div>;
}
