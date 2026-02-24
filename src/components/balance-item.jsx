import { WalletIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { formatCurrency } from '@/helpers/currency';

const BalanceItem = ({ label, value, icon }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        {/* Ícone e Label  */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>

          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <h3 className="text-2xl font-semibold">{formatCurrency(value)}</h3>
      </CardContent>
    </Card>
  );
};

export default BalanceItem;
