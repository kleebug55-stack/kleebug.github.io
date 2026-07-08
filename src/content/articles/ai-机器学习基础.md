---
title: "2025 10 29 ai 机器学习基础"
date: 2025-10-29
summary: "打算做几个系列文章，系统地梳理AI产品经理所需的核心知识与思维框架，帮助产品人更好地理解AI、应用AI，更从容地转型成一个懂趋势、懂技术、懂工程、懂商业落地的AI产品人。 AI技术基础原理系列 主要涉及数学、ML算法、大模型、提示工程、上下..."
tags: []
status: "growing"
featured: false
readingTime: "6 分钟"
---

<div style="max-width: 1120px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #292019; line-height: 1.6; background: #F3F8FE;">
<header style="text-align: center; margin-bottom: 20px; padding: 20px 20px; background: linear-gradient(135deg, #3C74F4 0%, #58B1FF 100%); color: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
<p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto 20px; opacity: 0.95;"><strong>打算做几个系列文章，系统地梳理AI产品经理所需的核心知识与思维框架，帮助产品人更好地理解AI、应用AI，更从容地转型成一个懂趋势、懂技术、懂工程、懂商业落地的AI产品人。</strong></p>
<div style="background-color: rgba(255, 255, 255, 0.25); padding: 0px 20px; border-radius: 8px; margin-top: 0px;">
<p style="margin-bottom: -10px;"><strong>AI技术基础原理系列</strong>主要涉及数学、ML算法、大模型、提示工程、上下文工程等内容，产品人主要是理解其中的技术原理和概念，帮助大家在实际业务中能解释应该选择什么模型、什么算法、什么上下文管理策略且能说清原因。</p>
</p></div>
</header>
<div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); margin-bottom: 30px;">
<h2 style="font-size: 1.8rem; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #2575fc; color: #2c3e50;">从人工智能说起</h2>
<p style="margin-bottom: 16px; font-size: 1.05rem;">要了解机器学习首先从人工智能说起。因为人工智能是目标，机器学习是实现路径。</p>
<p style="margin-bottom: 16px; font-size: 1.05rem;">人工智能指的是让机器具备类似人类智能的能力，使其能够感知环境、学习经验、识别信息并进行推理与决策。</p>
<p style="margin-bottom: 16px; font-size: 1.05rem;">而<strong style="color: #2575fc; font-weight: 600;">机器学习（Machine Learning）</strong>是人工智能的核心方法，它让机器从有限的数据中&#8221;学习&#8221;出规律，并用这些规律对未知情况做出预测或判断。</p>
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img fetchpriority="high" decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/关系图.png" alt="关系图" width="1600" height="900" />
                </div>
</p></div>
<div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); margin-bottom: 30px;">
<h2 style="font-size: 1.8rem; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #2575fc; color: #2c3e50;">机器学习分类</h2>
<h3 style="font-size: 1.5rem; margin: 30px 0 15px; color: #3C74F4;">根据学习范式分类</h3>
<p style="margin-bottom: 16px; font-size: 1.05rem;">从学习方式上看，机器学习可以分为三类：<strong style="color: #2575fc; font-weight: 600;">监督学习、无监督学习和强化学习。</strong></p>
<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 25px 0;">
<div style="flex: 1; min-width: 300px; background: white; border-radius: 10px; padding: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border-top: 4px solid #2ecc71;">
<h4 style="font-size: 1.5rem; margin: 0 0 10px; color: #2c3e50; display: flex; align-items: center; margin-bottom: 15px;"><span style="margin-right: 10px; font-size: 1.5rem;">📚</span> 1⃣️ 监督学习</h4>
<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; border-radius: 0 8px 8px 0;">
<p style="margin-bottom: 10px;"><strong style="color: #2575fc; font-weight: 600;">定义：</strong>模型通过大量&#8221;输入（特征）+输出（目标）&#8221;的样本，学习输入与输出之间的映射关系，然后通过映射关系对数据进行预测。</p>
<p style="margin-bottom: -15px;">学习依赖人工标注的输出标签。目标明确，效果好衡量（准确率）。</p>
</p></div>
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/有监督.png" alt="有监督学习" width="1600" height="900" />
                </div>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">典型应用：</h4>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;">分类、回归、目标检测、序列生成、序列标注等</li>
</ul>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">常见算法：</h4>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">回归类：</strong>线性回归、岭回归</li>
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">分类类：</strong>逻辑回归、决策树、随机森林、支持向量机、神经网络</li>
</ul>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">小结：</h4>
<div style="background-color: #E0F8E5; border: 2px dashed #65C97A; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;">
<p style="margin-bottom: -20px; font-size: 1.6rem;"><strong style="color: #65C97A; font-weight: 600;">有老师教，学预测</strong></p>
</p></div>
</p></div>
<div style="flex: 1; min-width: 300px; background: white; border-radius: 10px; padding: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border-top: 4px solid #e74c3c;">
<h4 style="font-size: 1.5rem; margin: 0 0 10px; color: #2c3e50; display: flex; align-items: center; margin-bottom: 15px;"><span style="margin-right: 10px; font-size: 1.5rem;">🔍</span> 2⃣️ 无监督学习</h4>
<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; border-radius: 0 8px 8px 0;">
<p style="margin-bottom: 10px;"><strong style="color: #2575fc; font-weight: 600;">定义：</strong>模型自动从海量数据中找出潜在结构、模式或规律，无需人工标注。</p>
<p style="margin-bottom: -10px;">学习依赖模型自己观察和学习，适用于探索性分析，重点在于&#8221;理解数据&#8221;而非&#8221;预测结果&#8221;。</p>
</p></div>
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/无监督.png" alt="无监督学习" width="1600" height="900" />
                </div>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">典型应用：</h4>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;">聚类、异常检测、关联规则挖掘、降维</li>
</ul>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">常见算法：</h4>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">聚类：</strong>K均值聚类、层次聚类</li>
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">降维：</strong>主成分分析（PCA）、t-SNE</li>
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">异常检测：</strong>基于密度的异常检测、基于距离的异常检测</li>
</ul>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">小结：</h4>
<div style="background-color: #FBE7E4; border: 2px dashed #D65846; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;">
<p style="margin-bottom: -20px; font-size: 1.6rem;"><strong style="color: #D65846; font-weight: 600;">自己摸索，学结构</strong></p>
</p></div>
</p></div>
<div style="flex: 1; min-width: 300px; background: white; border-radius: 10px; padding: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border-top: 4px solid #f39c12;">
<h4 style="font-size: 1.5rem; margin: 0 0 10px; color: #2c3e50; display: flex; align-items: center; margin-bottom: 15px;"><span style="margin-right: 10px; font-size: 1.5rem;">🎮</span> 3⃣️ 强化学习</h4>
<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; border-radius: 0 8px 8px 0;">
<p style="margin-bottom: 10px;"><strong style="color: #2575fc; font-weight: 600;">定义：</strong>智能体（Agent）在环境中行动，每个动作都会得到奖励或惩罚，目标是学习到一个能获得最大奖励的策略。</p>
<p style="margin-bottom: -10px;">学习依赖反馈信号（reward），重点在于探索（未知领域的Exploration）和利用（已有知识的Exploitation）的平衡。</p>
</p></div>
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img loading="lazy" decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/强化学习.png" alt="强化学习" width="1600" height="900" />
                </div>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">典型应用：</h4>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;">自动驾驶车辆、游戏与游戏玩家、机器人控制</li>
</ul>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">常见算法：</h4>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">值迭代法：</strong>Q-learning</li>
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">策略梯度法：</strong>REINFORCE、PPO、DDPG、SAC</li>
<li style="margin-bottom: 8px;"><strong style="color: #2575fc; font-weight: 600;">深度强化学习：</strong>结合神经网络的版本</li>
</ul>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">小结：</h4>
<div style="background-color: #FBEFDD; border: 2px dashed #E7A03C; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;">
<p style="margin-bottom: -20px; font-size: 1.6rem;"><strong style="color: #E7A03C; font-weight: 600;">边做边学，学决策</strong></p>
</p></div>
</p></div>
</p></div>
<table style="width: 100%; border-collapse: collapse; margin: 25px 0; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border-radius: 8px; overflow: hidden;">
<thead>
<tr>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">特征</th>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">监督学习</th>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">无监督学习</th>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">强化学习</th>
</tr>
</thead>
<tbody>
<tr style="background-color: white;">
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">是否有标签</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">✅ 有</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">❌ 无</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">⚙️ 奖励反馈</td>
</tr>
<tr style="background-color: #f8f9fa;">
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">学习目标</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">学习输入→输出映射</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">发现数据结构</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">学习最优行为策略</td>
</tr>
<tr style="background-color: white;">
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">数据来源</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">标注数据集</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">未标注数据集</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">与环境交互</td>
</tr>
<tr style="background-color: #f8f9fa;">
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">应用场景</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">分类、回归</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">聚类、降维</td>
<td style="padding: 12px 15px; border-bottom: 1px solid #e0e0e0;">游戏AI、机器人、推荐系统</td>
</tr>
<tr style="background-color: white;">
<td style="padding: 12px 15px; border-bottom: none;">学习方式</td>
<td style="padding: 12px 15px; border-bottom: none;">静态学习</td>
<td style="padding: 12px 15px; border-bottom: none;">静态学习</td>
<td style="padding: 12px 15px; border-bottom: none;">动态交互式学习</td>
</tr>
</tbody>
</table>
<h3 style="font-size: 1.5rem; margin: 30px 0 15px; color: #3C74F4;">根据模型复杂度分类</h3>
<p style="margin-bottom: 16px; font-size: 1.05rem;">除了学习范式外，机器学习还可以根据模型结构和特征表达能力分为两类：<strong style="color: #2575fc; font-weight: 600;">浅层学习</strong>和<strong style="color: #2575fc; font-weight: 600;">深度学习</strong>。</p>
<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 25px 0;">
<div style="flex: 1; min-width: 300px; background: white; border-radius: 10px; padding: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border-top: 4px solid #3498db;">
<h4 style="font-size: 1.5rem; margin: 0 0 10px; color: #2c3e50; display: flex; align-items: center; margin-bottom: 15px;"><span style="margin-right: 10px; font-size: 1.5rem;">📊</span> 1⃣️ 浅层学习</h4>
<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; border-radius: 0 8px 8px 0;">
<p style="margin-bottom: 10px;"><strong style="color: #2575fc; font-weight: 600;">定义：</strong>也称表面学习或传统学习，主要通过构建浅层（输入层和输出层之间只有一层或很少基层隐层）、较简单的模型来进行模式识别、分类、回归等任务。</p>
<p style="margin-bottom: -10px;">依赖人工进行特征提取来决定模型的输入，由于模型结构浅，计算很快，数据需求量也比较少。</p>
</p></div>
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img loading="lazy" decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/浅层学习.png" alt="浅层学习" width="1600" height="900" />
                </div>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">常见算法：</h4>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
<thead>
<tr>
<th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0; background-color: #2c3e50;color: white;  font-weight: 600;">算法</th>
<th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0; background-color: #2c3e50; color: white; font-weight: 600;">类型</th>
<th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0; background-color: #2c3e50; color: white; font-weight: 600;">特点</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">线性回归 / 逻辑回归</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">监督学习</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">简单、可解释，但表达能力有限</td>
</tr>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">支持向量机（SVM）</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">监督学习</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">在特征空间里找最优分割超平面</td>
</tr>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">决策树 / 随机森林</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">监督学习</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">易解释、可处理非线性，但难应对高维复杂数据</td>
</tr>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: none;">K-Means / PCA</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: none;">无监督学习</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: none;">发现简单结构，但无法捕捉复杂特征</td>
</tr>
</tbody>
</table></div>
<div style="flex: 1; min-width: 300px; background: white; border-radius: 10px; padding: 15px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); border-top: 4px solid #3498db;">
<h4 style="font-size: 1.5rem; margin: 0 0 10px; color: #2c3e50; display: flex; align-items: center; margin-bottom: 15px;"><span style="margin-right: 10px; font-size: 1.5rem;">🧠</span> 2⃣️ 深度学习</h4>
<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0; border-radius: 0 8px 8px 0;">
<p style="margin-bottom: 10px;"><strong style="color: #2575fc; font-weight: 600;">定义：</strong>使用多层神经网络（通常3层以上的隐层）来学习数据的高层次特征表示。</p>
<p style="margin-bottom: -10px;">无需人工设计特征，通过反向传播自动从原始数据中学习特征表示（底层特征 ➡️ 中层特征 ➡️ 高层特征），需要大量数据和算力支持。</p>
</p></div>
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img loading="lazy" decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/深度学习.png" alt="深度学习" width="1600" height="900" />
                </div>
<h4 style="font-size: 1.2rem; margin: 20px 0 10px; color: #2c3e50;">常见模型：</h4>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
<thead>
<tr>
<th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0; background-color: #2c3e50; color: white; font-weight: 600;">模型类型</th>
<th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0; background-color: #2c3e50; color: white; font-weight: 600;">应用场景</th>
<th style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0; background-color: #2c3e50; color: white; font-weight: 600;">代表架构</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">卷积神经网络（CNN）</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">图像识别、视频分析</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">ResNet、VGG、Inception</td>
</tr>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">循环神经网络（RNN）</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">序列数据、语音识别</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">LSTM、GRU</td>
</tr>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">Transformer</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">自然语言处理、通用AI</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: 1px solid #e0e0e0;">BERT、GPT、ViT</td>
</tr>
<tr>
<td style="padding: 12px 15px; text-align: left; border-bottom: none;">自编码器 / GAN</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: none;">表征学习、生成任务</td>
<td style="padding: 12px 15px; text-align: left; border-bottom: none;">AE、VAE、GAN、Diffusion</td>
</tr>
</tbody>
</table></div>
</p></div>
</p></div>
<div style="background: white; color: #303E4F; padding: 20px; border-radius: 12px; margin: 20px 0;">
<div style="background-color: #f1f8ff; border: 2px dashed #3498db; border-radius: 8px; padding: 4px 4px; text-align: center; margin: 4px 0; color: #3498db;"><img loading="lazy" decoding="async" class="alignnone wp-image-3751 size-full" style="max-width: 100%; height: auto; border: 1px solid #eaeaea; border-radius: 4px;" src="http://kleebug.fun/wp-content/uploads/2025/10/对比图.png" alt="对比图" width="1600" height="900" />
                </div>
<p style="margin-bottom: 16px; text-align: center;">目前最前沿的AI技术的主流算法都是基于神经网络和强化学习。</p>
<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
<div style="background-color: #E0F8E5; border: 2px dashed #65C97A; border-radius: 8px; padding: 20px; text-align: center;  margin-bottom: -10px; color: #3498db;border-radius: 8px; flex: 1; min-width: 200px; text-align: center;">
<h4 style="margin-bottom: 20px; font-size: 1.6rem;color: #65C97A; ">监督学习</h4>
<p style="margin-bottom: 0;color: #65C97A;">学的是&#8221;正确答案&#8221;</p>
</p></div>
<div style="background-color: #FBE7E4; border: 2px dashed #D65846; border-radius: 8px; padding: 20px; text-align: center;  margin-bottom: -10px; color: #3498db;border-radius: 8px; flex: 1; min-width: 200px; text-align: center;">
<h4 style="margin-bottom: 20px; font-size: 1.6rem;color: #D65846; ">无监督学习</h4>
<p style="margin-bottom: 0;color: #D65846;">学的是&#8221;数据结构&#8221;</p>
</p></div>
<div style="background-color: #FBEFDD; border: 2px dashed #E7A03C; border-radius: 8px; padding: 20px; text-align: center;  margin-bottom: -10px; color: #3498db;border-radius: 8px; flex: 1; min-width: 200px; text-align: center;">
<h4 style="margin-bottom: 20px; font-size: 1.6rem;color: #E7A03C; ">强化学习</h4>
<p style="margin-bottom: 0;color: #E7A03C;">学的是&#8221;决策策略&#8221;</p>
</p></div>
<div style="background-color: #DCECFB; border: 2px dashed #3C74F4; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: -10px; color: #3498db;border-radius: 8px; flex: 1; min-width: 200px; text-align: center;">
<h4 style="margin-bottom: 20px; font-size: 1.6rem;color: #3C74F4; ">深度学习</h4>
<p style="margin-bottom: 0;color: #3C74F4;">让机器自己学会&#8221;怎么学习&#8221;</p>
</p></div>
</p></div>
</p></div>
<div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); margin-top: 40px;">
<h2 style="font-size: 1.8rem; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #2575fc; color: #2c3e50;">相关词汇定义</h2>
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);">
<thead>
<tr>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">词汇名称</th>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">定义</th>
<th style="background-color: #2c3e50; color: white; padding: 15px; text-align: left;">其它说明</th>
</tr>
</thead>
<tbody>
<tr style="background-color: white;">
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">特征</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">指从原始数据中提取出的、用于表示样本的属性或信息</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">在机器学习模型中，特征作为模型的输入，用于表示样本的不同属性，从而帮助模型进行学习和预测</td>
</tr>
<tr style="background-color: #f8f9fa;">
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">特征工程</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">指在机器学习和数据挖掘中，通过对原始数据进行处理、转换和提取，生成新的特征或选择合适的特征，从而改进模型性能和提高预测准确性的过程</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">选择什么输入参数、输入多少参数给模型对模型最后的识别性能有很高的影响，挖掘和选择特征的过程就是特征工程</td>
</tr>
<tr style="background-color: white;">
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">表示/表征</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">指将数据以某种形式进行编码或者表示的方式，可以是在特征空间或其它空间中的表示</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">在深度学习中，表征通常是模型自动学习得到的，比手工设计的特征更能捕捉数据中的复杂模式和关系，从而提升模型的性能</td>
</tr>
<tr style="background-color: #f8f9fa;">
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">局部表示</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">也称离散表示或符号表示，通常可以表示为One-hot向量的形式，即在多维度的一个词表里，有且只有一个维度值为1，其它维度都为0来表示某一个词</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">
                        <strong style="color: #2575fc; font-weight: 600;">优点：</strong></p>
<ul style="margin-top: 4px; padding-left: 20px;">
<li style="margin-bottom: 8px;">解释性好（某个维度值为1即为该词），利于人工归纳和总结特征，通过特征组合可以进行高效的特征工程；</li>
<li style="margin-bottom: 8px;">稀疏向量，用于线形模型时计算效率非常高；</li>
</ul>
<p>                        <strong style="color: #2575fc; font-weight: 600;">不足：</strong></p>
<ul style="margin-top: 4px; padding-left: 20px;">
<li style="margin-bottom: 8px;">维度数爆炸，扩展即增加维度；</li>
<li style="margin-bottom: 0;">所有向量正交，数据之间的相似度为0</li>
</ul>
</td>
</tr>
<tr style="background-color: white;">
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">分布式表示</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">将数据表示为多维向量的方法，其中每个维度都包含有关数据的一部分信息，低维的稠密向量</td>
<td style="padding: 15px; border-bottom: 1px solid #e0e0e0; vertical-align: top;">
                        <strong style="color: #2575fc; font-weight: 600;">优点：</strong></p>
<ul style="margin-top: 8px; padding-left: 20px;">
<li style="margin-bottom: 8px;">能更好捕捉数据的多样性，能处理未知数据；</li>
<li style="margin-bottom: 8px;">可以通过余弦相似度/欧式距离等计算相似度；</li>
</ul>
<p>                        <strong style="color: #2575fc; font-weight: 600;">不足：</strong></p>
<ul style="margin-top: 8px; padding-left: 20px;">
<li style="margin-bottom: 0;">比较吃计算性能；</li>
</ul>
</td>
</tr>
<tr style="background-color: #f8f9fa;">
<td style="padding: 15px; border-bottom: none; vertical-align: top;">表征学习</td>
<td style="padding: 15px; border-bottom: none; vertical-align: top;">通过深度神经网络等模型，自动化地从原始数据中学习有效(层次化、抽象化)的特征表示的方法，无需手工设计特征。</td>
<td style="padding: 15px; border-bottom: none; vertical-align: top;">表征学习的关键是构建具有一定深度的多层次特征表示，通过深度神经网络增加特征的重用性，从而指数级地增加表示能力。</td>
</tr>
</tbody>
</table></div>
<p><br />
</p>
