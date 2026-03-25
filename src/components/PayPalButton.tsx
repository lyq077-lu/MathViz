import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useState } from 'react';

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

  const onApprove = async (_data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      console.log('Payment successful:', details);
      onSuccess?.(details);
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

// 定价方案组件
export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showSuccess, setShowSuccess] = useState(false);

  interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    discount?: string;
    features: string[];
  }

  const plans: Record<string, Plan> = {
    monthly: {
      id: 'monthly',
      name: '月度会员',
      price: '9.99',
      period: '月',
      features: ['无限访问所有动画', '高清导出功能', '优先客服支持', '新功能抢先体验'],
    },
    yearly: {
      id: 'yearly',
      name: '年度会员',
      price: '99.99',
      period: '年',
      discount: '节省 17%',
      features: ['无限访问所有动画', '高清导出功能', '优先客服支持', '新功能抢先体验', '专属学习报告'],
    },
  };

  const currentPlan = plans[selectedPlan];

  const handleSuccess = (details: any) => {
    console.log('Payment completed:', details);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleError = (error: any) => {
    console.error('Payment error:', error);
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-2 text-center">升级到高级版</h3>
      <p className="text-slate-400 text-sm text-center mb-6">解锁所有数学可视化功能</p>

      {/* 方案切换 */}
      <div className="flex gap-2 mb-6 p-1 bg-slate-900/50 rounded-xl">
        <button
          onClick={() => setSelectedPlan('monthly')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            selectedPlan === 'monthly'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          月度
        </button>
        <button
          onClick={() => setSelectedPlan('yearly')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            selectedPlan === 'yearly'
              ? 'bg-cyan-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          年度
        </button>
      </div>

      {/* 价格展示 */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">${currentPlan.price}</span>
          <span className="text-slate-400">/{currentPlan.period}</span>
        </div>
        {currentPlan.discount && (
          <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            {currentPlan.discount}
          </span>
        )}
      </div>

      {/* 功能列表 */}
      <ul className="space-y-3 mb-6">
        {currentPlan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-slate-300 text-sm">
            <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* 支付按钮 */}
      <div className="border-t border-slate-700 pt-6">
        {showSuccess ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-400 font-medium">支付成功！</p>
            <p className="text-slate-400 text-sm mt-1">欢迎升级到高级版</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 text-center mb-4">
              安全支付由 PayPal 提供
              <br />
              <span className="text-slate-600">🏖️ 当前为沙盒测试模式</span>
            </p>
            <PayPalButton
              amount={currentPlan.price}
              description={`MathViz ${currentPlan.name}`}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </>
        )}
      </div>
    </div>
  );
}
