import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Crown, ArrowLeft, Loader2 } from 'lucide-react';

// 支付状态类型
type PaymentStatus = 'verifying' | 'success' | 'failed' | 'pending';

interface PaymentDetails {
  orderId: string;
  planName: string;
  amount: string;
  status: string;
  memberExpiry: string;
}

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PaymentStatus>('verifying');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string>('');

  // 获取 URL 参数
  const orderId = searchParams.get('orderId');
  const token = searchParams.get('token'); // PayPal 返回的 token

  useEffect(() => {
    // 验证支付状态
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // 如果有 orderId，向后端验证支付状态
      if (orderId) {
        // TODO: 调用后端 API 验证支付状态
        // const response = await fetch(`/api/payment/verify?orderId=${orderId}`);
        // const data = await response.json();
        
        // 模拟验证成功
        setTimeout(() => {
          setPaymentDetails({
            orderId: orderId,
            planName: '年度会员',
            amount: '$99.99',
            status: 'COMPLETED',
            memberExpiry: '2027-03-25',
          });
          setStatus('success');
        }, 2000);
      } else if (token) {
        // PayPal 返回的 token，需要后端处理
        // TODO: 调用后端 API 处理 PayPal 回调
        setStatus('pending');
      } else {
        setStatus('failed');
        setError('无效的支付参数');
      }
    } catch (err) {
      console.error('Payment verification failed:', err);
      setStatus('failed');
      setError('支付验证失败，请稍后重试');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleGoToPersonal = () => {
    navigate('/');
    // 可以添加 state 来指示跳转到个人中心
    window.location.href = '/?view=personal';
  };

  // 验证中状态
  if (status === 'verifying') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-cyan-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">正在验证支付...</h2>
          <p className="text-slate-400">请稍候，我们正在确认您的支付状态</p>
        </motion.div>
      </div>
    );
  }

  // 失败状态
  if (status === 'failed') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl p-8 text-center"
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
          >
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">支付验证失败</h2>
          <p className="text-slate-400 mb-6">{error || '无法确认您的支付状态'}</p>
          <div className="space-y-3">
            <button
              onClick={verifyPayment}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all"
              style={{ 
                background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
                color: 'white'
              }}
            >
              重新验证
            </button>
            <button
              onClick={handleBackToHome}
              className="w-full py-3 px-4 rounded-xl font-medium text-slate-300 hover:text-white transition-all"
              style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
            >
              返回首页
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 成功状态
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* 头部 */}
        <div 
          className="p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.2))'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">支付成功！</h1>
          <p className="text-slate-300">感谢您的订阅，升级已完成</p>
        </div>

        {/* 订单详情 */}
        <div className="p-6 space-y-4">
          {paymentDetails && (
            <div 
              className="p-4 rounded-xl space-y-3"
              style={{ backgroundColor: 'rgba(51, 65, 85, 0.3)' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-400">订单编号</span>
                <span className="text-white font-mono text-sm">{paymentDetails.orderId.slice(0, 16)}...</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">会员类型</span>
                <span className="text-white font-medium">{paymentDetails.planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">支付金额</span>
                <span className="text-cyan-400 font-bold text-lg">{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-600">
                <span className="text-slate-400 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  有效期至
                </span>
                <span className="text-green-400 font-medium">{paymentDetails.memberExpiry}</span>
              </div>
            </div>
          )}

          {/* Webhook 说明 - 开发者信息 */}
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)' }}
          >
            <h4 className="text-cyan-400 text-sm font-medium mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Webhook 配置信息
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              PayPal 支付回调已触发。请在 PayPal Developer Dashboard 中配置 webhook URL：
            </p>
            <code 
              className="block mt-2 p-2 rounded text-xs font-mono break-all"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', color: '#22d3ee' }}
            >
              https://your-domain.com/api/webhook/paypal
            </code>
            <p className="text-slate-500 text-xs mt-2">
              事件类型: PAYMENT.CAPTURE.COMPLETED
            </p>
          </div>

          {/* 按钮 */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleGoToPersonal}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all"
              style={{ 
                background: 'linear-gradient(135deg, #06b6d4, #2563eb)',
                color: 'white'
              }}
            >
              查看会员状态
            </button>
            <button
              onClick={handleBackToHome}
              className="w-full py-3 px-4 rounded-xl font-medium text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
