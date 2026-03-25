import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PayPalButtonProps {
  amount: string;
  currency?: string;
  description?: string;
  onSuccess?: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

export function PayPalButton({ 
  amount, 
  currency = 'USD', 
  description = 'MathViz Premium',
  onSuccess, 
  onError,
  onCancel 
}: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const createOrder = (_data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: description,
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log('Payment successful:', details);
      
      // 获取订单 ID
      const orderId = details.id || data.orderID;
      
      // 调用回调
      onSuccess?.(details);
      
      // 跳转到支付成功页面
      navigate(`/payment/success?orderId=${orderId}`);
    } catch (err) {
      console.error('Payment capture failed:', err);
      setError('支付处理失败，请重试');
      onError?.(err);
    }
  };

  const handleError = (err: any) => {
    console.error('PayPal error:', err);
    setError('支付系统错误，请稍后重试');
    onError?.(err);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
        <span className="ml-2 text-sm text-slate-400">加载支付系统...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay',
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={handleError}
        onCancel={handleCancel}
        disabled={false}
      />
    </div>
  );
}
