
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: string;
  date: string;
  description: string;
}

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock transaction data - will be replaced with Supabase data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 500.00,
      status: 'completed',
      method: 'Credit Card',
      date: '2024-01-15T10:30:00Z',
      description: 'Deposit via Credit Card'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 200.00,
      status: 'pending',
      method: 'Bank Transfer',
      date: '2024-01-14T15:45:00Z',
      description: 'Withdrawal to Bank Account'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 1000.00,
      status: 'completed',
      method: 'Bank Transfer',
      date: '2024-01-12T09:15:00Z',
      description: 'Deposit via Bank Transfer'
    },
    {
      id: '4',
      type: 'withdrawal',
      amount: 150.00,
      status: 'failed',
      method: 'PayPal',
      date: '2024-01-10T14:20:00Z',
      description: 'Withdrawal to PayPal'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.method.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-blue-100 dark:bg-blue-900/20'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{transaction.method}</span>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
