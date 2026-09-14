import type { Product, Sale } from './types';
import { hasSupabaseConfig, supabase } from './lib/supabase';

export const fallbackProducts: Product[] = [
  { id: '1', name: 'Chá Verde Orgânico', sku: 'CHA-001', barcode: '7898901234567', category: 'Chás', unit: '100g', stock: 42, minimum: 10, price: 24.9, cost: 12.4, expiry: '2027-04-18', batch: 'L2404', status: 'Ativo' },
  { id: '2', name: 'Granola Castanhas & Mel', sku: 'GRA-014', barcode: '7898901234568', category: 'Alimentos', unit: '300g', stock: 8, minimum: 12, price: 18.5, cost: 9.2, expiry: '2026-11-08', batch: 'G2408', status: 'Ativo' },
  { id: '3', name: 'Cúrcuma em Pó', sku: 'CUR-022', barcode: '7898901234569', category: 'Temperos', unit: '100g', stock: 0, minimum: 8, price: 15.9, cost: 7.1, expiry: '2027-01-22', batch: 'C2410', status: 'Ativo' },
  { id: '4', name: 'Óleo de Coco Extra Virgem', sku: 'OLE-031', barcode: '7898901234570', category: 'Óleos', unit: '200ml', stock: 24, minimum: 6, price: 29.9, cost: 16.8, expiry: '2027-09-30', batch: 'O2409', status: 'Ativo' },
  { id: '5', name: 'Mix de Sementes', sku: 'SEM-042', barcode: '7898901234571', category: 'Alimentos', unit: '250g', stock: 16, minimum: 10, price: 21.9, cost: 11.4, expiry: '2026-12-12', batch: 'S2411', status: 'Ativo' },
];

export const fallbackSales: Sale[] = [
  { id: 'VEN-000142', customer: 'Consumidor Final', total: 74.7, payment: 'PIX', time: '10:42', status: 'Concluída' },
  { id: 'VEN-000141', customer: 'Mariana Costa', total: 48.4, payment: 'Cartão', time: '09:18', status: 'Concluída' },
  { id: 'VEN-000140', customer: 'Consumidor Final', total: 29.9, payment: 'Dinheiro', time: 'Ontem', status: 'Concluída' },
  { id: 'VEN-000139', customer: 'Rafael Lima', total: 112.3, payment: 'PIX', time: 'Ontem', status: 'Cancelada' },
];

export const products: Product[] = [...fallbackProducts];
export const sales: Sale[] = [...fallbackSales];

export const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const toProduct = (row: any): Product => ({
  id: String(row.id ?? row.uuid ?? row.product_id),
  name: String(row.name ?? 'Produto'),
  sku: String(row.sku ?? 'SEM-SKU'),
  barcode: String(row.barcode ?? '0000000000000'),
  category: String(row.category?.name ?? row.category_name ?? 'Geral'),
  unit: String(row.unit ?? 'un'),
  stock: Number(row.stock ?? 0),
  minimum: Number(row.minimum_stock ?? row.minimum ?? 0),
  price: Number(row.price ?? 0),
  cost: Number(row.cost ?? 0),
  expiry: String(row.expiry ?? row.expires_on ?? new Date().toISOString().slice(0, 10)),
  batch: String(row.batch ?? row.batch_code ?? 'N/A'),
  status: row.active === false ? 'Inativo' : 'Ativo',
});

const toSale = (row: any): Sale => ({
  id: String(row.sale_number ? `VEN-${String(row.sale_number).padStart(6, '0')}` : row.id ?? 'VEN-000000'),
  customer: row.customer || 'Consumidor Final',
  total: Number(row.total ?? 0),
  payment: row.payments?.[0]?.method ?? row.payment ?? 'PIX',
  time: row.created_at ? new Date(row.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Agora',
  status: row.status === 'cancelled' || row.status === 'Cancelada' ? 'Cancelada' : 'Concluída',
});

export async function fetchProducts(): Promise<Product[]> {
  if (!hasSupabaseConfig || !supabase) return fallbackProducts;

  const { data, error } = await supabase
    .from('products')
    .select('id, name, sku, barcode, unit, stock, minimum_stock, price, cost, active, category:categories(name), batches:product_batches(batch_code, expires_on)')
    .eq('active', true)
    .order('name');

  if (error) {
    console.error('Erro ao carregar produtos do Supabase:', error.message);
    return fallbackProducts;
  }

  return (data ?? []).map((row: any) => {
    const batch = Array.isArray(row.batches) ? row.batches[0] : row.batches ?? {};
    return toProduct({ ...row, batch: batch?.batch_code ?? row.batch, expiry: batch?.expires_on ?? row.expiry, category: row.category, minimum: row.minimum_stock });
  });
}

export async function fetchSales(): Promise<Sale[]> {
  if (!hasSupabaseConfig || !supabase) return fallbackSales;

  const { data, error } = await supabase
    .from('sales')
    .select('id, sale_number, total, status, created_at, payments(method), customer:profiles(full_name)')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Erro ao carregar vendas do Supabase:', error.message);
    return fallbackSales;
  }

  return (data ?? []).map((row: any) => {
    const customerName = row.customer?.full_name ?? 'Consumidor Final';
    const payment = Array.isArray(row.payments) ? row.payments[0]?.method ?? 'PIX' : row.payment ?? 'PIX';
    return toSale({ ...row, customer: customerName, payment });
  });
}

