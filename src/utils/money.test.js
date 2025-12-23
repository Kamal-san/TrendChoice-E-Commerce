import {it,expect} from 'vitest';

import { formatMoney } from './money';

it('displays 2 decimals',() =>{
    expect(formatMoney(1090)).toBe('272.50');
});