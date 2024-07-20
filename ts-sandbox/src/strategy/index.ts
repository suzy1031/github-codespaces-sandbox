interface MembershipFeeStrategy {
  calculateShippingFee: (basePrice: number) => number;
  applyDiscount: (basePrice: number) => number;
}

// 具体的な戦略を実装するクラス
class RegularMemberFee implements MembershipFeeStrategy {
  // 送料
  private SHIPPING_FEE = 500;
  // 10000円以上で送料無料
  private SHIPPING_FREE_THRESHOLD = 10000;

  calculateShippingFee(basePrice: number): number {
    return basePrice < this.SHIPPING_FREE_THRESHOLD ? this.SHIPPING_FEE : 0;
  }

  applyDiscount(basePrice: number): number {
    return basePrice;
  }
}

// 具体的な戦略を実装するクラス
class PremiumMemberFee implements MembershipFeeStrategy {
  private DISCOUNT_RATE = 0.05;

  // premium会員は送料無料
  calculateShippingFee(_basePrice: number): number {
    return 0;
  }

  // premium会員は5%割引
  applyDiscount(basePrice: number): number {
    return basePrice * (1 - this.DISCOUNT_RATE);
  }
}

// 料金計算の戦略を利用するクラス
class FeeContext {
  private strategy: MembershipFeeStrategy;

  constructor(strategy: MembershipFeeStrategy) {
    this.strategy = strategy;
  }

  calculateFee(basePrice: number): number {
    const priceAfterDiscount = this.strategy.applyDiscount(basePrice);
    const finalPrice =
      priceAfterDiscount +
      this.strategy.calculateShippingFee(priceAfterDiscount);
    return finalPrice;
  }
}

// 通常会員が9000円の買い物をした時
const regularContext = new FeeContext(new RegularMemberFee());
// console.log(regularContext.calculateFee(9000));

const premiumContext = new FeeContext(new PremiumMemberFee());
// console.log(premiumContext.calculateFee(9000));

// インターフェイスを通じて実装することで簡単に追加できる
class PremiumPlusMemberFee implements MembershipFeeStrategy {
  private DISCOUNT_RATE = 0.1;

  calculateShippingFee(_basePrice: number): number {
    return 0;
  }

  applyDiscount(basePrice: number): number {
    return basePrice * (1 - this.DISCOUNT_RATE);
  }
}

// 既存のクラスに影響を与えずに新しい処理を追加･削除できる
class CampaignFeeContext {
  private strategy: MembershipFeeStrategy;
  private CAMPAIGN_DISCOUNT_RATE = 0.1;

  constructor(strategy: MembershipFeeStrategy) {
    this.strategy = strategy;
  }

  calculateFee(basePrice: number): number {
    let priceAfterDiscount = this.strategy.applyDiscount(basePrice);
    if (this.isCampaign())
      priceAfterDiscount = this.campaignDiscount(priceAfterDiscount);
    const finalPrice =
      priceAfterDiscount +
      this.strategy.calculateShippingFee(priceAfterDiscount);
    return finalPrice;
  }

  private campaignDiscount(basePrice: number): number {
    return basePrice * (1 - this.CAMPAIGN_DISCOUNT_RATE);
  }

  private isCampaign(): boolean {
    return (
      Date.now() >= new Date("2024-07-01 00:00:00").getTime() &&
      Date.now() <= new Date("2024-08-01 23:59:59").getTime()
    );
  }
}

const campaignRegularContext = new CampaignFeeContext(new RegularMemberFee());
console.log(campaignRegularContext.calculateFee(9000));

const campaignPremiumContext = new CampaignFeeContext(new PremiumMemberFee());
console.log(campaignPremiumContext.calculateFee(9000));

const campaignPremiumPlusContext = new CampaignFeeContext(
  new PremiumPlusMemberFee()
);
console.log(campaignPremiumPlusContext.calculateFee(9000));
