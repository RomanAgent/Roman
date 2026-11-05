# AI 公司与产品研究数据约定

本目录收录全球以 AI 模型、应用、基础设施或行业 AI 产品为明确业务的公司/产品业务实体。集团与其品牌合并研究，尽量不把模型版本、产品品牌和同一集团的业务重复计为新公司；并购后的独立业务保留时必须说明归属。不是全球工商企业穷尽清单。

文件：companies-foundation.json、companies-applications.json、companies-enterprise.json、companies-infrastructure.json，均为数组。各负责人只写自己的文件。无图片要求，不生成假logo，不修改既有硬件数据。

每条记录字段：
- id: 英文小写连字符稳定ID；name：公司显示名；aliases：别名数组；website：实际核查的HTTPS官网。
- region：中国大陆/美国/英国/法国/加拿大/日本/韩国/阿联酋/以色列/德国/荷兰/澳大利亚/地区待核实等，按主要业务/公司公开资料，不由网址或语言猜所在地；regionNote说明口径。
- category：主赛道，选 foundation, platforms, search, agents, coding, image-design, video, audio, productivity, enterprise, data-infra, compute, healthcare, science, robotics。
- tags：辅助检索词数组；audience：consumer/business/both/research。
- stage：public/sales/research/transition/unclear（公开产品入口、商务接洽、研发观察、业务调整、待核实）。stageNote：公开入口与运营/交付边界，不能把有官网当作已盈利或所有功能已开放。
- ownershipNote：公司/集团/子品牌归属边界；若无并购证据勿编造。
- checkedAt：YYYY-MM-DD，按实际核查日；summary：40汉字以上的产品定位，明确卖给谁、解决什么。
- products：1–3个重点产品/产品组合；不按模型小版本凑数，每个{id,name,url,kind,stage,description,users,delivery,monetization,aiRole,limits,sourceIds}。
  kind=model/app/platform/infrastructure/vertical/robotics；stage=available/preview/research/retired/unclear；description>=30汉字，users>=12，delivery>=20，monetization>=20，aiRole>=30，limits>=35。费用优先讲收费形式与包含范围，不编造当前价；无法核实功能开放范围必须注明。代表产品覆盖不是公司全部SKU清单。
- sources：至少3条已读取的一手来源（特别窄公司最低2条需解释），每条{id,title,url,kind,note,accessedAt}。kind=official-product/official-docs/official-company/official-pricing/paper。source id只小写连字符。
- analysisScope：>=40汉字，说明下述八维围绕哪几个产品与工作流，不宣称分析公司所有业务。
- analysis：恰好8个key：demand,users,workflow,technology,competition,business,experience,risks。
  每key至少2个实质分项{title,text,evidence,sourceIds}；每段>=60汉字，每维合计>=140汉字；写具体产品与任务，不用公司名替换通用模板。evidence=official/analysis/validation；sourceIds只能引用本公司sources。
  标签依次：需求与市场、目标用户、产品与工作流、AI技术与依赖、竞争与替代、商业模式、体验与交付、风险与机会。

要求：公开事实、公司宣称、研究推断、建议验证区分。产品页面可用不等于已验证效果。不要编销量、融资、营收、员工数、商业成功率、精确BOM等。开放权重不直接称完全开源。采购/医生/企业服务不冒充普通零售；科研演示不冒充已经开放的产品。中文支持不等于中国大陆完整服务可用。

新增产品无需真实注册、付费、上传私人资料或发消息。各条需浏览核查官网/产品/文档/价格或服务条款。保留版本与地区边界；模型名称不要凭记忆猜最新。完成后自行检查schema、sourceIds和段落长度，再向root报告条数和实质问题；不提交Git、不自行发布。
