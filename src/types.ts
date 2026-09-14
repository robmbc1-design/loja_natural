export type Page = 'dashboard' | 'produtos' | 'estoque' | 'etiquetas' | 'vendas' | 'relatorios' | 'configuracoes';
export type Product = { id: string; name: string; sku: string; barcode: string; category: string; unit: string; stock: number; minimum: number; price: number; cost: number; expiry: string; batch: string; status: 'Ativo' | 'Inativo' };
export type LabelSettings = { width: number; height: number; columns: number; showLogo: boolean; showName: boolean; showPrice: boolean; showUnit: boolean; showBarcode: boolean; showCode: boolean; showBatch: boolean; showExpiry: boolean };
export type Sale = { id: string; customer: string; total: number; payment: string; time: string; status: 'Concluída' | 'Cancelada' };
