# Robotical Marty the Robot V2

**Robotical** · 教育与学习 · 核查 2026-11-04

把图像分类预测变成步行动作

消费渠道：个人零售。

## 产品图片与结构参考

### 产品图

![Robotical Marty the Robot V2官方外观产品图](../../assets/hardware/robotical-marty-v2/product.jpg)

Robotical Marty the Robot V2 · 官方产品图 · 来源：[Robotical · 官方图片](<https://robotical.io/product/marty-the-robot-v2/>) · [原始图片](<https://67b43dae.delivery.rocketcdn.me/wp-content/uploads/2021/02/Marty-the-Robot.jpg>)

### 参考图

![Robotical Marty the Robot V2官方场景或外观角度参考](../../assets/hardware/robotical-marty-v2/reference.jpg)

Robotical Marty the Robot V2 · 官方参考图 · 来源：[Robotical · 官方图片](<https://robotical.io/product/marty-the-robot-v2/>) · [原始图片](<https://67b43dae.delivery.rocketcdn.me/wp-content/uploads/2025/09/Physical-Computing.jpg>)

### AI 生成爆炸示意

![Robotical Marty the Robot V2 的AI结构示意；内部布局为推断，不是实物拆机](../../assets/hardware/robotical-marty-v2/ai-exploded.png)

**AI 生成 · 非实物拆机。** 内部为概念推断，不能作为元件布局、BOM 或维修依据。[生成提示词](../../content/hardware/prompts/robotical-marty-v2.txt)

> 已目视核对外形、标签与非拆机声明；不代表内部结构经实测验证。

> 分析为基于公开资料的案头研究与 AI 辅助判断，未经用户访谈、销量审计或实物拆机。需求、画像、竞争冷门度、审美及商业机会均为研究假设，不是投资结论。

## 销售与购买

- 状态：在售。官方单台商品有Add to cart，结构化Offer为InStock；按一台完整Marty V2计数，学校多机包和灯光配件不另计。

- 地区：所列官方国际商店

- 价格：官网 US$449 未含税。核查日页面快照；运费、税费、会员和配送区域按官方结算确认，不视为中国到手价。

- 中国大陆：本轮核实所列区域官方商店；未确认中国大陆官方现货、账户及完整服务，不把境外可购等同大陆可用。

- [官方产品 / 商店](<https://robotical.io/product/marty-the-robot-v2/>)

## AI 的实际作用

Robotical Blocks可用电脑或平板摄像头采集样本、训练和测试图像分类，再通过蓝牙让Marty响应预测；AI并非全部内置在机器人中。

服务与联网依赖：需兼容浏览器、外部电脑或平板及摄像头权限；机器人连接蓝牙执行动作。更高级扩展板与摄像配件不默认包含，也不是收录裸开发板。

## 是否冷门

新兴竞争（研究判断）：外部学习计算与机器人执行分开形成具体使用场景；本轮没有销量与市场份额证据。

## 需求与市场

需求假设：学习者可能更容易通过机器人的步行与转向理解分类模型结果，而不是只看屏幕置信度。应观察是否能解释模型在新背景下失败的原因，不能仅以成功识别一次物体代表掌握机器学习。

## 用户画像

画像推断：愿意用电脑或平板共同完成项目的家庭学习者与个人机器人爱好者较匹配。人形步行有吸引力，也需要平整活动区域和调试耐心，购买者应接受学习工具与自动玩具的区别。

## 竞争与替代

竞争判断：轮式编程机器人、虚拟角色和免费机器学习网站都能提供部分学习体验，人形动作是具体区别。外形更生动不保证教学更有效，课程可理解性、维修与家庭支持时间同样关键。

## 供应链

供应链推断：关节执行器、腿部结构和可更换部件需要经反复步行测试，连接和姿态校准也影响可靠性。官方未披露完整工厂及物料表，备件、教学软件与支持文档会决定长期维护成本。

## 技术路径

官方图像模型指南明确使用电脑或平板摄像头，并通过蓝牙连接Marty执行预测结果。技术判断应测试未见样本和背景变化，避免把训练集表现写成通用视觉理解，也不虚构机器人自带摄像头。

## 产品审美

审美判断：方形头部、短肢体和可变化眼部表达形成易辨认的角色，步行动作增强学习反馈。动作声音、站立稳定性和孩子拿取姿势都需真实观察，静态照片难以说明机械互动的舒适度。

## 关键风险

风险判断：训练结果可能随光照和样本偏差变化，机器人动作需在清空的稳定表面运行。浏览器权限与蓝牙兼容也会影响课程，不能把演示中的顺利行走视为任何地面都可靠或学习成果保证。

## 机会与验证

市场观察：可比较屏幕分类项目和加入Marty动作后的参与度与理解，记录重训、求助和维修频率。只有在孩子能解释失败并愿意继续探索时，实体反馈才可能提供超出普通动画的价值。

## 功能分层示意

这是功能关系，不是实物拆机、真实空间结构或已核实 BOM。

1. **样本收集**：外部电脑或平板摄像头采集图像。（官方披露）

2. **分类训练**：Robotical Blocks训练并测试模型。（官方披露）

3. **通信控制**：蓝牙将分类结果映射为动作命令。（官方披露）

4. **人形执行**：机器人关节和表情输出学习反馈。（官方披露）

## 来源

1. [Marty V2官方单台商品](<https://robotical.io/product/marty-the-robot-v2/>) — 已实际打开官方页面；功能说明不等于独立性能测量。

2. [Robotical官方图像分类教程](<https://userguides.robotical.io/martyv2/userguides/martyblocks/machinelearning/image>) — 已实际打开官方页面；功能说明不等于独立性能测量。

[返回目录](../hardware-market.md) · [网页分析](https://romanagent.github.io/Roman/#hardware/product/robotical-marty-v2)
