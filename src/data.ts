import type { Product, Sale } from './types';

export const products: Product[] = [
  { id: '1', name: 'Chá Verde Orgânico', sku: 'CHA-001', barcode: '7898901234567', category: 'Chás', unit: '100g', stock: 42, minimum: 10, price: 24.9, cost: 12.4, expiry: '2027-04-18', batch: 'L2404', status: 'Ativo' },
  { id: '2', name: 'Granola Castanhas & Mel', sku: 'GRA-014', barcode: '7898901234568', category: 'Alimentos', unit: '300g', stock: 8, minimum: 12, price: 18.5, cost: 9.2, expiry: '2026-11-08', batch: 'G2408', status: 'Ativo' },
  { id: '3', name: 'Cúrcuma em Pó', sku: 'CUR-022', barcode: '7898901234569', category: 'Temperos', unit: '100g', stock: 0, minimum: 8, price: 15.9, cost: 7.1, expiry: '2027-01-22', batch: 'C2410', status: 'Ativo' },
  { id: '4', name: 'Óleo de Coco Extra Virgem', sku: 'OLE-031', barcode: '7898901234570', category: 'Óleos', unit: '200ml', stock: 24, minimum: 6, price: 29.9, cost: 16.8, expiry: '2027-09-30', batch: 'O2409', status: 'Ativo' },
  { id: '5', name: 'Mix de Sementes', sku: 'SEM-042', barcode: '7898901234571', category: 'Alimentos', unit: '250g', stock: 16, minimum: 10, price: 21.9, cost: 11.4, expiry: '2026-12-12', batch: 'S2411', status: 'Ativo' },
];
export const sales: Sale[] = [
  { id: 'VEN-000142', customer: 'Consumidor Final', total: 74.7, payment: 'PIX', time: '10:42', status: 'Concluída' },
  { id: 'VEN-000141', customer: 'Mariana Costa', total: 48.4, payment: 'Cartão', time: '09:18', status: 'Concluída' },
  { id: 'VEN-000140', customer: 'Consumidor Final', total: 29.9, payment: 'Dinheiro', time: 'Ontem', status: 'Concluída' },
  { id: 'VEN-000139', customer: 'Rafael Lima', total: 112.3, payment: 'PIX', time: 'Ontem', status: 'Cancelada' },
];
export const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
