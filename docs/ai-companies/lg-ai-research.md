# LG AI Research

基础模型 · 韩国 · 核查 2026-11-05

LG AI Research通过EXAONE系列探索语言、视觉和结构化数据的基础模型，提供公开权重与研究资料并保留不同商业授权路径；本条重点区分模型任务和许可，不把所有EXAONE都称为同一种免费聊天服务。

**业务入口：公开产品入口**。已有公开模型资料与权重路径，但不同型号许可不一致；Showroom本轮返回地区受限，未绕过。研究可取得不等于统一商业API或行业效果已验证。

公司与集团：LG AI Research作为LG集团AI研究与产品业务档案，EXAONE与K-EXAONE不同型号不单列公司；不把集团其他家电或硬件业务全部纳入模型分析。

地区口径：按LG AI Research韩国研究及产品业务口径记录；国家项目、模型发布和全球服务可用性分别看，不以演示站访问限制推定总部。

[公司官网](<https://www.lgresearch.ai/>) · [网页档案](https://romanagent.github.io/Roman/#ai/company/lg-ai-research)

## 重点产品

### EXAONE 语言与视觉模型族

模型 · 已公开提供

提供面向语言及图文理解的不同模型，研究者和企业可根据具体型号取得权重与运行说明；本条以EXAONE4.5及K-EXAONE2.0展示能力和许可差异。

目标用户：研究多模态任务或评估自有部署的研究人员和企业技术团队。

AI作用：语言模型与视觉编码器等机制支持生成和图文理解，不同型号承担不同任务；权重公开提供研究部署路径，并不自动附带可直接使用的业务应用。

使用与交付：通过官方模型卡、权重与代码说明交付，实际运行需自行准备兼容环境；演示入口还存在地区条件。

收费形式：权重获取与商业授权须按型号核对，K-EXAONE2.0公告采用Apache2.0，4.5模型卡仍标NC；不存在已核统一订阅价。

产品边界：不能将某型号许可扩展到全系列，公开权重也不表示训练资料全公开；模型可能输出错误或偏差，实际计算资源、商业使用和地区访问需要另行确认。

[产品入口](<https://www.lgresearch.ai/exaone/>) · [EXAONE当前视觉语言模型介绍](<https://www.lgresearch.ai/exaone/>) · [LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [K-EXAONE2.0官方发布](<https://www.lgresearch.ai/news/view?seq=678>)

### EXAONE Tabular

模型 · 研发 / 试点

面向结构化表格的分类和回归模型，把有标签样本作为上下文对新数据作预测，区别于用聊天模型口头解读表格，主要公开路径是研究运行包。

目标用户：评估表格预测、制造数据或结构化业务样本的数据科学团队。

AI作用：预训练模型利用支持样本和查询样本进行上下文推断，不对每个数据集更新梯度；这种机制仍需要合适数据与独立测试，并非自动发现因果关系。

使用与交付：通过官方推理代码及对应分类、回归权重运行，需准备数据格式和计算环境，不是个人聊天订阅。

收费形式：公开资料支持研究教育使用，商业用途另有许可路径；推理代码和模型权重条件不同，运行资源也不因代码公开而免费。

产品边界：研究模型不能被当作已验证的医疗或信贷决策工具，数据分布和缺失情况会影响结果；商业授权、权重与运行包须分开核实，基准表现不保证现场效果。

[产品入口](<https://github.com/LGAI-Research/EXAONE-Tabular>) · [EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>) · [EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

## 八维产品分析

代表范围为EXAONE语言视觉模型族及EXAONE Tabular，结合4.5和K-EXAONE2.0说明许可差异；不覆盖全部生物、材料与金融合作，也不复核行业效果或法律授权结论。

> 以公开一手资料开展案头研究，围绕列明的重点产品与工作流分析。官方能力与研究判断分开；没有实际注册、付费调用、性能测试、用户访谈或销量审计。未披露的收入、成本、模型依赖和运营结果不编造。

## 需求与市场

### 事实｜EXAONE不只有语言聊天模型 · 官方资料

LG公开资料同时包含视觉语言模型和面向表格分类回归的模型，二者处理的数据和任务不同。图文回答与预测数值不能混成一种能力，目录按代表任务区分；集团AI研究范围广，也不意味着每项研究已经形成同样成熟的商业服务或消费者应用。

依据：[EXAONE当前视觉语言模型介绍](<https://www.lgresearch.ai/exaone/>) · [EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

### 判断｜行业需求应先选择合适输入类型 · 研究判断

企业可能需要理解文件，也可能需要根据结构化记录预测结果，选择模型前必须分清这两类任务。用聊天界面展示表格并不自动得到可靠预测，反之预测模型也不会解释所有业务背景；研究应从数据和验收目标出发，避免只追求统一大模型品牌。

依据：[EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

## 目标用户

### 事实｜公开权重主要需要技术使用者 · 官方资料

官方模型卡和代码仓库提供运行路径，使用者需要准备环境、数据和接口，而不是直接获得完整业务软件。研究人员与企业部署团队承担不同责任，演示站还可能有地区限制；目录不把权重可取得描述为普通用户无需配置即可使用全部功能。

依据：[LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

### 验证｜区分研究试验和实际业务应用 · 待验证

团队应先用有明确标签和测试划分的数据验证任务，再讨论接入生产系统。研究人员能够复现一个示例不代表业务负责人已经接受错误代价或获得商业许可；试点应包括数据维护和人工验收，不能只由模型技术指标决定是否用于现实决策。

依据：[EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

## 产品与工作流

### 事实｜Tabular通过上下文样本进行推断 · 官方资料

官方仓库说明分类和回归使用各自权重，输入已标注样本与待预测记录，不针对每个数据集进行梯度更新。熟悉的fit接口在这里不等于常规重新训练，开发者需要理解实际行为；目录不会把这种方法写成无需数据准备或无需计算资源的万能预测。

依据：[EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

### 判断｜结构化数据工作流仍需质量管理 · 研究判断

字段含义、时间划分、缺失与标签来源会影响预测是否有用，即使模型设计支持缺失值，也不能忽略原始资料问题。企业需要知道输出将如何被使用和纠正；如果只展示一个总分，可能掩盖某些重要样本失败，研究应保留具体任务与数据边界。

依据：[EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

## AI技术与依赖

### 事实｜视觉模型与表格模型采用不同机制 · 官方资料

EXAONE4.5模型卡描述语言与视觉编码器组合，Tabular则围绕结构化数据上下文推断，官方还介绍其合成预训练方向。它们不是同一技术可直接替换，不能用语言或视觉榜单评价表格预测，也不能从合成训练推定模型已经掌握真实业务因果关系。

依据：[LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

### 验证｜需要同时关注泛化和错误分布 · 待验证

图文任务可检查细节和引用，表格任务则应检查未见数据、不同群体或时间段上的误差与稳定性。平均指标较好不保证重要边界可靠，尤其不能把研究结果直接用于高影响决定；本研究没有运行模型或复核LG公布的性能与部署成果。

依据：[LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

## 竞争与替代

### 判断｜表格路线应与传统预测方法比较 · 研究判断

结构化业务可以使用传统统计或树模型，也可以评估基础模型上下文推断，选择应围绕质量、资源与维护。少做训练步骤可能有价值，但不保证在每个数据集更优；对创业团队而言，帮助客户正确评测方法比简单把大模型名称放进分析产品更有区分度。

依据：[EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

### 验证｜比较实际部署与更新工作 · 待验证

可在同一任务上记录模型加载、数据处理、推理和维护成本，再与现有方案比较。公开代码降低部分试验门槛，却仍有环境和版本要求，权重与软件也可能分开更新；目录不据下载量或官方基准推断生产采用规模及商业成功。

依据：[LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

## 商业模式

### 事实｜系列内的许可条件不同 · 官方资料

K-EXAONE2.0官方公告采用Apache2.0，而EXAONE4.5模型卡仍标注NC许可，Tabular仓库还区分代码与权重条件。不能把其中一个开放发布写成全系列可无条件商用，模型来源、具体版本和授权范围应逐项确认；公开访问也不是统一商业服务报价。

依据：[LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [K-EXAONE2.0官方发布](<https://www.lgresearch.ai/news/view?seq=678>) · [EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

### 判断｜成本包括授权和运行能力 · 研究判断

企业选择公开模型时仍需考虑商业许可、计算资源和维护人员，不能只按下载是否收费判断。对于有限任务，托管服务也可能更省工程投入；本目录没有取得商业合同或报价，不对许可条款给法律结论，也不推算自部署一定比API更便宜。

依据：[EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>) · [LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>)

## 体验与交付

### 事实｜演示入口本轮存在地区限制 · 官方资料

官方产品页链接到Showroom，但本轮打开后返回地区受限页面，未继续绕过。这个事实只说明当前访问条件，不能据此判定模型停止提供或全球无法使用；权重与资料仍有独立路径，因此目录分别记录演示访问和研究获取方式。

依据：[EXAONE当前视觉语言模型介绍](<https://www.lgresearch.ai/exaone/>)

### 验证｜体验应看研究产物能否进入工作 · 待验证

技术用户需要理解输入格式、权重用途和错误处理，业务用户则需要可解释的结果与复核入口。若只有代码示例而没有稳定服务设计，距离实际应用仍有工作；评估应包括这些转换步骤，本研究没有安装运行包或使用任何私人数据。

依据：[EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>)

## 风险与机会

### 判断｜机会在非聊天型的行业数据任务 · 研究判断

EXAONE Tabular提示基础模型机会不只在对话，还可能在结构化数据预测和方法复用。创业团队应选择明确任务，建立数据与验证流程后再决定技术路线；不能因模型小或无需逐数据集训练，就推定它适合所有工业、医疗或金融场景。

依据：[EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

### 验证｜持续记录版本和研究商业边界 · 待验证

后续模型可能改变许可、能力和运行要求，团队应保存对应来源和测试样本，不用旧版条件覆盖新版本。科研公开、演示和商业部署各有不同责任；本条只读取官方内容，没有购买许可、联系合作方或验证任何效果，也不保证具体业务决定正确。

依据：[LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) · [K-EXAONE2.0官方发布](<https://www.lgresearch.ai/news/view?seq=678>) · [EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>)

## 资料来源

- [EXAONE当前视觉语言模型介绍](<https://www.lgresearch.ai/exaone/>) — 已打开4.5视觉编码器及模型资料入口，不使用倍速和领先宣传作为实测。（核查 2026-11-05）

- [LG官方EXAONE4.5模型卡](<https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B>) — 已从官方产品页跳转读取模型、部署和EXAONE 1.2-NC许可标识；页面许可链接失效，未扩展成法律细则。（核查 2026-11-05）

- [K-EXAONE2.0官方发布](<https://www.lgresearch.ai/news/view?seq=678>) — 已打开2026-07-31公开权重与Apache2.0说明，仅限对应型号，不覆盖全系列。（核查 2026-11-05）

- [EXAONE Tabular官方研究说明](<https://www.lgresearch.ai/blog/view?seq=697>) — 已打开2026-09-09分类回归、合成预训练及研究教育与商业许可边界，厂商基准和部署效果未独立验证。（核查 2026-11-05）

- [EXAONE Tabular官方代码仓库](<https://github.com/LGAI-Research/EXAONE-Tabular>) — 已打开上下文推断、分类与回归权重及代码和权重不同许可说明，未安装或运行。（核查 2026-11-05）

[返回AI目录](../ai-directory.md)
