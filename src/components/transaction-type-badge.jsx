import { CircleIcon } from 'lucide-react';

const TransactionTypeBadge = ({ type }) => {
  const getBadgeProps = (type) => {
    switch (type) {
      case 'EARNING':
        return {
          className: 'bg-primary-green/10 text-primary-green',
          label: 'Ganho',
        };
      case 'EXPENSE':
        return {
          className: 'bg-primary-red/10 text-primary-red',
          label: 'Gasto',
        };
      case 'INVESTMENT':
        return {
          className: 'bg-primary-blue/10 text-primary-blue',
          label: 'Invest.',
        };
    }
  };

  const badgeProps = getBadgeProps(type);

  return (
    <div
      className={`flex w-fit items-center gap-1 rounded-full px-2 py-[2px] text-xs ${badgeProps.className}`}
    >
      <CircleIcon size={10} className="fill-current" />
      {badgeProps.label}
    </div>
  );
};

export default TransactionTypeBadge;
