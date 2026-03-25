# PayPal Webhook 配置指南

## 前端支付成功页面

支付成功页面路径：`/payment/success`

### 页面功能

1. **验证支付状态** - 从 URL 获取 `orderId` 或 `token`，向后端验证支付结果
2. **显示订单详情** - 展示会员类型、支付金额、有效期等信息
3. **Webhook 配置提示** - 显示后端需要配置的 webhook URL

### URL 参数

```
/payment/success?orderId=ORDER_ID          # 标准订单完成
/payment/success?token=TOKEN&PayerID=ID    # PayPal 回调
```

## PayPal Webhook 配置

### 1. 登录 PayPal Developer Dashboard

访问：https://developer.paypal.com/dashboard/

### 2. 创建 Webhook

1. 选择你的应用（App）
2. 进入 "Webhooks" 标签
3. 点击 "Add Webhook"
4. 填写 Webhook URL：`https://your-domain.com/api/webhook/paypal`

### 3. 选择事件类型

必需的事件：
- `PAYMENT.CAPTURE.COMPLETED` - 支付捕获完成
- `PAYMENT.CAPTURE.DENIED` - 支付被拒绝
- `CHECKOUT.ORDER.APPROVED` - 订单已批准
- `CHECKOUT.ORDER.COMPLETED` - 订单已完成

### 4. 后端 Webhook 处理示例 (Node.js/Express)

```typescript
import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// PayPal Webhook 接收端点
router.post('/webhook/paypal', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    // 验证 webhook 签名
    const authAlgo = req.headers['paypal-auth-algo'];
    const certUrl = req.headers['paypal-cert-url'];
    const transmissionId = req.headers['paypal-transmission-id'];
    const transmissionSig = req.headers['paypal-transmission-sig'];
    const transmissionTime = req.headers['paypal-transmission-time'];
    
    const webhookId = 'YOUR_WEBHOOK_ID'; // 从 PayPal Dashboard 获取
    const body = req.body;
    
    // TODO: 验证 PayPal webhook 签名
    // https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature
    
    const event = JSON.parse(body);
    
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentSuccess(event.resource);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePaymentFailed(event.resource);
        break;
      default:
        console.log('Unhandled event:', event.event_type);
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error');
  }
});

// 处理支付成功
async function handlePaymentSuccess(resource: any) {
  const orderId = resource.id;
  const amount = resource.amount.value;
  const currency = resource.amount.currency_code;
  const payerEmail = resource.payer?.email_address;
  
  // TODO: 
  // 1. 验证订单是否存在
  // 2. 更新用户会员状态
  // 3. 记录支付日志
  // 4. 发送确认邮件
  
  console.log('Payment completed:', {
    orderId,
    amount,
    currency,
    payerEmail
  });
}

// 处理支付失败
async function handlePaymentFailed(resource: any) {
  console.log('Payment failed:', resource);
  // TODO: 处理支付失败逻辑
}

export default router;
```

## 数据库设计建议

### 订单表 (orders)

```sql
CREATE TABLE orders (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  plan_id VARCHAR(255) NOT NULL,
  plan_name VARCHAR(255) NOT NULL,
  amount_usd DECIMAL(10,2) NOT NULL,
  amount_cny DECIMAL(10,2),
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  paypal_order_id VARCHAR(255),
  paypal_capture_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);
```

### 会员订阅表 (subscriptions)

```sql
CREATE TABLE subscriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL UNIQUE,
  plan_id VARCHAR(255) NOT NULL,
  plan_name VARCHAR(255) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 测试 Webhook

### 使用 PayPal Sandbox

1. 在 Sandbox 环境中完成支付
2. 检查 webhook 是否被触发
3. 查看 Dashboard 中的 Webhook 事件日志

### 本地开发测试

使用 ngrok 暴露本地服务器：

```bash
# 安装 ngrok
npm install -g ngrok

# 暴露本地端口
ngrok http 3000

# 使用生成的 HTTPS URL 配置 PayPal Webhook
# https://xxxxx.ngrok.io/api/webhook/paypal
```

## 安全注意事项

1. **验证 Webhook 签名** - 必须验证 PayPal 的签名防止伪造请求
2. **幂等性处理** - 同一订单可能收到多次通知，需要幂等处理
3. **HTTPS 必需** - Webhook URL 必须使用 HTTPS
4. **超时处理** -  webhook 处理应该快速返回 200，耗时操作异步处理

## 前端集成

支付按钮组件 (`PayPalButton.tsx`) 已配置为：

1. 调用 `actions.order.capture()` 完成支付
2. 支付成功后获取 `orderId`
3. 自动跳转到 `/payment/success?orderId=xxx`
4. 成功页面可向后端验证订单状态

## 参考资料

- [PayPal Webhooks Documentation](https://developer.paypal.com/docs/api/webhooks/v1/)
- [Verify Webhook Signatures](https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature)
- [Checkout Orders API](https://developer.paypal.com/docs/api/orders/v2/)
